<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18nStore } from '@/stores/i18n'
import { ChannelManager } from '@/utils/channel-manager'
import { channelOptions, type ChannelConfig } from '@/utils/channel-types'
import { 
  Sparkles, ShoppingBag, Megaphone, User, Code, BookOpen, 
  Copy, Check, ArrowRight, AlertCircle, HelpCircle, MessageCircle,
  TrendingUp, Plane, Store, Factory, Home, Users, FactoryIcon, ChevronDown
} from 'lucide-vue-next'
import ChannelCard from '@/components/wizard/ChannelCard.vue'
import KeySequence from '@/components/wizard/KeySequence.vue'

const { t } = useI18nStore()
const { language } = storeToRefs(useI18nStore())

interface Provider {
  id: 'minimax' | 'aliyun' | 'iflow'
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  consoleUrl: string
  apiKeyLabel: string
  apiKeyPlaceholder: string
  logo?: string
  recommended?: boolean
}

const providers: Provider[] = [
  {
    id: 'minimax',
    name: 'MiniMax',
    nameEn: 'MiniMax',
    description: '支持 MiniMax-M2.5 模型，适合中文场景',
    descriptionEn: 'Supports MiniMax-M2.5 model, suitable for Chinese scenarios',
    consoleUrl: 'https://platform.minimaxi.com/user-center/basic-information/interface-key',
    apiKeyLabel: 'MiniMax API Key',
    apiKeyPlaceholder: 'sk-xxx...',
    logo: '<svg role="img" viewBox="0 0 24 24" fill="#2563EB" xmlns="http://www.w3.org/2000/svg"><title>MiniMax</title><path d="M11.43 3.92a.86.86 0 1 0-1.718 0v14.236a1.999 1.999 0 0 1-3.997 0V9.022a.86.86 0 1 0-1.718 0v3.87a1.999 1.999 0 0 1-3.997 0V11.49a.57.57 0 0 1 1.139 0v1.404a.86.86 0 0 0 1.719 0V9.022a1.999 1.999 0 0 1 3.997 0v9.134a.86.86 0 0 0 1.719 0V3.92a1.998 1.998 0 1 1 3.996 0v11.788a.57.57 0 1 1-1.139 0zm10.572 3.105a2 2 0 0 0-1.999 1.997v7.63a.86.86 0 0 1-1.718 0V3.923a1.999 1.999 0 0 0-3.997 0v16.16a.86.86 0 0 1-1.719 0V18.08a.57.57 0 1 0-1.138 0v2a1.998 1.998 0 0 0 3.996 0V3.92a.86.86 0 0 1 1.719 0v12.73a1.999 1.999 0 0 0 3.996 0V9.023a.86.86 0 1 1 1.72 0v6.686a.57.57 0 0 0 1.138 0V9.022a2 2 0 0 0-1.998-1.997"/></svg>',
    recommended: true
  },
  {
    id: 'aliyun',
    name: '阿里云百炼',
    nameEn: 'Alibaba Cloud',
    description: '推荐模型：qwen3.5-plus、kimi-k2.5、glm-5、MiniMax-M2.5',
    descriptionEn: 'Recommended: qwen3.5-plus, kimi-k2.5, glm-5, MiniMax-M2.5',
    consoleUrl: 'https://bailian.console.aliyun.com/cn-beijing/?tab=coding-plan#/efm/detail',
    apiKeyLabel: '阿里云百炼 API Key',
    apiKeyPlaceholder: 'sk-xxx...',
    logo: 'https://gw.alicdn.com/imgextra/i4/O1CN01vVn7g32134zNZEeAR_!!6000000006928-55-tps-24-24.svg'
  },
  {
    id: 'iflow',
    name: '心流 (iFlow)',
    nameEn: 'iFlow',
    description: '支持 Qwen3、DeepSeek-R1、Kimi K2 等多种模型',
    descriptionEn: 'Supports Qwen3, DeepSeek-R1, Kimi K2 and more models',
    consoleUrl: 'https://platform.iflow.cn/profile?tab=apiKey',
    apiKeyLabel: '心流 API Key',
    apiKeyPlaceholder: 'sk-xxx...',
    logo: 'https://img.alicdn.com/imgextra/i1/O1CN01nulwex1q7Eq1TVqUh_!!6000000005448-55-tps-32-32.svg'
  }
]

const selectedProvider = computed(() => {
  return providers.find(p => p.id === apiKeyProvider.value)
})

function isInlineSvg(logo?: string): boolean {
  if (!logo) return false
  return logo.trim().startsWith('<svg')
}

function selectProvider(id: Provider['id']) {
  apiKeyProvider.value = id
  apiKey.value = ''
}

