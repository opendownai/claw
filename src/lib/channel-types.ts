import { Language } from './i18n'

export interface ChannelConfig {
  id: string
  name: string
  nameEn: string
  icon: string
  enabled: boolean
  config: {
    [key: string]: any
  }
  webhookUrl?: string
}

export interface ChannelOption {
  id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  icon: string
  configFields: ConfigField[]
  color: string
}

export interface ConfigField {
  name: string
  label: string
  labelEn: string
  type: 'text' | 'password' | 'select' | 'toggle'
  required: boolean
  placeholder?: string
  placeholderEn?: string
  options?: { label: string; labelEn: string; value: string }[]
}

export const channelOptions: ChannelOption[] = [
  {
    id: 'web',
    name: 'Web界面',
    nameEn: 'Web Interface',
    description: '通过 DownClaw Web 界面进行交互',
    descriptionEn: 'Interact through DownClaw Web UI',
    icon: 'globe',
    color: '#6366f1',
    configFields: []
  },
  {
    id: 'dingtalk',
    name: '钉钉',
    nameEn: 'DingTalk',
    description: '通过钉钉机器人接收和发送消息',
    descriptionEn: 'Receive and send messages via DingTalk bot',
    icon: 'message-circle',
    color: '#1890FF',
    configFields: [
      {
        name: 'webhookUrl',
        label: 'Webhook URL',
        labelEn: 'Webhook URL',
        type: 'text',
        required: true,
        placeholder: 'https://oapi.dingtalk.com/robot/send?access_token=xxx',
        placeholderEn: 'https://oapi.dingtalk.com/robot/send?access_token=xxx'
      },
      {
        name: 'secret',
        label: '签名密钥',
        labelEn: 'Secret',
        type: 'password',
        required: false,
        placeholder: '安全设置的加签密钥',
        placeholderEn: 'Signing key from security settings'
      }
    ]
  },
  {
    id: 'telegram',
    name: 'Telegram',
    nameEn: 'Telegram',
    description: '通过 Telegram 机器人接收和发送消息',
    descriptionEn: 'Receive and send messages via Telegram bot',
    icon: 'send',
    color: '#0088cc',
    configFields: [
      {
        name: 'botToken',
        label: 'Bot Token',
        labelEn: 'Bot Token',
        type: 'password',
        required: true,
        placeholder: '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11',
        placeholderEn: '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11'
      },
      {
        name: 'chatId',
        label: 'Chat ID',
        labelEn: 'Chat ID',
        type: 'text',
        required: false,
        placeholder: '-1001234567890',
        placeholderEn: '-1001234567890'
      }
    ]
  },
  {
    id: 'feishu',
    name: '飞书',
    nameEn: 'Feishu',
    description: '通过飞书机器人接收和发送消息',
    descriptionEn: 'Receive and send messages via Feishu bot',
    icon: 'zap',
    color: '#4285f4',
    configFields: [
      {
        name: 'webhookUrl',
        label: 'Webhook URL',
        labelEn: 'Webhook URL',
        type: 'text',
        required: true,
        placeholder: 'https://open.feishu.cn/open-apis/bot/v2/hook/...',
        placeholderEn: 'https://open.feishu.cn/open-apis/bot/v2/hook/...'
      },
      {
        name: 'secret',
        label: 'Secret',
        labelEn: 'Secret',
        type: 'password',
        required: false,
        placeholder: '自定义机器人安全设置的密钥',
        placeholderEn: 'Custom bot security signing key'
      }
    ]
  }
]

export function getChannelOptionName(option: ChannelOption, language: Language): string {
  return language === 'zh' ? option.name : option.nameEn
}

export function getChannelOptionDescription(option: ChannelOption, language: Language): string {
  return language === 'zh' ? option.description : option.descriptionEn
}

export function getChannelConfigFieldLabel(field: ConfigField, language: Language): string {
  return language === 'zh' ? field.label : field.labelEn
}

export function getChannelConfigFieldPlaceholder(field: ConfigField, language: Language): string | undefined {
  if (language === 'zh' && field.placeholder) return field.placeholder
  if (language === 'en' && field.placeholderEn) return field.placeholderEn
  return field.placeholder
}
