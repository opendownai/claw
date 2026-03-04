export type Language = 'en' | 'zh'

export interface Translations {
  // Header
  discord: string
  github: string
  
  // Home page
  homeTitle: string
  homeSubtitle: string
  homeDescription: string
  oneClickDeploy: string
  getStarted: string
  whyChooseDownclaw: string
  dataLocalStorage: string
  dataLocalStorageDesc: string
  oneClickInstall: string
  oneClickInstallDesc: string
  multiChannelAccess: string
  multiChannelAccessDesc: string
  footerDownclaw: string
  footerLicense: string
  
  // Wizard page
  deployDownclaw: string
  deploySubtitle: string
  step: string
  discordSupport: string
  faq: string
  
  // FAQ
  faqNodeTitle: string
  faqNodeAnswer: string
  faqBrewTitle: string
  faqBrewAnswer: string
  faqInstallFailedTitle: string
  faqInstallFailedAnswer: string
  
  // Step 1 - Select scenario
  selectPurpose: string
  ecommerce: string
  ecommerceDesc: string
  socialMedia: string
  socialMediaDesc: string
  personalAssistant: string
  personalAssistantDesc: string
  developer: string
  developerDesc: string
  researcher: string
  researcherDesc: string
  
   // Step 2 - API Key
  backToSelect: string
  inputMinimaxApiKey: string
  apiKeyHint: string
  apiKeyPlaceholder: string
  codingPlanRecommended: string
  codingPlanDesc: string
  nextStep: string
  securityNote: string
  apiProviderMiniMax: string
  apiProviderAliyun: string
  aliyunRecommended: string
  aliyunDesc: string
  step1Title: string
  step2Title: string
  step3Title: string
  step4Title: string
  
  // Step 3 - Channels
  configureChannels: string
  channelDesc: string
  skipThisStep: string
  channelTip: string
  
  // Step 4 - Install
  startInstall: string
  backToChannels: string
  copyCommand: string
  copied: string
  installCommand: string
  copyAndRun: string
  autoOpenBrowser: string
  
  // Install script steps
  step1Copy: string
  step2Terminal: string
  step3Run: string
  step4Wait: string
  
  // Channel names
  webInterface: string
  webInterfaceDesc: string
  dingtalk: string
  dingtalkDesc: string
  telegram: string
  telegramDesc: string
  feishu: string
  feishuDesc: string
  
  // Channel config fields
  webhookUrl: string
  webhookUrlPlaceholder: string
  secret: string
  secretPlaceholder: string
  botToken: string
  botTokenPlaceholder: string
  chatId: string
  chatIdPlaceholder: string
  
  // Channel setup guides
  setupGuide: string
  dingtalkGuide: string
  telegramGuide: string
  feishuGuide: string
  
  // Test results
  channelNotEnabled: string
  webEnabled: string
  pleaseInputWebhook: string
  webhookValid: string
  webhookInvalid: string
  pleaseInputToken: string
  tokenValid: string
  tokenInvalid: string
  channelNotSupported: string
  
  // Tooltips
  webhookUrlTooltip: string
  
  // Language switcher
  language: string
  english: string
  chinese: string
}

