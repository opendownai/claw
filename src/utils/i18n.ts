export type Language = 'en' | 'zh'

export interface Translations {
  discord: string
  github: string
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
  deployOpenclaw: string
  deploySubtitle: string
  step: string
  discordSupport: string
  faq: string
  faqNodeTitle: string
  faqNodeAnswer: string
  faqBrewTitle: string
  faqBrewAnswer: string
  faqInstallFailedTitle: string
  faqInstallFailedAnswer: string
  selectPurpose: string
  backToSelect: string
  inputMinimaxApiKey: string
  apiKeyPlaceholder: string
  codingPlanRecommended: string
  nextStep: string
  securityNote: string
  apiProviderMiniMax: string
  apiProviderAliyun: string
  step1Title: string
  step2Title: string
  step3Title: string
  step4Title: string
  configureChannels: string
  channelDesc: string
  skipThisStep: string
  channelTip: string
  startInstall: string
  backToChannels: string
  copyCommand: string
  copied: string
  installCommand: string
  copyAndRun: string
  autoOpenBrowser: string
  step1Copy: string
  step2Terminal: string
  step2TerminalWindows: string
  step3Run: string
  step4Wait: string
  webInterface: string
  webInterfaceDesc: string
  dingtalk: string
  dingtalkDesc: string
  telegram: string
  telegramDesc: string
  feishu: string
  feishuDesc: string
  webhookUrl: string
  webhookUrlPlaceholder: string
  secret: string
  secretPlaceholder: string
  botToken: string
  botTokenPlaceholder: string
  chatId: string
  chatIdPlaceholder: string
  setupGuide: string
  dingtalkGuide: string
  telegramGuide: string
  feishuGuide: string
  channelNotEnabled: string
  webEnabled: string
  language: string
  english: string
  chinese: string
  channelHelpLink: string
}

