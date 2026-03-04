import { ChannelConfig } from '@/lib/channel-types'

export interface DebugResult {
  success: boolean
  message: string
  details?: any
}

export class ChannelDebugger {
  static async testChannel(channel: ChannelConfig): Promise<DebugResult> {
    if (!channel.enabled) {
      return { success: false, message: '渠道未启用' }
    }

    switch (channel.id) {
      case 'web':
        return { 
          success: true, 
          message: 'Web界面已启用，可通过浏览器访问' 
        }
        
      case 'dingtalk':
        if (!channel.config.webhookUrl) {
          return { success: false, message: '请先输入钉钉机器人Webhook URL' }
        }
        // 对于钉钉，简单验证URL格式
        try {
          new URL(channel.config.webhookUrl);
          return { 
            success: true, 
            message: '钉钉机器人URL格式正确，配置完成后可以在钉钉中接收AI助手消息' 
          }
        } catch (e) {
          return { 
            success: false, 
            message: '钉钉机器人Webhook URL格式不正确' 
          }
        }
        
      case 'telegram':
        if (!channel.config.botToken) {
          return { success: false, message: '请先输入Telegram Bot Token' }
        }
        // 简单验证Bot Token格式
        const tokenPattern = /^\d+:[A-Za-z0-9_-]{35}$/;
        if (!tokenPattern.test(channel.config.botToken)) {
          return { 
            success: false, 
            message: 'Telegram Bot Token格式不正确' 
          }
        }
        return { 
          success: true, 
          message: 'Telegram Bot Token格式正确，配置完成后可以在Telegram中接收AI助手消息' 
        }
        
      case 'feishu':
        if (!channel.config.webhookUrl) {
          return { success: false, message: '请先输入飞书机器人Webhook URL' }
        }
        // 验证飞书webhook URL格式
        try {
          const url = new URL(channel.config.webhookUrl);
          if (!url.href.includes('feishu.cn') && !url.href.includes('larksuite.com')) {
            return { 
              success: false, 
              message: '飞书机器人Webhook URL格式不正确' 
            }
          }
          return { 
            success: true, 
            message: '飞书机器人URL格式正确，配置完成后可以在飞书中接收AI助手消息' 
          }
        } catch (e) {
          return { 
            success: false, 
            message: '飞书机器人Webhook URL格式不正确' 
          }
        }
        
      default:
        return { 
          success: false, 
          message: '不支持的渠道类型' 
        }
    }
  }
  
  // 为不同渠道提供配置指南
  static getSetupGuide(channelId: string): string {
    switch (channelId) {
      case 'dingtalk':
        return `钉钉机器人设置指南：
1. 在钉钉群中添加自定义机器人
2. 复制Webhook URL并粘贴到上方
3. 如需安全设置，请添加签名密钥
4. 机器人将自动接收AI助手消息`;
      
      case 'telegram':
        return `Telegram机器人设置指南：
1. 在Telegram中搜索 @BotFather
2. 使用 /newbot 创建新机器人
3. 复制API Token并粘贴到上方
4. 机器人将自动接收AI助手消息`;
      
      case 'feishu':
        return `飞书机器人设置指南：
1. 在飞书群中添加自定义机器人
2. 复制Webhook URL并粘贴到上方
3. 如需安全设置，请添加签名密钥
4. 机器人将自动接收AI助手消息`;
      
      default:
        return '';
    }
  }
}