const step = ref(1)
const apiKey = ref('')
const apiKeyProvider = ref<'minimax' | 'aliyun' | 'iflow'>('minimax')
const selectedScenario = ref<Scenario | null>(null)
const copied = ref(false)
const showHelp = ref(false)
const isWindows = ref(typeof navigator !== 'undefined' && navigator.platform.toLowerCase().includes('win'))
const alreadyInstalled = ref(false)
const commandCopied = ref(false)
const commandExpanded = ref(false)
const channelsExpanded = ref(false)
const step1Copied = ref(false)

const step2TerminalText = computed(() => {
  return isWindows.value ? t.step2TerminalWindows : t.step2Terminal
})
const channels = ref<ChannelConfig[]>([])

const iconMap: Record<string, any> = {
  'shopping-bag': ShoppingBag,
  'megaphone': Megaphone,
  'user': User,
  'code': Code,
  'book-open': BookOpen,
  'trending-up': TrendingUp,
  'plane': Plane,
  'store': Store,
  'factory': Factory,
  'home': Home,
  'users': Users,
  'factory-icon': FactoryIcon,
}

interface Scenario {
  id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  icon: string
  skills?: string[]
}

const scenarios: Scenario[] = [
  {
    id: 'personal-assistant',
    name: '个人或企业数字助理',
    nameEn: 'Personal or Enterprise Digital Assistant',
    description: '日程管理、邮件处理、文件整理',
    descriptionEn: 'Schedule management, email handling, file organization',
    icon: 'user',
    skills: ['email-daily-summary', 'calendar', 'gog-calendar', 'notion'],
  },
  {
    id: 'developer',
    name: '多Agent开发团队',
    nameEn: 'Multi-Agent Development Team',
    description: '代码编写、测试、多Agent协作',
    descriptionEn: 'Code writing, testing, multi-agent collaboration',
    icon: 'code',
    skills: ['github', 'git', 'docker', 'terminal', 'agent-browser'],
  },
  {
    id: 'ecommerce',
    name: '电商/直播带货数字客服',
    nameEn: 'E-commerce/Live Streaming Digital Customer Service',
    description: '库存监控、价格调整、订单处理',
    descriptionEn: 'Inventory monitoring, price adjustment, order processing',
    icon: 'shopping-bag',
    skills: ['email-daily-summary', 'gog-calendar', 'google-search', 'browser', 'slack', 'discord'],
  },
  {
    id: 'content-creator',
    name: '内容创作社交媒体运营',
    nameEn: 'Content Creation Social Media Operation',
    description: '资讯收集、内容生成、账号管理',
    descriptionEn: 'Information gathering, content generation, account management',
    icon: 'megaphone',
    skills: ['x-twitter', 'slack', 'content-generation', 'web-fetch', 'google-search'],
  },
  {
    id: 'trading-assistant',
    name: '金融交易助手',
    nameEn: 'Financial Trading Assistant',
    description: '交易执行、持仓分析、新闻监控',
    descriptionEn: 'Trading execution, position analysis, news monitoring',
    icon: 'trending-up',
    skills: ['api-gateway', 'notion', 'browser', 'data-analysis', 'web-fetch'],
  },
  {
    id: 'flight-booking',
    name: '航空旅游数字员工',
    nameEn: 'Aviation & Travel Digital Employee',
    description: '订票改签、值机、客服处理',
    descriptionEn: 'Ticket booking, check-in, customer service',
    icon: 'plane',
    skills: ['browser', 'screen-control', 'email-daily-summary', 'calendar'],
  },
  {
    id: 'retail-customer-service',
    name: '餐饮零售智能客服',
    nameEn: 'Food & Retail Smart Customer Service',
    description: '订单处理、问题解决、客户服务',
    descriptionEn: 'Order processing, problem solving, customer service',
    icon: 'store',
    skills: ['browser', 'google-search', 'slack', 'discord'],
  },
  {
    id: 'manufacturing-qa',
    name: '制造业质检员工',
    nameEn: 'Manufacturing Quality Inspector',
    description: '数据录入、报表生成、质检辅助',
    descriptionEn: 'Data entry, report generation, quality inspection',
    icon: 'factory',
    skills: ['vision', 'screen-control', 'database', 'notion'],
  },
  {
    id: 'smart-home',
    name: '智能家居管家',
    nameEn: 'Smart Home Butler',
    description: '设备控制、环境调节、自动化场景',
    descriptionEn: 'Device control, environment adjustment, automation',
    icon: 'home',
    skills: ['home-assistant', 'calendar', 'web-fetch'],
  },
  {
    id: 'hr-admin',
    name: 'HR/行政文档处理员工',
    nameEn: 'HR/Admin Document Processing',
    description: '知识库管理、文档处理、流程自动化',
    descriptionEn: 'Knowledge base, document processing, workflow automation',
    icon: 'users',
    skills: ['notion', 'browser', 'slack', 'email-daily-summary', 'calendar'],
  },
]