export const translations: Record<Language, Translations> = {
  en: {
    discord: 'Discord',
    github: 'GitHub',
    
    homeTitle: 'opendown.ai - DownClaw',
    homeSubtitle: 'Open source personal AI assistant,\nruns locally, supports multiple messaging channels',
    homeDescription: 'Select purpose → Enter API Key → One-click install, 4 steps to complete',
    oneClickDeploy: 'One-Click Deploy',
    getStarted: 'Get Started',
    whyChooseDownclaw: 'Why Choose DownClaw?',
    dataLocalStorage: 'Local Data Storage',
    dataLocalStorageDesc: 'Your data stays on your own computer',
    oneClickInstall: 'One-Click Install',
    oneClickInstallDesc: '4 steps to complete, no configuration needed',
    multiChannelAccess: 'Multi-Channel Access',
    multiChannelAccessDesc: 'Supports Telegram, Discord and more',
    footerDownclaw: 'DownClaw',
    footerLicense: 'MIT License',
    
    deployDownclaw: 'Deploy DownClaw',
    deploySubtitle: '4 steps to run your AI assistant on your computer',
    step: 'Step',
    discordSupport: 'Discord Support',
    faq: 'FAQ',
    
    faqNodeTitle: 'Q: Node.js not found?',
    faqNodeAnswer: 'A: Visit nodejs.org to download and install, then run the script again',
    faqBrewTitle: 'Q: Mac says no brew?',
    faqBrewAnswer: 'A: Open Terminal and paste:',
    faqInstallFailedTitle: 'Q: Installation failed?',
    faqInstallFailedAnswer: 'A: Join our Discord and send us a screenshot for help',
    
    selectPurpose: 'Select Your Purpose',
    ecommerce: 'E-commerce',
    ecommerceDesc: 'Handle orders, customer service, product listings',
    socialMedia: 'Social Media',
    socialMediaDesc: 'Content creation, posting, data analysis',
    personalAssistant: 'Personal Assistant',
    personalAssistantDesc: 'Schedule management, reminders, info organization',
    developer: 'Developer',
    developerDesc: 'Code writing, debugging, code review',
    researcher: 'Researcher',
    researcherDesc: 'Literature search, summarization, analysis',
    
    backToSelect: '← Back',
    inputMinimaxApiKey: 'Enter MiniMax API Key',
    apiKeyHint: 'Get your API key from:',
    apiKeyPlaceholder: 'sk-xxx...',
    codingPlanRecommended: '💡 Coding Plan Recommended',
    codingPlanDesc: 'While there is free credit, it may not be stable enough. Coding Plan starts at $5/month with more quota.',
    nextStep: 'Next',
    securityNote: 'Security Note: API keys are used locally and not uploaded to any server',
    apiProviderMiniMax: 'MiniMax',
    apiProviderAliyun: 'Alibaba Cloud',
    aliyunRecommended: '💡 Coding Plan Recommended',
    aliyunDesc: 'Access Qwen models via Alibaba Cloud Bailian Coding Plan API.',
    step1Title: 'Select Purpose',
    step2Title: 'Select Channels',
    step3Title: 'Configure API Key',
    step4Title: 'Start Install',
    
    configureChannels: 'Configure Message Channels',
    channelDesc: 'Select platforms you want to integrate. The AI assistant can receive and send messages on these channels.',
    skipThisStep: 'Skip',
    channelTip: 'Tip: Web interface is enabled by default. You can use the AI assistant directly in your browser.',
    
    startInstall: 'Start Installation',
    backToChannels: '← Back',
    copyCommand: 'Copy Install Command',
    copied: 'Copied!',
    installCommand: 'Installation commands have been copied to clipboard',
    copyAndRun: 'Run after copying, all configurations will be completed automatically',
    autoOpenBrowser: 'Then open',
    
    step1Copy: 'Copy the command below',
    step2Terminal: 'Open Terminal (Mac: ⌘+Space, search Terminal)',
    step3Run: 'Paste command and press Enter',
    step4Wait: 'Wait for completion, browser opens automatically',
    
    webInterface: 'Web Interface',
    webInterfaceDesc: 'Interact through DownClaw Web UI',
    dingtalk: 'DingTalk',
    dingtalkDesc: 'Receive and send messages via DingTalk bot',
    telegram: 'Telegram',
    telegramDesc: 'Receive and send messages via Telegram bot',
    feishu: 'Feishu',
    feishuDesc: 'Receive and send messages via Feishu bot',
    
    webhookUrl: 'Webhook URL',
    webhookUrlPlaceholder: 'https://oapi.dingtalk.com/robot/send?access_token=xxx',
    secret: 'Secret',
    secretPlaceholder: 'Signing key from security settings',
    botToken: 'Bot Token',
    botTokenPlaceholder: '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11',
    chatId: 'Chat ID',
    chatIdPlaceholder: '-1001234567890',
    
    setupGuide: 'Setup Guide',
    dingtalkGuide: `DingTalk Bot Setup:
1. Add custom bot to DingTalk group
2. Copy Webhook URL and paste above
3. Add signing key if needed
4. Bot will automatically receive AI assistant messages`,
    telegramGuide: `Telegram Bot Setup:
1. Search @BotFather in Telegram
2. Use /newbot to create a new bot
3. Copy API Token and paste above
4. Bot will automatically receive AI assistant messages`,
    feishuGuide: `Feishu Bot Setup:
1. Add custom bot to Feishu group
2. Copy Webhook URL and paste above
3. Add signing key if needed
4. Bot will automatically receive AI assistant messages`,
    
    channelNotEnabled: 'Channel not enabled',
    webEnabled: 'Web interface enabled, accessible via browser',
    pleaseInputWebhook: 'Please enter DingTalk bot Webhook URL',
    webhookValid: 'DingTalk URL format correct. After config, you can receive AI messages in DingTalk.',
    webhookInvalid: 'DingTalk Webhook URL format incorrect',
    pleaseInputToken: 'Please enter Telegram Bot Token',
    tokenValid: 'Telegram Token format correct. After config, you can receive AI messages in Telegram.',
    tokenInvalid: 'Telegram Bot Token format incorrect',
    channelNotSupported: 'Unsupported channel type',
    
    webhookUrlTooltip: 'Create a bot in messaging platform and get Webhook URL',
    
    language: 'Language',
    english: 'English',
    chinese: '中文',
  },
  zh: {
    discord: 'Discord',
    github: 'GitHub',
    
    homeTitle: 'opendown.ai - DownClaw',
    homeSubtitle: '开源的个人 AI 助手，\n数据存在本地，支持多种消息渠道接入',
    homeDescription: '选择用途 → 输入 API Key → 一键安装，4 步完成',
    oneClickDeploy: '一键部署',
    getStarted: '开始使用',
    whyChooseDownclaw: '为什么选择 DownClaw？',
    dataLocalStorage: '数据本地存储',
    dataLocalStorageDesc: '数据只在你自己的电脑上',
    oneClickInstall: '一键安装',
    oneClickInstallDesc: '4 步完成，无需配置',
    multiChannelAccess: '多渠道接入',
    multiChannelAccessDesc: '支持 Telegram、Discord 等',
    footerDownclaw: 'DownClaw',
    footerLicense: 'MIT License',
    
    deployDownclaw: '部署 DownClaw',
    deploySubtitle: '4 步完成，在你的电脑上运行 AI 助手',
    step: '步骤',
    discordSupport: 'Discord 客服',
    faq: '常见问题',
    
    faqNodeTitle: 'Q: 提示找不到 Node.js 怎么办？',
    faqNodeAnswer: 'A: 访问 nodejs.org 下载安装后重新运行脚本',
    faqBrewTitle: 'Q: Mac 提示没有 brew 怎么办？',
    faqBrewAnswer: 'A: 打开终端，粘贴运行以下命令安装 brew：',
    faqInstallFailedTitle: 'Q: 安装失败怎么办？',
    faqInstallFailedAnswer: 'A: 加入 Discord 群，截图发给我们帮你排查',
    
    selectPurpose: '选择你的用途',
    ecommerce: '电商运营',
    ecommerceDesc: '处理订单、客服咨询、商品上架',
    socialMedia: '社交媒体运营',
    socialMediaDesc: '内容创作、发帖，分析数据',
    personalAssistant: '个人助理',
    personalAssistantDesc: '日程管理、提醒，信息整理',
    developer: '开发助手',
    developerDesc: '代码编写、调试、Code Review',
    researcher: '研究助手',
    researcherDesc: '文献检索、总结，分析',
    
    backToSelect: '← 返回选择',
    inputMinimaxApiKey: '输入 MiniMax API Key',
    apiKeyHint: '获取地址：',
    apiKeyPlaceholder: 'sk-xxx...',
    codingPlanRecommended: '💡 强烈建议购买 Coding Plan',
    codingPlanDesc: '虽然有赠送余额，但不够稳定。Coding Plan 每月仅需 $5 起，用量更充足。',
    nextStep: '下一步',
    securityNote: '安全提示：API密钥仅在本地使用，不会上传到任何服务器',
    apiProviderMiniMax: 'MiniMax',
    apiProviderAliyun: '阿里云',
    aliyunRecommended: '💡 推荐使用Coding Plan',
    aliyunDesc: '通过阿里云百炼Coding Plan API访问通义千问系列模型。',
    step1Title: '选择用途',
    step2Title: '选择渠道',
    step3Title: '配置API密钥',
    step4Title: '开始安装',
    
    configureChannels: '配置消息渠道',
    channelDesc: '选择你想要接入的平台，配置后 AI 助手可以在这些渠道接收和发送消息',
    skipThisStep: '跳过此步',
    channelTip: '提示：Web界面默认已启用，您可以在浏览器中直接使用 AI 助手',
    
    startInstall: '开始安装',
    backToChannels: '← 返回',
    copyCommand: '复制安装命令',
    copied: '已复制！',
    installCommand: '安装命令已复制到剪贴板',
    copyAndRun: '运行后会自动完成所有配置',
    autoOpenBrowser: '然后打开',
    
    step1Copy: '复制下方命令',
    step2Terminal: '打开终端（Mac: ⌘+空格 搜索 Terminal）',
    step3Run: '粘贴命令，回车运行',
    step4Wait: '等待完成，自动打开浏览器',
    
    webInterface: 'Web界面',
    webInterfaceDesc: '通过 DownClaw Web 界面进行交互',
    dingtalk: '钉钉',
    dingtalkDesc: '通过钉钉机器人接收和发送消息',
    telegram: 'Telegram',
    telegramDesc: '通过 Telegram 机器人接收和发送消息',
    feishu: '飞书',
    feishuDesc: '通过飞书机器人接收和发送消息',
    
    webhookUrl: 'Webhook URL',
    webhookUrlPlaceholder: 'https://oapi.dingtalk.com/robot/send?access_token=xxx',
    secret: '签名密钥',
    secretPlaceholder: '安全设置的加签密钥',
    botToken: 'Bot Token',
    botTokenPlaceholder: '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11',
    chatId: 'Chat ID',
    chatIdPlaceholder: '-1001234567890',
    
    setupGuide: '配置指南',
    dingtalkGuide: `钉钉机器人设置指南：
1. 在钉钉群中添加自定义机器人
2. 复制Webhook URL并粘贴到上方
3. 如需安全设置，请添加签名密钥
4. 机器人将自动接收AI助手消息`,
    telegramGuide: `Telegram机器人设置指南：
1. 在Telegram中搜索 @BotFather
2. 使用 /newbot 创建新机器人
3. 复制API Token并粘贴到上方
4. 机器人将自动接收AI助手消息`,
    feishuGuide: `飞书机器人设置指南：
1. 在飞书群中添加自定义机器人
2. 复制Webhook URL并粘贴到上方
3. 如需安全设置，请添加签名密钥
4. 机器人将自动接收AI助手消息`,
    
    channelNotEnabled: '渠道未启用',
    webEnabled: 'Web界面已启用，可通过浏览器访问',
    pleaseInputWebhook: '请先输入钉钉机器人Webhook URL',
    webhookValid: '钉钉机器人URL格式正确，配置完成后可以在钉钉中接收AI助手消息',
    webhookInvalid: '钉钉机器人Webhook URL格式不正确',
    pleaseInputToken: '请先输入Telegram Bot Token',
    tokenValid: 'Telegram Token格式正确，配置完成后可以在Telegram中接收AI助手消息',
    tokenInvalid: 'Telegram Bot Token格式不正确',
    channelNotSupported: '不支持的渠道类型',
    
    webhookUrlTooltip: '请在消息渠道中创建机器人并获取Webhook URL',
    
    language: '语言',
    english: 'English',
    chinese: '中文',
  },
}

export function detectLanguage(): Language {
  if (typeof window === 'undefined') return 'zh'
  
  const stored = localStorage.getItem('language') as Language | null
  if (stored && (stored === 'en' || stored === 'zh')) {
    return stored
  }
  
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('zh')) {
    return 'zh'
  }
  return 'en'
}
