<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18nStore } from '@/stores/i18n'
import { ChannelManager } from '@/utils/channel-manager'
import { channelOptions, type ChannelConfig } from '@/utils/channel-types'
import { 
  Sparkles, ShoppingBag, Megaphone, User, Code, BookOpen, 
  Copy, Check, ArrowRight, AlertCircle, HelpCircle, MessageCircle,
  TrendingUp, Plane, Store, Factory, Home, Users, FactoryIcon
} from 'lucide-vue-next'
import ChannelCard from '@/components/wizard/ChannelCard.vue'

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
    recommended: true
  },
  {
    id: 'aliyun',
    name: '阿里云百炼',
    nameEn: 'Alibaba Cloud',
    description: '支持通义千问 Qwen3 系列模型',
    descriptionEn: 'Supports Qwen3 series models',
    consoleUrl: 'https://bailian.console.aliyun.com',
    apiKeyLabel: '阿里云百炼 API Key',
    apiKeyPlaceholder: 'sk-xxx...'
  },
  {
    id: 'iflow',
    name: '心流 (iFlow)',
    nameEn: 'iFlow',
    description: '支持 DeepSeek、Qwen3、GPT-4o、Claude 等多种模型',
    descriptionEn: 'Supports DeepSeek, Qwen3, GPT-4o, Claude and more',
    consoleUrl: 'https://platform.iflow.cn/profile?tab=apiKey',
    apiKeyLabel: '心流 API Key',
    apiKeyPlaceholder: 'iflow_xxx...'
  }
]

