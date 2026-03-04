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

const step = ref(1)
const selectedScenario = ref<Scenario | null>(null)
const apiKey = ref('')
const apiKeyProvider = ref<'minimax' | 'aliyun'>('minimax')
const copied = ref(false)
const showHelp = ref(false)
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
      : { profiles: { "bailian:default": { provider: "bailian", mode: "api_key" } } },
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
        : {
            bailian: {
              baseUrl: "https://coding.dashscope.aliyuncs.com/v1",
              apiKey: apiKey.value,
              api: "openai-completions",
              models: [{ id: "qwen3-max-2026-01-23", name: "qwen3-max-thinking", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 1000000, maxTokens: 65536 }]
            }
          }
    },
    agents: { 
      defaults: { 
        model: apiKeyProvider.value === 'minimax' 
          ? { primary: "minimax/MiniMax-M2.5" } 
          : { primary: "qwen3-max" }
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
  const skillsList = scenario?.skills?.join(', ') || ''

  return `#!/bin/bash
echo "====== Step 1: Create Config ======"
mkdir -p ~/.openclaw
cat > ~/.openclaw/openclaw.json << 'EOFCONFIG'
${configJson}
EOFCONFIG

echo ""
echo "====== Step 2: Check Environment ======"
if ! command -v node &> /dev/null; then
    echo "Node.js not detected. Please install Node.js first."
    exit 1
fi
echo "Node.js version: $(node -v)"

echo ""
echo "====== Step 3: Install OpenClaw ======"
npm install -g openclaw@latest

echo ""
echo "====== Step 4: Install Skills ======"
echo "Installing skills for: ${scenario?.name || selectedScenario.value?.name || 'default'}"
${skillsList ? `openclaw skills install ${skillsList}` : 'echo "No skills to install"'}

echo ""
echo "====== Step 5: Start Service ======"
openclaw gateway --port 18789 > ~/.openclaw/gateway.log 2>&1 &
echo "OpenClaw gateway started"
echo "Server running at: http://127.0.0.1:18789"
echo ""
echo "Installation complete! Please open in browser"
open http://127.0.0.1:18789
`
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
        <h1 class="wizard-title">{{ t.deployDownclaw }}</h1>
        <p class="wizard-subtitle">{{ t.homeDescription }}</p>
      </div>

      <div class="steps-indicator">
        <div v-for="s in 4" :key="s" class="step-item">
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
        
        <div class="step-actions">
          <button @click="step = 4" class="btn btn-secondary">
            {{ t.skipThisStep }}
          </button>
          <button @click="step = 2" class="btn btn-primary">
            {{ t.nextStep }} <ArrowRight class="btn-icon" />
          </button>
        </div>
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
        <button @click="step = 2" class="back-btn">{{ t.backToSelect }}</button>
        <h2 class="step-title">{{ t.step3Title }}</h2>
        
        <div class="api-providers">
          <div class="provider-card card-apple">
            <div class="provider-header">
              <h3>{{ t.apiProviderMiniMax }}</h3>
              <span class="provider-badge">Recommended</span>
            </div>
            <a 
              href="https://platform.minimaxi.com" 
              target="_blank" 
              class="provider-link"
            >
              {{ language === 'zh' ? '跳转到MiniMax控制台' : 'Go to MiniMax Console' }}
            </a>
          </div>
          
          <div class="provider-card card-apple">
            <div class="provider-header">
              <h3>{{ t.apiProviderAliyun }}</h3>
            </div>
            <a 
              href="https://bailian.console.aliyun.com" 
              target="_blank" 
              class="provider-link"
            >
              {{ language === 'zh' ? '跳转到阿里云百炼' : 'Go to Alibaba Cloud Bailian' }}
            </a>
          </div>
        </div>

        <div class="provider-selector">
          <button 
            @click="apiKeyProvider = 'minimax'"
            class="selector-btn"
            :class="{ active: apiKeyProvider === 'minimax' }"
          >
            {{ t.apiProviderMiniMax }}
          </button>
          <button 
            @click="apiKeyProvider = 'aliyun'"
            class="selector-btn"
            :class="{ active: apiKeyProvider === 'aliyun' }"
          >
            {{ t.apiProviderAliyun }}
          </button>
        </div>

        <div class="api-input-section">
          <label class="input-label">
            {{ apiKeyProvider === 'minimax' ? t.inputMinimaxApiKey : t.apiProviderAliyun }}
          </label>
          <input
            v-model="apiKey"
            type="password"
            class="api-input"
            :placeholder="t.apiKeyPlaceholder"
          />
          <p class="security-note">{{ t.securityNote }}</p>
        </div>
        
        <div class="step-actions">
          <button @click="step = 4" :disabled="!apiKey" class="btn btn-primary" :class="{ disabled: !apiKey }">
            {{ t.nextStep }} <ArrowRight class="btn-icon" />
          </button>
        </div>
      </div>

      <!-- Step 4: Install -->
      <div v-if="step === 4" class="step-content">
        <button @click="step = 3" class="back-btn">{{ t.backToSelect }}</button>
        <h2 class="step-title">{{ t.step4Title }}</h2>
        
        <div class="install-steps card-apple">
          <div class="install-step">
            <span class="step-num">1</span>
            <span>{{ t.step1Copy }}</span>
          </div>
          <div class="install-step">
            <span class="step-num">2</span>
            <span>{{ t.step2Terminal }}</span>
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
          {{ language === 'zh' ? '复制上述命令并粘贴到您的终端中运行' : 'Copy the command above and paste it into your terminal to run' }}
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
}

.step-circle.active {
  background: var(--accent-blue);
  color: white;
}

.step-circle.completed {
  background: var(--accent-green);
  color: white;
}

.step-icon {
  width: 18px;
  height: 18px;
}

.step-line {
  width: 40px;
  height: 3px;
  background: var(--border-color);
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

.provider-selector {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.selector-btn {
  flex: 1;
  padding: 12px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  color: var(--text-secondary);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.selector-btn.active {
  background: var(--accent-blue);
  border-color: var(--accent-blue);
  color: white;
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
