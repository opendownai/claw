import { ChannelConfig } from '@/lib/channel-types'
import { Language } from './i18n'

export interface DebugResult {
  success: boolean
  message: string
  details?: any
}

const messages: Record<Language, {
  channelNotEnabled: string
  webEnabled: string
  pleaseInputWebhook: string
  webhookValid: string
  webhookInvalid: string
  pleaseInputToken: string
  tokenValid: string
  tokenInvalid: string
  pleaseInputFeishuWebhook: string
  feishuWebhookValid: string
  feishuWebhookInvalid: string
  channelNotSupported: string
}> = {
  zh: {
    channelNotEnabled: '渠道未启用',
    webEnabled: 'Web界面已启用，可通过浏览器访问',
    pleaseInputWebhook: '请先输入钉钉机器人Webhook URL',
    webhookValid: '钉钉机器人URL格式正确，配置完成后可以在钉钉中接收AI助手消息',
    webhookInvalid: '钉钉机器人Webhook URL格式不正确',
    pleaseInputToken: '请先输入Telegram Bot Token',
    tokenValid: 'Telegram Token格式正确，配置完成后可以在Telegram中接收AI助手消息',
    tokenInvalid: 'Telegram Bot Token格式不正确',
    pleaseInputFeishuWebhook: '请先输入飞书机器人Webhook URL',
    feishuWebhookValid: '飞书机器人URL格式正确，配置完成后可以在飞书中接收AI助手消息',
    feishuWebhookInvalid: '飞书机器人Webhook URL格式不正确',
    channelNotSupported: '不支持的渠道类型',
  },
  en: {
    channelNotEnabled: 'Channel not enabled',
    webEnabled: 'Web interface enabled, accessible via browser',
    pleaseInputWebhook: 'Please enter DingTalk bot Webhook URL',
    webhookValid: 'DingTalk URL format correct. After config, you can receive AI messages in DingTalk.',
    webhookInvalid: 'DingTalk Webhook URL format incorrect',
    pleaseInputToken: 'Please enter Telegram Bot Token',
    tokenValid: 'Telegram Token format correct. After config, you can receive AI messages in Telegram.',
    tokenInvalid: 'Telegram Bot Token format incorrect',
    pleaseInputFeishuWebhook: 'Please enter Feishu bot Webhook URL',
    feishuWebhookValid: 'Feishu URL format correct. After config, you can receive AI messages in Feishu.',
    feishuWebhookInvalid: 'Feishu Webhook URL format incorrect',
    channelNotSupported: 'Unsupported channel type',
  },
}

const guides: Record<Language, {
  dingtalk: string
  telegram: string
  feishu: string
}> = {
  zh: {
    dingtalk: `钉钉机器人设置指南：
1. 在钉钉群中添加自定义机器人
2. 复制Webhook URL并粘贴到上方
3. 如需安全设置，请添加签名密钥
4. 机器人将自动接收AI助手消息`,
    telegram: `Telegram机器人设置指南：
1. 在Telegram中搜索 @BotFather
2. 使用 /newbot 创建新机器人
3. 复制API Token并粘贴到上方
4. 机器人将自动接收AI助手消息`,
    feishu: `飞书机器人设置指南：
1. 在飞书群中添加自定义机器人
2. 复制Webhook URL并粘贴到上方
3. 如需安全设置，请添加签名密钥
4. 机器人将自动接收AI助手消息`,
  },
  en: {
    dingtalk: `DingTalk Bot Setup:
1. Add custom bot to DingTalk group
2. Copy Webhook URL and paste above
3. Add signing key if needed
4. Bot will automatically receive AI assistant messages`,
    telegram: `Telegram Bot Setup:
1. Search @BotFather in Telegram
2. Use /newbot to create a new bot
3. Copy API Token and paste above
4. Bot will automatically receive AI assistant messages`,
    feishu: `Feishu Bot Setup:
1. Add custom bot to Feishu group
2. Copy Webhook URL and paste above
3. Add signing key if needed
4. Bot will automatically receive AI assistant messages`,
  },
}

export class ChannelDebugger {
  static async testChannel(channel: ChannelConfig, language: Language = 'zh'): Promise<DebugResult> {
    const t = messages[language]
    
    if (!channel.enabled) {
      return { success: false, message: t.channelNotEnabled }
    }

    switch (channel.id) {
      case 'web':
        return { 
          success: true, 
          message: t.webEnabled 
        }
        
      case 'dingtalk':
        if (!channel.config.webhookUrl) {
          return { success: false, message: t.pleaseInputWebhook }
        }
        try {
          new URL(channel.config.webhookUrl);
          return { 
            success: true, 
            message: t.webhookValid 
          }
        } catch (e) {
          return { 
            success: false, 
            message: t.webhookInvalid 
          }
        }
        
      case 'telegram':
        if (!channel.config.botToken) {
          return { success: false, message: t.pleaseInputToken }
        }
        const tokenPattern = /^\d+:[A-Za-z0-9_-]{35}$/;
        if (!tokenPattern.test(channel.config.botToken)) {
          return { 
            success: false, 
            message: t.tokenInvalid 
          }
        }
        return { 
          success: true, 
          message: t.tokenValid 
        }
        
      case 'feishu':
        if (!channel.config.webhookUrl) {
          return { success: false, message: t.pleaseInputFeishuWebhook }
        }
        try {
          const url = new URL(channel.config.webhookUrl);
          if (!url.href.includes('feishu.cn') && !url.href.includes('larksuite.com')) {
            return { 
              success: false, 
              message: t.feishuWebhookInvalid 
            }
          }
          return { 
            success: true, 
            message: t.feishuWebhookValid 
          }
        } catch (e) {
          return { 
            success: false, 
            message: t.feishuWebhookInvalid 
          }
        }
        
      default:
        return { 
          success: false, 
          message: t.channelNotSupported 
        }
    }
  }
  
  static getSetupGuide(channelId: string, language: Language = 'zh'): string {
    const t = guides[language]
    switch (channelId) {
      case 'dingtalk':
        return t.dingtalk
      case 'telegram':
        return t.telegram
      case 'feishu':
        return t.feishu
      default:
        return ''
    }
  }
}
