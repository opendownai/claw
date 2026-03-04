import { ChannelConfig } from '@/lib/channel-types'
import { Language } from '@/lib/i18n'

export interface SendResult {
  success: boolean
  message: string
  messageId?: string
  error?: string
}

export class MessageSender {
  private static async sendToDingTalk(channel: ChannelConfig, message: string): Promise<SendResult> {
    if (!channel.config.webhookUrl) {
      return {
        success: false,
        message: '钉钉Webhook URL未配置'
      }
    }

    try {
      // 构建消息内容
      const payload = {
        msgtype: 'text',
        text: {
          content: message
        }
      }

      // 发送消息到钉钉
      const response = await fetch(channel.config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const result = await response.json()
        if (result.errcode === 0) {
          return {
            success: true,
            message: '消息已发送到钉钉',
            messageId: result.errmsg || 'success'
          }
        } else {
          return {
            success: false,
            message: `钉钉发送失败: ${result.errmsg || '未知错误'}`
          }
        }
      } else {
        return {
          success: false,
          message: `钉钉API调用失败: ${response.status} ${response.statusText}`
        }
      }
    } catch (error) {
      return {
        success: false,
        message: `发送到钉钉时发生错误: ${error instanceof Error ? error.message : '未知错误'}`
      }
    }
  }

  private static async sendToFeishu(channel: ChannelConfig, message: string): Promise<SendResult> {
    if (!channel.config.webhookUrl) {
      return {
        success: false,
        message: '飞书Webhook URL未配置'
      }
    }

    try {
      // 构建消息内容
      const payload = {
        msg_type: 'text',
        content: {
          text: message
        }
      }

      // 发送消息到飞书
      const response = await fetch(channel.config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const result = await response.json()
        if (result.code === 0) {
          return {
            success: true,
            message: '消息已发送到飞书',
            messageId: result.data?.message_id || 'success'
          }
        } else {
          return {
            success: false,
            message: `飞书发送失败: ${result.msg || '未知错误'}`
          }
        }
      } else {
        return {
          success: false,
          message: `飞书API调用失败: ${response.status} ${response.statusText}`
        }
      }
    } catch (error) {
      return {
        success: false,
        message: `发送到飞书时发生错误: ${error instanceof Error ? error.message : '未知错误'}`
      }
    }
  }

  private static async sendToTelegram(channel: ChannelConfig, message: string): Promise<SendResult> {
    if (!channel.config.botToken) {
      return {
        success: false,
        message: 'Telegram Bot Token未配置'
      }
    }

    if (!channel.config.chatId) {
      return {
        success: false,
        message: 'Telegram Chat ID未配置'
      }
    }

    try {
      // 构建消息内容
      const payload = {
        chat_id: channel.config.chatId,
        text: message
      }

      // 构建API URL
      const url = `https://api.telegram.org/bot${channel.config.botToken}/sendMessage`

      // 发送消息到Telegram
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const result = await response.json()
        if (result.ok) {
          return {
            success: true,
            message: '消息已发送到Telegram',
            messageId: result.result?.message_id.toString() || 'success'
          }
        } else {
          return {
            success: false,
            message: `Telegram发送失败: ${result.description || '未知错误'}`
          }
        }
      } else {
        return {
          success: false,
          message: `Telegram API调用失败: ${response.status} ${response.statusText}`
        }
      }
    } catch (error) {
      return {
        success: false,
        message: `发送到Telegram时发生错误: ${error instanceof Error ? error.message : '未知错误'}`
      }
    }
  }

  static async sendMessage(channel: ChannelConfig, message: string, language: Language = 'zh'): Promise<SendResult> {
    switch (channel.id) {
      case 'dingtalk':
        return this.sendToDingTalk(channel, message)
      case 'feishu':
        return this.sendToFeishu(channel, message)
      case 'telegram':
        return this.sendToTelegram(channel, message)
      case 'web':
        // Web界面不需要发送消息
        return {
          success: true,
          message: 'Web界面消息发送功能已启用'
        }
      default:
        return {
          success: false,
          message: `不支持的渠道类型: ${channel.id}`
        }
    }
  }

  static async sendTestMessage(channel: ChannelConfig, language: Language = 'zh'): Promise<SendResult> {
    const testMessage = language === 'zh' 
      ? '这是一个测试消息，请确认AI助手是否正常工作。'
      : 'This is a test message, please confirm if the AI assistant is working properly.'

    return this.sendMessage(channel, testMessage, language)
  }
}