export const translations: Record<Language, Translations> = {
  en: {
    discord: 'Discord',
    github: 'GitHub',
    homeTitle: 'We are on the verge of the Singularity — OpenClaw',
    homeSubtitle: 'Open source personal AI assistant,\nruns locally, supports multiple messaging channels',
    homeDescription: "Select purpose → Choose channels → Configure API → Install, 4 simple steps",
    oneClickDeploy: 'One-Click Deploy OpenClaw',
    getStarted: 'Get Started with OpenClaw',
    whyChooseDownclaw: 'Why Choose OpenClaw?',
    dataLocalStorage: 'Local Data Storage',
    dataLocalStorageDesc: 'Your data stays on your own computer',
    oneClickInstall: 'One-Click Install OpenClaw',
    oneClickInstallDesc: '4 steps to complete, no configuration needed',
    multiChannelAccess: 'Multi-Channel Access for OpenClaw',
    multiChannelAccessDesc: 'Supports Web, DingTalk, Feishu, Telegram, Discord and more platforms',
    footerDownclaw: 'OpenClaw',
    footerLicense: 'MIT License',
    deployOpenclaw: 'Deploy OpenClaw',
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
    backToSelect: '← Back',
    inputMinimaxApiKey: 'Enter MiniMax API Key',
    apiKeyPlaceholder: 'sk-xxx...',
    codingPlanRecommended: '💡 Coding Plan Recommended',
    nextStep: 'Next',
    securityNote: 'Security Note: API keys are used locally and not uploaded to any server',
    apiProviderMiniMax: 'MiniMax',
    apiProviderAliyun: 'Alibaba Cloud',
    step1Title: 'Select Purpose',
    step2Title: 'Select Channels',
    step3Title: 'Configure API Key',
    step4Title: 'Start Install',
    configureChannels: 'Configure Message Channels',
    channelDesc: 'Select platforms you want to integrate.',
    skipThisStep: 'Skip',
    channelTip: 'Tip: Web interface is enabled by default.',
    startInstall: 'Start Installation',
    backToChannels: '← Back',
    copyCommand: 'Copy Install Command',
    copied: 'Copied!',
    installCommand: 'Installation commands have been copied to clipboard',
    copyAndRun: 'Run after copying, all configurations will be completed automatically',
    autoOpenBrowser: 'Then open',
    step1Copy: 'Click to copy install command',
    step2Terminal: 'Open Terminal (Mac: ⌘+Space, search Terminal)',
    step2TerminalWindows: 'Open PowerShell or CMD (Win+X, select Terminal/CMD)',
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
    dingtalkGuide: 'DingTalk Bot Setup:\n1. Add custom bot to DingTalk group\n2. Copy Webhook URL and paste above\n3. Add signing key if needed',
    telegramGuide: 'Telegram Bot Setup:\n1. Search @BotFather in Telegram\n2. Use /newbot to create a new bot\n3. Copy API Token and paste above',
    feishuGuide: 'Feishu Bot Setup:\n1. Add custom bot to Feishu group\n2. Copy Webhook URL and paste above\n3. Add signing key if needed',
    channelNotEnabled: 'Channel not enabled',
    webEnabled: 'Web interface enabled, accessible via browser',
    language: 'Language',
    english: 'English',
    chinese: '中文',
    channelHelpLink: 'View Setup Guide',
  },
  zh: {
    discord: 'Discord',
    github: 'GitHub',
    homeTitle: 'We are on the verge of the Singularity — OpenClaw',
    homeSubtitle: '开源的个人 AI 助手，\n数据存在本地，支持多种消息渠道接入',
    homeDescription: '选择用途 → 选择渠道 → 配置API → 开始安装，4步完成',
    oneClickDeploy: '一键部署 OpenClaw',
    getStarted: '开始使用 OpenClaw',
    whyChooseDownclaw: '为什么选择 OpenClaw？',
    dataLocalStorage: '数据本地存储',
    dataLocalStorageDesc: '数据只在你自己的电脑上',
    oneClickInstall: '一键安装',
    oneClickInstallDesc: '4 步完成，无需配置',
    multiChannelAccess: '多渠道接入',
    multiChannelAccessDesc: '支持 Web、钉钉、飞书、Telegram、Discord 等多平台',
    footerDownclaw: 'OpenClaw',
    footerLicense: 'MIT License',
    deployOpenclaw: '部署 OpenClaw',
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
    backToSelect: '← 返回选择',
    inputMinimaxApiKey: '输入 MiniMax API Key',
    apiKeyPlaceholder: 'sk-xxx...',
    codingPlanRecommended: '💡 强烈建议购买 Coding Plan',
    nextStep: '下一步',
    securityNote: '安全提示：API密钥仅在本地使用，不会上传到任何服务器',
    apiProviderMiniMax: 'MiniMax',
    apiProviderAliyun: '阿里云',
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
    step1Copy: '点我复制安装命令',
    step2Terminal: '打开终端（Mac: ⌘+空格 搜索 Terminal）',
    step2TerminalWindows: '打开 PowerShell 或 CMD（Win+X，选择 Terminal/CMD）',
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
    dingtalkGuide: '钉钉机器人设置指南：\n1. 在钉钉群中添加自定义机器人\n2. 复制Webhook URL并粘贴到上方\n3. 如需安全设置，请添加签名密钥',
    telegramGuide: 'Telegram机器人设置指南：\n1. 在Telegram中搜索 @BotFather\n2. 使用 /newbot 创建新机器人\n3. 复制API Token并粘贴到上方',
    feishuGuide: '飞书机器人设置指南：\n1. 在飞书群中添加自定义机器人\n2. 复制Webhook URL并粘贴到上方\n3. 如需安全设置，请添加签名密钥',
    channelNotEnabled: '渠道未启用',
    webEnabled: 'Web界面已启用，可通过浏览器访问',
    language: '语言',
    english: 'English',
    chinese: '中文',
    channelHelpLink: '查看配置教程',
  },
}

export function detectLanguage(): Language {
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