const localizedScenarios = computed(() => {
  return scenarios.map(s => ({
    ...s,
    name: language.value === 'zh' ? s.name : s.nameEn,
    description: language.value === 'zh' ? s.description : s.descriptionEn
  }))
})

const channelManager = computed(() => new ChannelManager(channels.value))

const installScript = computed(() => {
  if (!selectedScenario.value || !apiKey.value) return ''

  const scenario = scenarios.find(s => s.id === selectedScenario.value?.id)

  const bailianModels = [
    { id: "qwen3.5-plus", name: "qwen3.5-plus", api: "openai-completions", reasoning: false, input: ["text", "image"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 1000000, maxTokens: 65536 },
    { id: "qwen3-max-2026-01-23", name: "qwen3-max-2026-01-23", api: "openai-completions", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 262144, maxTokens: 65536 },
    { id: "qwen3-coder-next", name: "qwen3-coder-next", api: "openai-completions", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 262144, maxTokens: 65536 },
    { id: "qwen3-coder-plus", name: "qwen3-coder-plus", api: "openai-completions", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 1000000, maxTokens: 65536 },
    { id: "MiniMax-M2.5", name: "MiniMax-M2.5", api: "openai-completions", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 1000000, maxTokens: 65536 },
    { id: "glm-5", name: "glm-5", api: "openai-completions", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 202752, maxTokens: 16384 },
    { id: "glm-4.7", name: "glm-4.7", api: "openai-completions", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 202752, maxTokens: 16384 },
    { id: "kimi-k2.5", name: "kimi-k2.5", api: "openai-completions", reasoning: false, input: ["text", "image"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 262144, maxTokens: 32768 },
  ]

  const iflowModels = [
    { id: "qwen3-coder-plus", name: "qwen3-coder-plus", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 1000000, maxTokens: 65536 },
    { id: "iflow-rome-30ba3b", name: "iflow-rome-30ba3b", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 1000000, maxTokens: 65536 },
  ]

  const minimaxModels = [
    { id: "MiniMax-M2.5", name: "MiniMax-M2.5", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 1000000, maxTokens: 65536 },
  ]

  let providerConfig: any
  let primaryModel: string

  if (apiKeyProvider.value === 'minimax') {
    providerConfig = {
      minimax: {
        baseUrl: "https://api.minimaxi.com/v1",
        apiKey: apiKey.value,
        api: "openai-completions",
        models: minimaxModels
      }
    }
    primaryModel = "minimax/MiniMax-M2.5"
  } else if (apiKeyProvider.value === 'aliyun') {
    providerConfig = {
      bailian: {
        baseUrl: "https://coding.dashscope.aliyuncs.com/v1",
        apiKey: apiKey.value,
        api: "openai-completions",
        models: bailianModels
      }
    }
    primaryModel = "bailian/qwen3.5-plus"
  } else {
    providerConfig = {
      iflow: {
        baseUrl: "https://apis.iflow.cn/v1",
        apiKey: apiKey.value,
        api: "openai-completions",
        models: iflowModels
      }
    }
    primaryModel = "iflow/iflow-rome-30ba3b"
  }

  const modelConfigs = apiKeyProvider.value === 'minimax' 
    ? Object.fromEntries(minimaxModels.map(m => [`minimax/${m.id}`, {}]))
    : apiKeyProvider.value === 'aliyun'
    ? Object.fromEntries(bailianModels.map(m => [`bailian/${m.id}`, {}]))
    : Object.fromEntries(iflowModels.map(m => [`iflow/${m.id}`, {}]))

  const isWindows = typeof window !== 'undefined' && navigator.platform.toLowerCase().includes('win')

  const enabledChannels = channelManager.value.getEnabledChannels().filter(c => c.id !== 'web')
  
  const pluginsConfig: Record<string, { enabled: boolean }> = {}
  const pluginInstallCommands: string[] = []
  
  enabledChannels.forEach(channel => {
    if (channel.id === 'telegram') {
      pluginsConfig['telegram'] = { enabled: true }
    } else if (channel.id === 'dingtalk') {
      pluginsConfig['dingtalk'] = { enabled: true }
      const eol = isWindows ? '\r\n' : '\n'
      const installCmd = isWindows 
        ? 'openclaw plugins install @soimy/dingtalk'
        : 'openclaw plugins install @soimy/dingtalk'
      pluginInstallCommands.push(installCmd)
    }
  })

  const configObj = {
    meta: { 
      lastTouchedVersion: "2026.2.23", 
      lastTouchedAt: new Date().toISOString(),
    },
    models: {
      mode: "merge",
      providers: providerConfig
    },
    agents: { 
      defaults: { 
        model: { primary: primaryModel },
        models: modelConfigs
      } 
    },
    messages: { ackReactionScope: "group-mentions" },
    session: { dmScope: "per-channel-peer" },
    commands: { native: "auto", nativeSkills: "auto", restart: true, ownerDisplay: "raw" },
    hooks: { internal: { enabled: true, entries: { "boot-md": { enabled: true }, "bootstrap-extra-files": { enabled: true }, "command-logger": { enabled: true }, "session-memory": { enabled: true } } } },
    channels: Object.fromEntries(enabledChannels.map(c => [c.id, { enabled: true, ...c.config }])),
    gateway: { port: 18789, mode: "local", bind: "loopback", auth: { mode: "token", token: "CHANGE_THIS_TOKEN" }, tailscale: { mode: "off", resetOnExit: false } },
    skills: { install: { nodeManager: "npm" } },
    plugins: { entries: pluginsConfig }
  }

  const configJson = JSON.stringify(configObj, null, 2)

  const shellHeader = isWindows 
    ? '@echo off\r\nrem Windows CMD\r\n'
    : '#!/bin/bash'

  const openBrowser = isWindows
    ? 'start http://127.0.0.1:18789'
    : 'open http://127.0.0.1:18789'

  const backgroundRun = isWindows
    ? 'start /b openclaw gateway --port 18789 > %USERPROFILE%\\.openclaw\\gateway.log 2>&1'
    : 'openclaw gateway --port 18789 > ~/.openclaw/gateway.log 2>&1 &'

  const skillsInstall = scenario?.skills 
    ? scenario.skills.map((skill: string) => isWindows 
      ? `npx clawhub@latest install ${skill}`
      : `npx clawhub@latest install ${skill}`).join(isWindows ? '\r\n' : '\n')
    : (isWindows ? 'echo No skills to install' : 'echo "No skills to install"')

  const configWrite = isWindows
    ? `echo ${configJson.replace(/"/g, '""').replace(/\n/g, '\r\n')} > %USERPROFILE%\\.openclaw\\openclaw.json`
    : `mkdir -p ~/.openclaw && cat > ~/.openclaw/openclaw.json << 'EOF'
${configJson}
EOF`

  const skillsParam = scenario?.skills ? scenario.skills.join(',') : ''
  const channelsConfig = Object.fromEntries(channelManager.value.getEnabledChannels().filter(c => c.id !== 'web').map(c => [c.id, { enabled: true, ...c.config }]))
  const channelsJson = btoa(JSON.stringify(channelsConfig))
  
  // Define install modules as separate functions
  const getInstallModule = () => {
    if (alreadyInstalled.value) return ''
    return isWindows 
      ? 'curl -fsSL https://opendown.ai/cinstall.sh -o install.bat && call install.bat && del install.bat\n'
      : 'curl -fsSL https://opendown.ai/cinstall.sh | bash\n'
  }
  
  const getConfigModule = () => {
    const eol = isWindows ? '\r\n' : '\n'
    const configWrite = isWindows
      ? `mkdir %USERPROFILE%\\.openclaw 2>nul${eol}if exist %USERPROFILE%\\.openclaw\\openclaw.json copy %USERPROFILE%\\.openclaw\\openclaw.json %USERPROFILE%\\.openclaw\\openclaw.json.bak${eol}echo ${configJson.replace(/"/g, '""').replace(/\n/g, eol)} > %USERPROFILE%\\.openclaw\\openclaw.json`
      : `mkdir -p ~/.openclaw && if [ -f ~/.openclaw/openclaw.json ]; then cp ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.bak; fi && cat > ~/.openclaw/openclaw.json << 'EOF'${eol}${configJson}${eol}EOF`
    return `echo ""${eol}echo "====== Write Config ======"${eol}echo ""${eol}${configWrite}\n`
  }
  
  const getSkillsModule = () => {
    if (!scenario?.skills || scenario.skills.length === 0) return ''
    const eol = isWindows ? '\r\n' : '\n'
    const skillsCommands = scenario.skills.map((skill: string) => 
      isWindows ? `npx clawhub@latest install ${skill}` : `npx clawhub@latest install ${skill}`
    ).join(eol)
    return `echo ""${eol}echo "====== Install Skills ======"${eol}echo ""${eol}${skillsCommands}\n`
  }
  
  const getPluginsModule = () => {
    if (pluginInstallCommands.length === 0) return ''
    const eol = isWindows ? '\r\n' : '\n'
    const commands = pluginInstallCommands.join(eol)
    return `echo ""${eol}echo "====== Install Plugins ======"${eol}echo ""${eol}${commands}\n`
  }
  
  const getRestartModule = () => {
    const eol = isWindows ? '\r\n' : '\n'
    const restartCmd = isWindows
      ? 'start /b openclaw gateway --port 18789 > %USERPROFILE%\\.openclaw\\gateway.log 2>&1'
      : 'openclaw gateway --port 18789 > ~/.openclaw/gateway.log 2>&1 &'
    return `echo ""${eol}echo "====== Restart Service ======"${eol}echo ""${eol}${restartCmd}\n`
  }
  
  const getBrowserModule = () => {
    const eol = isWindows ? '\r\n' : '\n'
    const browserCmd = isWindows ? 'start http://127.0.0.1:18789' : 'open http://127.0.0.1:18789'
    return `echo ""${eol}echo "====== Open Browser ======"${eol}echo ""${eol}${browserCmd}\n`
  }
  
  // Combine modules based on installation type
  let installCommand: string
  if (alreadyInstalled.value) {
    // For already installed: config, plugins, skills, restart, browser
    installCommand = getConfigModule() + getPluginsModule() + getSkillsModule() + getRestartModule() + getBrowserModule()
  } else {
    // For new install: install, config, plugins, skills, restart, browser
    installCommand = getInstallModule() + getConfigModule() + getPluginsModule() + getSkillsModule() + getRestartModule() + getBrowserModule()
  }
  
  return installCommand.trim()
})

function selectScenario(scenario: Scenario) {
  selectedScenario.value = scenario
  step.value = 2
}

function handleChannelToggle(id: string, enabled: boolean) {
  channelManager.value.toggleChannel(id, enabled)
  channels.value = channelManager.value.getAllChannels()
}

function handleChannelConfigChange(id: string, field: string, value: any) {
  const channel = channelManager.value.getChannel(id)
  if (channel) {
    const newConfig = { ...channel.config, [field]: value }
    channelManager.value.updateChannel(id, { config: newConfig })
    channels.value = channelManager.value.getAllChannels()
  }
}

function copyCommand() {
  navigator.clipboard.writeText(installScript.value).then(() => {
    copied.value = true
    commandCopied.value = true
    step1Copied.value = true
    setTimeout(() => {
      copied.value = false
      commandCopied.value = false
      step1Copied.value = false
    }, 2000)
  })
}

onMounted(() => {
  const initialChannels: ChannelConfig[] = channelOptions.map(option => ({
    id: option.id,
    name: option.name,
    nameEn: option.nameEn,
    icon: option.icon,
    enabled: option.id === 'web',
    config: {}
  }))
  channels.value = initialChannels
})
</script>

<template>
  <div class="wizard">
    <div class="container wizard-container">
      <div class="wizard-header">
        <h1 class="wizard-title">{{ t.deployOpenclaw }}</h1>
        <p class="wizard-subtitle">{{ t.homeDescription }}</p>
      </div>

      <div class="steps-indicator">
        <div v-for="s in 4" :key="s" class="step-item" @click="step > s ? step = s : null" :style="{ cursor: step > s ? 'pointer' : 'default' }">
          <div 
            class="step-circle" 
            :class="{ active: step >= s, completed: step > s }"
          >
            <Check v-if="step > s" class="step-icon" />
            <span v-else>{{ s }}</span>
          </div>
          <div v-if="s < 4" class="step-line" :class="{ active: step > s }" />
        </div>
      </div>

      <div class="wizard-actions">
        <a href="https://xhslink.com/o/9xDi3Ca4uSD" target="_blank" class="action-btn">
          <svg viewBox="0 0 24 24" fill="#E6002A" class="icon">
            <circle cx="12" cy="12" r="10"/>
          </svg>
          {{ language === 'zh' ? '小红书' : 'Xiaohongshu' }}
        </a>
        <button @click="showHelp = !showHelp" class="action-btn">
          <HelpCircle class="icon" />
          {{ t.faq }}
        </button>
      </div>

      <div v-if="showHelp" class="faq-section">
        <p><strong>{{ t.faqNodeTitle }}</strong></p>
        <p>{{ t.faqNodeAnswer }}</p>
        <p><strong>{{ t.faqBrewTitle }}</strong></p>
        <p>{{ t.faqBrewAnswer }}</p>
      </div>

      <!-- Step 1: Select Scenario -->
      <div v-if="step === 1" class="step-content">
        <h2 class="step-title">{{ t.step1Title }}</h2>
        <div class="scenarios-grid">
          <button 
            v-for="scenario in localizedScenarios" 
            :key="scenario.id"
            @click="selectScenario(scenario)"
            class="scenario-card card-apple"
          >
            <component :is="iconMap[scenario.icon] || Sparkles" class="scenario-icon" />
            <div class="scenario-name">{{ scenario.name }}</div>
            <div class="scenario-desc">{{ scenario.description }}</div>
          </button>
        </div>
        
        <div class="step-tip">{{ t.channelTip }}</div>
      </div>

      <!-- Step 2: Select Channels -->
      <div v-if="step === 2" class="step-content">
        <div class="step-header">
          <button @click="step = 1" class="back-btn">{{ t.backToSelect }}</button>
          <button @click="step = 3" class="next-btn">
            {{ t.nextStep }} <ArrowRight class="btn-icon" />
          </button>
        </div>
        <h2 class="step-title">{{ t.step2Title }}</h2>
        
        <div class="step-tip">{{ language === 'zh' ? '推荐先体验 Web 界面，后续可随时添加其他渠道' : 'Recommended to try Web Interface first, other channels can be added later' }}</div>
        
        <div class="channels-list">
          <ChannelCard
            :key="'web'"
            :channel="channelManager.getChannel('web') || { id: 'web', name: 'Web界面', nameEn: 'Web Interface', icon: 'globe', enabled: true, config: {} }"
            :channel-option="channelOptions.find(c => c.id === 'web')!"
            @toggle="handleChannelToggle"
            @update:config="handleChannelConfigChange"
          />
          
          <div class="more-channels">
            <button @click="channelsExpanded = !channelsExpanded" class="more-channels-btn">
              <ChevronDown class="expand-icon" :class="{ expanded: channelsExpanded }" />
              <span>{{ language === 'zh' ? '更多渠道' : 'More Channels' }} ({{ channelOptions.length - 1 }})</span>
            </button>
            
            <div v-show="channelsExpanded" class="more-channels-list">
              <ChannelCard
                v-for="option in channelOptions.filter(c => c.id !== 'web')"
                :key="option.id"
                :channel="channelManager.getChannel(option.id) || { id: option.id, name: option.name, nameEn: option.nameEn, icon: option.icon, enabled: false, config: {} }"
                :channel-option="option"
                @toggle="handleChannelToggle"
                @update:config="handleChannelConfigChange"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: API Key -->
      <div v-if="step === 3" class="step-content">
        <div class="step-header">
          <button @click="step = 2" class="back-btn">{{ t.backToChannels }}</button>
          <button @click="step = 4" :disabled="!apiKey" class="next-btn" :class="{ disabled: !apiKey }">
            {{ t.nextStep }} <ArrowRight class="btn-icon" />
          </button>
        </div>
        <h2 class="step-title">{{ t.step3Title }}</h2>
        
        <div class="provider-tabs">
          <button 
            v-for="provider in providers" 
            :key="provider.id"
            @click="selectProvider(provider.id)"
            class="provider-tab"
            :class="{ active: apiKeyProvider === provider.id }"
          >
            <img v-if="provider.logo && !isInlineSvg(provider.logo)" :src="provider.logo" class="provider-logo-img" />
            <span v-else-if="provider.logo && isInlineSvg(provider.logo)" class="provider-logo-svg" v-html="provider.logo"></span>
            <span class="provider-tab-name">{{ language === 'zh' ? provider.name : provider.nameEn }}</span>
            <span v-if="provider.recommended" class="provider-tab-badge">Recommended</span>
          </button>
        </div>

        <div class="provider-config">
          <div class="provider-info">
            <p class="provider-desc">{{ language === 'zh' ? selectedProvider?.description : selectedProvider?.descriptionEn }}</p>
            <div class="provider-tip">
              <span class="tip-icon">💡</span>
              <span v-if="language === 'zh'">
                <span v-if="selectedProvider?.id === 'aliyun'">建议使用 Coding Plan 以获得最佳代码相关功能</span>
                <span v-else-if="selectedProvider?.id === 'minimax'">建议使用支持 coding plan 的模型以获得最佳代码相关功能</span>
                <span v-else>建议使用支持 coding plan 的模型以获得最佳代码相关功能</span>
              </span>
              <span v-else>
                <span v-if="selectedProvider?.id === 'aliyun'">Recommended to use Coding Plan for best code-related features</span>
                <span v-else-if="selectedProvider?.id === 'minimax'">Recommended to use coding plan models for best code-related features</span>
                <span v-else>Recommended to use coding plan models for best code-related features</span>
              </span>
            </div>
            <a 
              :href="selectedProvider?.consoleUrl" 
              target="_blank" 
              class="provider-console-link"
            >
              {{ language === 'zh' ? '获取 API Key →' : 'Get API Key →' }}
            </a>
          </div>
          
          <div class="api-input-section">
            <label class="input-label">{{ selectedProvider?.apiKeyLabel }}</label>
            <input
              v-model="apiKey"
              type="password"
              class="api-input"
              :placeholder="selectedProvider?.apiKeyPlaceholder"
            />
            <p class="security-note">{{ t.securityNote }}</p>
          </div>
        </div>
        
        <div class="step-actions">
          <button @click="step = 4" :disabled="!apiKey" class="btn btn-primary" :class="{ disabled: !apiKey }">
            {{ t.nextStep }} <ArrowRight class="btn-icon" />
          </button>
        </div>
      </div>

      <!-- Step 4: Install -->
      <div v-if="step === 4" class="step-content">
        <div class="step-header">
          <button @click="step = 3" class="back-btn">{{ t.backToChannels }}</button>
        </div>
        <h2 class="step-title">{{ t.step4Title }}</h2>
        
        <div class="already-installed-check">
          <label class="checkbox-label" :title="language === 'zh' ? '勾选后将跳过 OpenClaw CLI 安装脚本，但仍会执行：写入配置文件 → 安装技能 → 重启服务 → 打开浏览器' : 'Skip OpenClaw CLI install script, but still execute: write config → install skills → restart service → open browser'">
            <input type="checkbox" v-model="alreadyInstalled" class="checkbox-input">
            <span class="checkbox-text">{{ language === 'zh' ? '我已安装，只需更新配置（仍会安装 skills 和重启服务）' : 'Already installed, just update config (skills install & service restart still required)' }}</span>
          </label>
        </div>
        
        <div class="install-steps card-apple">
          <div class="install-step clickable" @click="copyCommand">
            <span class="step-num">1</span>
            <span v-if="step1Copied" class="step-copied">{{ language === 'zh' ? '✓ 已复制' : '✓ Copied' }}</span>
            <span v-else>{{ t.step1Copy }}</span>
          </div>
          <div class="install-step">
            <span class="step-num">2</span>
            <div class="step-2-content">
              <KeySequence />
              <span class="step-2-text">{{ step2TerminalText }}</span>
            </div>
          </div>
          <div class="install-step">
            <span class="step-num">3</span>
            <div class="step-2-content">
              <KeySequence type="paste" />
              <span class="step-2-text">{{ t.step3Run }}</span>
            </div>
          </div>
          <div class="install-step">
            <span class="step-num success">✓</span>
            <span>{{ t.step4Wait }}</span>
          </div>
        </div>

        <div class="command-preview card-apple">
          <div class="command-header">
            <button @click="commandExpanded = !commandExpanded" class="expand-btn">
              <ChevronDown class="expand-icon" :class="{ expanded: commandExpanded }" />
              <span class="command-title">{{ language === 'zh' ? '安装命令预览' : 'Install Command Preview' }}</span>
            </button>
          </div>
          <pre v-show="commandExpanded" class="command-content">{{ installScript }}</pre>
        </div>

        <p class="install-hint">
          {{ isWindows 
            ? (language === 'zh' ? '复制上述命令并粘贴到 PowerShell 或 CMD 中运行' : 'Copy the command above and paste it into PowerShell or CMD to run')
            : (language === 'zh' ? '复制上述命令并粘贴到您的终端中运行' : 'Copy the command above and paste it into your terminal to run')
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wizard {
  min-height: calc(100vh - 140px);
  padding: 40px 0 60px;
  background: var(--bg-primary);
}

.wizard-container {
  max-width: 640px;
  margin: 0 auto;
}

.wizard-header {
  text-align: center;
  margin-bottom: 32px;
}

.wizard-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.wizard-subtitle {
  font-size: 14px;
  color: var(--text-tertiary);
}

.steps-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
}

.step-item {
  display: flex;
  align-items: center;
}

.step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  background: var(--border-color);
  color: var(--text-tertiary);
  transition: all 0.2s;
  border: 2px solid var(--border-color);
}

.step-circle.active {
  background: var(--accent-blue);
  color: white;
  border-color: var(--accent-blue);
}

.step-circle.completed {
  background: var(--accent-green);
  color: white;
  border-color: var(--accent-green);
}

.step-icon {
  width: 18px;
  height: 18px;
}

.step-line {
  width: 40px;
  height: 3px;
  background: var(--border-color);
  transition: all 0.2s;
}

.step-line.active {
  background: var(--accent-blue);
}

.wizard-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 13px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 100px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.action-btn .icon {
  width: 16px;
  height: 16px;
}

.faq-section {
  padding: 16px;
  margin-bottom: 24px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  font-size: 13px;
  color: var(--text-tertiary);
}

.step-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.step-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 24px;
}

.back-btn {
  background: none;
  border: none;
  color: var(--text-tertiary);
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 16px;
  padding: 0;
}

.back-btn:hover {
  color: var(--text-primary);
}

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.scenario-card {
  padding: 20px;
  text-align: left;
  cursor: pointer;
  border: 1px solid transparent;
}

.scenario-card:hover {
  border-color: var(--accent-blue);
}

.scenario-icon {
  width: 24px;
  height: 24px;
  color: var(--accent-blue);
  margin-bottom: 12px;
}

.scenario-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.scenario-desc {
  font-size: 12px;
  color: var(--text-tertiary);
}

.step-tip {
  font-size: 13px;
  color: var(--text-tertiary);
  margin-bottom: 20px;
  padding: 12px;
  background: var(--bg-card);
  border-radius: 10px;
}

.step-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 24px;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.2s;
  flex: 1;
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent-blue), #0A74E0);
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #0A74E0, #0956BF);
}

