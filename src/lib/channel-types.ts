export interface ChannelConfig {
  id: string
  name: string
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
  description: string
  icon: string
  configFields: ConfigField[]
  color: string
}

export interface ConfigField {
  name: string
  label: string
  type: 'text' | 'password' | 'select' | 'toggle'
  required: boolean
  placeholder?: string
  options?: { label: string; value: string }[]
}

export const channelOptions: ChannelOption[] = [
  {
    id: 'web',
    name: 'Web界面',
    description: '通过 DownClaw Web 界面进行交互',
    icon: 'globe',
    color: '#6366f1',
    configFields: []
  },
  {
    id: 'dingtalk',
    name: '钉钉',
    description: '通过钉钉机器人接收和发送消息',
    icon: 'message-circle',
    color: '#1890FF',
    configFields: [
      {
        name: 'webhookUrl',
        label: 'Webhook URL',
        type: 'text',
        required: true,
        placeholder: 'https://oapi.dingtalk.com/robot/send?access_token=xxx'
      },
      {
        name: 'secret',
        label: '签名密钥',
        type: 'password',
        required: false,
        placeholder: '安全设置的加签密钥'
      }
    ]
  },
  {
    id: 'telegram',
    name: 'Telegram',
    description: '通过 Telegram 机器人接收和发送消息',
    icon: 'send',
    color: '#0088cc',
    configFields: [
      {
        name: 'botToken',
        label: 'Bot Token',
        type: 'password',
        required: true,
        placeholder: '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11'
      },
      {
        name: 'chatId',
        label: 'Chat ID',
        type: 'text',
        required: false,
        placeholder: '-1001234567890'
      }
    ]
  },
  {
    id: 'feishu',
    name: '飞书',
    description: '通过飞书机器人接收和发送消息',
    icon: 'zap',
    color: '#4285f4',
    configFields: [
      {
        name: 'webhookUrl',
        label: 'Webhook URL',
        type: 'text',
        required: true,
        placeholder: 'https://open.feishu.cn/open-apis/bot/v2/hook/...'
      },
      {
        name: 'secret',
        label: 'Secret',
        type: 'password',
        required: false,
        placeholder: '自定义机器人安全设置的密钥'
      }
    ]
  }
]