const selectedProvider = computed(() => {
  return providers.find(p => p.id === apiKeyProvider.value)
})

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
    skills: ['email', 'google-calendar', 'google-maps', 'file-system', 'notion'],
  },
  {
    id: 'developer',
    name: '多Agent开发团队',
    nameEn: 'Multi-Agent Development Team',
    description: '代码编写、测试、多Agent协作',
    descriptionEn: 'Code writing, testing, multi-agent collaboration',
    icon: 'code',
    skills: ['github', 'npm', 'docker', 'terminal', 'git', 'code-execution', 'agent-browser'],
  },
  {
    id: 'ecommerce',
    name: '电商/直播带货数字客服',
    nameEn: 'E-commerce/Live Streaming Digital Customer Service',
    description: '库存监控、价格调整、订单处理',
    descriptionEn: 'Inventory monitoring, price adjustment, order processing',
    icon: 'shopping-bag',
    skills: ['email', 'google-maps', 'google-search', 'browser', 'api-integration', 'screen-control'],
  },
  {
    id: 'content-creator',
    name: '内容创作社交媒体运营',
    nameEn: 'Content Creation Social Media Operation',
    description: '资讯收集、内容生成、账号管理',
    descriptionEn: 'Information gathering, content generation, account management',
    icon: 'megaphone',
    skills: ['rss-browser', 'social-api', 'content-generation', 'web-fetch', 'google-search'],
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
    skills: ['browser', 'intent-recognition', 'screen-control', 'email', 'google-calendar'],
  },
  {
    id: 'retail-customer-service',
    name: '餐饮零售智能客服',
    nameEn: 'Food & Retail Smart Customer Service',
    description: '订单处理、问题解决、客户服务',
    descriptionEn: 'Order processing, problem solving, customer service',
    icon: 'store',
    skills: ['api-integration', 'chatbot-flow', 'screen-control', 'browser', 'google-search'],
  },
  {
    id: 'manufacturing-qa',
    name: '制造业质检员工',
    nameEn: 'Manufacturing Quality Inspector',
    description: '数据录入、报表生成、质检辅助',
    descriptionEn: 'Data entry, report generation, quality inspection',
    icon: 'factory',
    skills: ['vision', 'screen-control', 'database', 'report-generation', 'file-system'],
  },
  {
    id: 'smart-home',
    name: '智能家居管家',
    nameEn: 'Smart Home Butler',
    description: '设备控制、环境调节、自动化场景',
    descriptionEn: 'Device control, environment adjustment, automation',
    icon: 'home',
    skills: ['iot-api', 'screen-control', 'google-calendar', 'web-fetch'],
  },
  {
    id: 'hr-admin',
    name: 'HR/行政文档处理员工',
    nameEn: 'HR/Admin Document Processing',
    description: '知识库管理、文档处理、流程自动化',
    descriptionEn: 'Knowledge base, document processing, workflow automation',
    icon: 'users',
    skills: ['knowledge-base', 'notion', 'browser', 'ocr', 'email', 'google-calendar'],
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

  const getIflowModels = () => {
    return [
      { id: "TBStars2-200B-A13B", name: "TBStars2-200B-A13B", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 1000000, maxTokens: 65536 },
      { id: "DeepSeek-V3-0324", name: "DeepSeek-V3-0324", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 1000000, maxTokens: 65536 },
      { id: "DeepSeek-R1-0528", name: "DeepSeek-R1-0528", reasoning: true, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 1000000, maxTokens: 65536 },
      { id: "Qwen3-235B-A22B", name: "Qwen3-235B-A22B", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 1000000, maxTokens: 65536 },
      { id: "Qwen3-32B", name: "Qwen3-32B", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 1000000, maxTokens: 65536 },
      { id: "DeepSeek-V3", name: "DeepSeek-V3", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 1000000, maxTokens: 65536 },
      { id: "DeepSeek-R1", name: "DeepSeek-R1", reasoning: true, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 1000000, maxTokens: 65536 },
      { id: "GPT-4o", name: "GPT-4o", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 1000000, maxTokens: 65536 },
      { id: "Claude-3.7-Sonnet", name: "Claude-3.7-Sonnet", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 1000000, maxTokens: 65536 },
      { id: "Gemini-2.5-Pro", name: "Gemini-2.5-Pro", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 1000000, maxTokens: 65536 },
    ]
  }

  const configObj = {
    meta: { 
      lastTouchedVersion: "2026.3.1", 
      lastTouchedAt: new Date().toISOString() 
    },
    wizard: {
      lastRunAt: new Date().toISOString(),
      lastRunVersion: "2026.3.1",
    },
    update: { channel: "stable" },
    auth: apiKeyProvider.value === 'minimax' 
      ? { profiles: { "minimax-cn:default": { provider: "minimax-cn", mode: "api_key" } } }
      : apiKeyProvider.value === 'aliyun'
      ? { profiles: { "bailian:default": { provider: "bailian", mode: "api_key" } } }
      : { profiles: { "iflow:default": { provider: "iflow", mode: "api_key" } } },
    models: {
      mode: "merge",
      providers: apiKeyProvider.value === 'minimax' 
        ? {
            minimax: {
              baseUrl: "https://api.minimax.io/anthropic",
              apiKey: apiKey.value,
              api: "anthropic-messages",
              models: [{ id: "MiniMax-M2.5", name: "MiniMax-M2.5", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 1000000, maxTokens: 65536 }]
            }
          }
        : apiKeyProvider.value === 'aliyun'
        ? {
            bailian: {
              baseUrl: "https://coding.dashscope.aliyuncs.com/v1",
              apiKey: apiKey.value,
              api: "openai-completions",
              models: [{ id: "qwen3-max-2026-01-23", name: "qwen3-max-thinking", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 1000000, maxTokens: 65536 }]
            }
          }
        : {
            iflow: {
              baseUrl: "https://apis.iflow.cn/v1",
              apiKey: apiKey.value,
              api: "openai",
              models: getIflowModels()
            }
          }
    },
    agents: { 
      defaults: { 
        model: apiKeyProvider.value === 'minimax' 
          ? { primary: "minimax/MiniMax-M2.5" } 
          : apiKeyProvider.value === 'aliyun'
          ? { primary: "qwen3-max" }
          : { primary: "iflow/TBStars2-200B-A13B" }
      } 
    },
    commands: { native: "auto", nativeSkills: "auto", restart: true, ownerDisplay: "raw" },
    hooks: { internal: { enabled: true, entries: { "boot-md": { enabled: true }, "bootstrap-extra-files": { enabled: true }, "command-logger": { enabled: true }, "session-memory": { enabled: true } } } },
    channels: Object.fromEntries(channelManager.value.getEnabledChannels().filter(c => c.id !== 'web').map(c => [c.id, { enabled: true, ...c.config }])),
    gateway: { port: 18789, mode: "local", bind: "loopback", auth: { mode: "token", token: "CHANGE_THIS_TOKEN" }, tailscale: { mode: "off", resetOnExit: false }, http: { endpoints: { chatCompletions: { enabled: true } } } },
    skills: { install: { nodeManager: "npm" } },
    plugins: { entries: { telegram: { enabled: true } } }
  }

  const configJson = JSON.stringify(configObj, null, 2)

  const isWindows = typeof window !== 'undefined' && navigator.platform.toLowerCase().includes('win')
  
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
  
  const installCommand = `curl -fsSL https://opendown.ai/cinstall.sh | bash -s && cp ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.bak && cat > ~/.openclaw/openclaw.json << 'EOF'
${configJson}
EOF`
  
  return installCommand
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
    setTimeout(() => copied.value = false, 2000)
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
        <a href="https://discord.gg/gjGb5WEz" target="_blank" class="action-btn">
          <MessageCircle class="icon" />
          {{ language === 'zh' ? 'Discord支持' : 'Discord Support' }}
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
        <button @click="step = 1" class="back-btn">{{ t.backToSelect }}</button>
        <h2 class="step-title">{{ t.step2Title }}</h2>
        
        <div class="channels-list">
          <ChannelCard
            v-for="option in channelOptions"
            :key="option.id"
            :channel="channelManager.getChannel(option.id) || { id: option.id, name: option.name, nameEn: option.nameEn, icon: option.icon, enabled: false, config: {} }"
            :channel-option="option"
            @toggle="handleChannelToggle"
            @update:config="handleChannelConfigChange"
          />
        </div>
        
        <div class="step-actions">
          <button @click="step = 3" class="btn btn-primary">
            {{ t.nextStep }} <ArrowRight class="btn-icon" />
          </button>
        </div>
      </div>

      <!-- Step 3: API Key -->
      <div v-if="step === 3" class="step-content">
        <button @click="step = 2" class="back-btn">{{ t.backToChannels }}</button>
        <h2 class="step-title">{{ t.step3Title }}</h2>
        
        <div class="provider-tabs">
          <button 
            v-for="provider in providers" 
            :key="provider.id"
            @click="selectProvider(provider.id)"
            class="provider-tab"
            :class="{ active: apiKeyProvider === provider.id }"
          >
            <span class="provider-tab-name">{{ language === 'zh' ? provider.name : provider.nameEn }}</span>
            <span v-if="provider.recommended" class="provider-tab-badge">Recommended</span>
          </button>
        </div>

        <div class="provider-config">
          <div class="provider-info">
            <p class="provider-desc">{{ language === 'zh' ? selectedProvider?.description : selectedProvider?.descriptionEn }}</p>
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
        <button @click="step = 3" class="back-btn">{{ t.backToChannels }}</button>
        <h2 class="step-title">{{ t.step4Title }}</h2>
        
        <div class="install-steps card-apple">
          <div class="install-step">
            <span class="step-num">1</span>
            <span>{{ t.step1Copy }}</span>
          </div>
          <div class="install-step">
            <span class="step-num">2</span>
            <span>{{ step2TerminalText }}</span>
          </div>
          <div class="install-step">
            <span class="step-num">3</span>
            <span>{{ t.step3Run }}</span>
          </div>
          <div class="install-step">
            <span class="step-num success">✓</span>
            <span>{{ t.step4Wait }}</span>
          </div>
        </div>

        <button @click="copyCommand" class="btn btn-primary copy-btn">
          <Check v-if="copied" class="btn-icon" />
          <Copy v-else class="btn-icon" />
          {{ copied ? t.copied : t.copyCommand }}
        </button>

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
  font-size: 14px;
  color: var(--accent-blue);
  font-weight: 500;
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
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  font-size: 14px;
  color: var(--text-secondary);
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

.copy-btn {
  width: 100%;
}

.install-hint {
  text-align: center;
  font-size: 13px;
  color: var(--text-tertiary);
  margin-top: 16px;
}

@media (max-width: 640px) {
  .scenarios-grid {
    grid-template-columns: 1fr;
  }
}
</style>
