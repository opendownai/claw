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
  logo?: string
  recommended?: boolean
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
    description: '通过 OpenClaw Web 界面进行交互',
    descriptionEn: 'Interact through OpenClaw Web UI',
    icon: 'globe',
    color: '#6366f1',
    configFields: [],
    recommended: true,
    logo: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>'
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
    helpUrl: 'https://www.feishu.cn/content/article/7602519239445974205',
    logo: 'https://p1-hera.feishucdn.com/tos-cn-i-jbbdkfciu3/1ec7129d900e442d8501d810efdaa369~tplv-jbbdkfciu3-image:0:0.image'
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
        name: 'clientId',
        label: 'App Key',
        labelEn: 'App Key',
        type: 'text',
        required: true,
        placeholder: 'DINGTalk应用的AppKey (Client ID)',
        placeholderEn: 'AppKey (Client ID) of DingTalk application'
      },
      {
        name: 'clientSecret',
        label: 'App Secret',
        labelEn: 'App Secret',
        type: 'password',
        required: true,
        placeholder: 'DINGTalk应用的AppSecret (Client Secret)',
        placeholderEn: 'AppSecret (Client Secret) of DingTalk application'
      },
      {
        name: 'agentId',
        label: 'Agent ID',
        labelEn: 'Agent ID',
        type: 'text',
        required: true,
        placeholder: '钉钉AgentId',
        placeholderEn: 'DingTalk Agent ID'
      },
      {
        name: 'corpId',
        label: 'Corp ID',
        labelEn: 'Corp ID',
        type: 'text',
        required: false,
        placeholder: '企业CorpId (可选)',
        placeholderEn: 'Enterprise CorpId (optional)'
      },
      {
        name: 'robotCode',
        label: 'Robot Code',
        labelEn: 'Robot Code',
        type: 'text',
        required: false,
        placeholder: '机器人Code (可选，用于媒体下载)',
        placeholderEn: 'Robot Code (optional, for media download)'
      },
      {
        name: 'dmPolicy',
        label: '私聊策略',
        labelEn: 'DM Policy',
        type: 'select',
        required: false,
        options: [
          { label: '开放', labelEn: 'Open', value: 'open' },
          { label: '需匹配', labelEn: 'Pairing', value: 'pairing' },
          { label: '白名单', labelEn: 'Allowlist', value: 'allowlist' }
        ]
      },
      {
        name: 'groupPolicy',
        label: '群聊策略',
        labelEn: 'Group Policy',
        type: 'select',
        required: false,
        options: [
          { label: '开放', labelEn: 'Open', value: 'open' },
          { label: '白名单', labelEn: 'Allowlist', value: 'allowlist' }
        ]
      },
      {
        name: 'messageType',
        label: '消息类型',
        labelEn: 'Message Type',
        type: 'select',
        required: false,
        options: [
          { label: 'Markdown', labelEn: 'Markdown', value: 'markdown' },
          { label: '卡片', labelEn: 'Card', value: 'card' }
        ]
      },
      {
        name: 'cardTemplateId',
        label: '卡片模板ID',
        labelEn: 'Card Template ID',
        type: 'text',
        required: false,
        placeholder: 'AI卡片模板ID (可选)',
        placeholderEn: 'AI Card template ID (optional)'
      }
    ],
    helpUrl: 'https://open.dingtalk.com/document/dingstart/build-dingtalk-ai-employees',
    logo: 'https://img.alicdn.com/imgextra/i3/O1CN017PqYP51OX3bSJGxQY_!!6000000001714-2-tps-200-200.png'
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
    ],
    logo: '<svg viewBox="0 0 24 24" fill="#26A5E4" xmlns="http://www.w3.org/2000/svg"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"></path></svg>'
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
    ],
    logo: 'https://img.alicdn.com/imgextra/i3/O1CN01xW6E191OTOlht5PNg_!!6000000001706-55-tps-50-50.svg'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    nameEn: 'WhatsApp',
    description: '通过 WhatsApp Business API 接收和发送消息',
    descriptionEn: 'Receive and send messages via WhatsApp Business API',
    icon: 'phone',
    color: '#25D366',
    configFields: [
      {
        name: 'phoneNumberId',
        label: 'Phone Number ID',
        labelEn: 'Phone Number ID',
        type: 'text',
        required: true,
        placeholder: 'Your WhatsApp Business Phone Number ID',
        placeholderEn: 'Your WhatsApp Business Phone Number ID'
      },
      {
        name: 'accessToken',
        label: 'Access Token',
        labelEn: 'Access Token',
        type: 'password',
        required: true,
        placeholder: 'Your WhatsApp Business Access Token',
        placeholderEn: 'Your WhatsApp Business Access Token'
      },
      {
        name: 'webhookVerifyToken',
        label: 'Webhook Verify Token',
        labelEn: 'Webhook Verify Token',
        type: 'text',
        required: false,
        placeholder: 'Your webhook verification token (optional)',
        placeholderEn: 'Your webhook verification token (optional)'
      }
    ],
    logo: '<svg viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>'
  },
  {
    id: 'discord',
    name: 'Discord',
    nameEn: 'Discord',
    description: '通过 Discord 机器人接收和发送消息',
    descriptionEn: 'Receive and send messages via Discord bot',
    icon: 'message-square',
    color: '#5865F2',
    configFields: [
      {
        name: 'botToken',
        label: 'Bot Token',
        labelEn: 'Bot Token',
        type: 'password',
        required: true,
        placeholder: 'Your Discord Bot Token',
        placeholderEn: 'Your Discord Bot Token'
      },
      {
        name: 'applicationId',
        label: 'Application ID',
        labelEn: 'Application ID',
        type: 'text',
        required: true,
        placeholder: 'Your Discord Application ID',
        placeholderEn: 'Your Discord Application ID'
      }
    ],
    logo: '<svg viewBox="0 0 24 24" fill="#5865F2" xmlns="http://www.w3.org/2000/svg"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path></svg>'
  },
  {
    id: 'slack',
    name: 'Slack',
    nameEn: 'Slack',
    description: '通过 Slack App 接收和发送消息',
    descriptionEn: 'Receive and send messages via Slack App',
    icon: 'hash',
    color: '#4A154B',
    configFields: [
      {
        name: 'botToken',
        label: 'Bot Token',
        labelEn: 'Bot Token',
        type: 'password',
        required: true,
        placeholder: 'xoxb-Your-Bot-Token',
        placeholderEn: 'xoxb-Your-Bot-Token'
      },
      {
        name: 'appToken',
        label: 'App Token',
        labelEn: 'App Token',
        type: 'password',
        required: false,
        placeholder: 'xapp-Your-App-Token (for socket mode)',
        placeholderEn: 'xapp-Your-App-Token (for socket mode)'
      }
    ],
    logo: '<svg role="img" viewBox="0 0 24 24" fill="#E01E5A" xmlns="http://www.w3.org/2000/svg"><title>Slack</title><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>'
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
