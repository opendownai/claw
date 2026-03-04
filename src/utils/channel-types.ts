import type { Language } from './i18n'

export interface ChannelConfig {
  id: string
  name: string
  nameEn: string
  icon: string
  enabled: boolean
  config: Record<string, any>
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
  helpUrl?: string
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
    description: '通过钉钉AI员工接收和发送消息，支持MCP协议深度集成',
    descriptionEn: 'Receive and send messages via DingTalk AI employee with MCP protocol integration',
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
      },
      {
        name: 'mcpServerUrl',
        label: 'MCP服务地址',
        labelEn: 'MCP Server URL',
        type: 'text',
        required: false,
        placeholder: 'https://your-mcp-server.com (可选，用于深度集成)',
        placeholderEn: 'https://your-mcp-server.com (optional, for deep integration)'
      }
    ],
    helpUrl: 'https://open.dingtalk.com/document/dingstart/build-dingtalk-ai-employees'
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
    description: '通过飞书AI员工接收和发送消息，支持WebSocket长连接和事件订阅',
    descriptionEn: 'Receive and send messages via Feishu AI employee with WebSocket connection and event subscription',
    icon: 'zap',
    color: '#4285f4',
    configFields: [
      {
        name: 'appId',
        label: 'App ID',
        labelEn: 'App ID',
        type: 'text',
        required: true,
        placeholder: 'cli_xxx (企业自建应用ID)',
        placeholderEn: 'cli_xxx (Enterprise self-built app ID)'
      },
      {
        name: 'appSecret',
        label: 'App Secret',
        labelEn: 'App Secret',
        type: 'password',
        required: true,
        placeholder: '应用凭证中的App Secret',
        placeholderEn: 'App Secret from application credentials'
      },
      {
        name: 'verificationToken',
        label: '验证令牌',
        labelEn: 'Verification Token',
        type: 'text',
        required: false,
        placeholder: '事件订阅的验证令牌 (可选)',
        placeholderEn: 'Event subscription verification token (optional)'
      },
      {
        name: 'encryptKey',
        label: '加密密钥',
        labelEn: 'Encryption Key',
        type: 'password',
        required: false,
        placeholder: '事件订阅的加密密钥 (可选)',
        placeholderEn: 'Event subscription encryption key (optional)'
      }
    ],
    helpUrl: 'https://www.feishu.cn/content/article/7602519239445974205'
  },
  {
    id: 'iflow',
    name: '心流',
    nameEn: 'iFlow',
    description: '通过心流 AI 助手接收和发送消息',
    descriptionEn: 'Receive and send messages via iFlow AI assistant',
    icon: 'zap',
    color: '#FF6B6B',
    configFields: [
      {
        name: 'webhookUrl',
        label: 'Webhook URL',
        labelEn: 'Webhook URL',
        type: 'text',
        required: true,
        placeholder: 'https://iflow.cn/webhook/xxx',
        placeholderEn: 'https://iflow.cn/webhook/xxx'
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