.btn-primary.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}

.btn-secondary:hover {
  background: var(--bg-secondary);
}

.btn-icon {
  width: 18px;
  height: 18px;
}

.channels-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.more-channels {
  margin-top: 4px;
}

.more-channels-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-secondary);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.more-channels-btn:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.more-channels-btn .expand-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.2s ease;
}

.more-channels-btn .expand-icon.expanded {
  transform: rotate(180deg);
}

.more-channels-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
}

.api-providers {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.provider-card {
  padding: 16px;
}

.provider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.provider-header h3 {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
}

.provider-badge {
  font-size: 11px;
  padding: 4px 8px;
  background: var(--accent-green);
  color: white;
  border-radius: 100px;
}

.provider-link {
  display: block;
  padding: 10px;
  background: var(--accent-blue);
  color: white;
  text-align: center;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
}

.provider-link:hover {
  background: #0A74E0;
}

.provider-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.provider-tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 14px 12px;
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-secondary);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.provider-tab:hover {
  border-color: var(--text-tertiary);
}

.provider-tab.active {
  border-color: var(--accent-blue);
  background: rgba(10, 132, 255, 0.05);
}

.provider-tab-name {
  font-weight: 500;
  color: var(--text-primary);
  vertical-align: middle;
}

.provider-logo-img {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: 6px;
  vertical-align: middle;
}

.provider-logo-svg {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: 6px;
  vertical-align: middle;
}

.provider-logo-svg :deep(svg) {
  width: 100%;
  height: 100%;
}

.provider-tab-badge {
  font-size: 10px;
  padding: 2px 6px;
  background: var(--accent-green);
  color: white;
  border-radius: 100px;
}

.provider-config {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
}

.provider-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
}

.provider-desc {
  font-size: 14px;
  color: var(--text-secondary);
}

.provider-console-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--accent-blue);
  text-decoration: none;
  font-size: 14px;
  margin-top: 8px;
}

.provider-console-link:hover {
  text-decoration: underline;
}

.provider-tip {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 8px 0;
  padding: 8px 12px;
  background: var(--bg-secondary);
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.tip-icon {
  font-size: 14px;
  line-height: 1;
}

.provider-console-link:hover {
  text-decoration: underline;
}

.api-input-section {
  margin-bottom: 20px;
}

.input-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.api-input {
  width: 100%;
  padding: 14px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 15px;
  outline: none;
}

.api-input:focus {
  border-color: var(--accent-blue);
}

.security-note {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-top: 8px;
}

.install-steps {
  padding: 20px;
  margin-bottom: 20px;
}

.install-step {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 8px 0;
  font-size: 14px;
  color: var(--text-secondary);
}

.install-step.clickable {
  cursor: pointer;
  padding: 8px 12px;
  margin: 0 -12px;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.install-step.clickable:hover {
  background: var(--bg-secondary);
}

.step-copied {
  color: var(--accent-green);
  font-weight: 500;
}

.step-2-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.step-2-text {
  color: var(--text-tertiary);
}

.step-num {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--accent-blue);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.step-num.success {
  background: var(--accent-green);
}

.already-installed-check {
  margin-bottom: 24px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 12px 16px;
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: all 0.2s;
}

.checkbox-label:hover {
  border-color: var(--accent-blue);
}

.checkbox-input {
  width: 18px;
  height: 18px;
  accent-color: var(--accent-blue);
  cursor: pointer;
}

.checkbox-text {
  font-size: 14px;
  color: var(--text-secondary);
}

.copy-btn {
  width: 100%;
}

.install-hint {
  text-align: center;
  font-size: 13px;
  color: var(--text-tertiary);
  margin-top: 16px;
}

.step-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.step-header .back-btn {
  margin: 0;
}

.next-btn {
  padding: 8px 16px;
  background: var(--accent-blue);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
}

.next-btn:hover:not(:disabled) {
  background: var(--accent-blue-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(10, 132, 255, 0.25);
}

.next-btn:disabled {
  background: var(--bg-disabled);
  cursor: not-allowed;
  color: var(--text-tertiary);
}

.command-preview {
  margin-bottom: 20px;
  overflow: hidden;
}

.command-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);
}

.expand-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  color: var(--text-primary);
}

.expand-btn:hover {
  background: var(--bg-secondary);
}

.expand-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

.command-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.copy-command-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.copy-command-btn:hover {
  background: var(--bg-secondary);
}

.copy-icon {
  width: 16px;
  height: 16px;
  color: var(--text-secondary);
}

.command-content {
  padding: 16px;
  margin: 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
  color: var(--text-secondary);
  background: var(--bg-primary);
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
  line-height: 1.5;
}

@media (max-width: 640px) {
  .scenarios-grid {
    grid-template-columns: 1fr;
  }
}
</style>
