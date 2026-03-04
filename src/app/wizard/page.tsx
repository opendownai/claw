'use client'

import { useState, useEffect } from 'react'
import { Sparkles, ShoppingBag, Megaphone, User, Code, BookOpen, Copy, Check, ArrowRight, AlertCircle, HelpCircle, MessageCircle, Loader2, Send, MessageSquare, Zap, Globe, TrendingUp, Plane, Store, Factory, Home, Users } from 'lucide-react'
import { ChannelManager } from '@/lib/channel-manager'
import { ChannelConfig, channelOptions } from '@/lib/channel-types'
import { ChannelCard } from '@/components/ChannelCard'
import { useI18n } from '@/lib/i18n-context'
import { getMiniMaxRegion } from '@/lib/minimax-region'
import { TestMessageButton } from '@/components/TestMessageButton'

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
}

function getOS(): 'mac' | 'windows' | 'linux' {
  if (typeof window === 'undefined') return 'mac'
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('win')) return 'windows'
  if (ua.includes('linux')) return 'linux'
  return 'mac'
}

interface Scenario {
  id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  icon: string
  scenario_skills?: { skill_name: string }[]
}

const localScenarios: Scenario[] = [
  {
    id: 'personal-assistant',
    name: '个人或企业数字助理',
    nameEn: 'Personal or Enterprise Digital Assistant',
    description: '日程管理、邮件处理、文件整理',
    descriptionEn: 'Schedule management, email handling, file organization',
    icon: 'user',
    scenario_skills: [
      { skill_name: 'email' },
      { skill_name: 'google-calendar' },
      { skill_name: 'google-maps' },
      { skill_name: 'file-system' },
      { skill_name: 'notion' }
    ]
  },
  {
    id: 'developer',
    name: '多Agent开发团队',
    nameEn: 'Multi-Agent Development Team',
    description: '代码编写、测试、多Agent协作',
    descriptionEn: 'Code writing, testing, multi-agent collaboration',
    icon: 'code',
    scenario_skills: [
      { skill_name: 'github' },
      { skill_name: 'npm' },
      { skill_name: 'docker' },
      { skill_name: 'terminal' },
      { skill_name: 'git' },
      { skill_name: 'code-execution' },
      { skill_name: 'agent-browser' }
    ]
  },
  {
    id: 'ecommerce',
    name: '电商/直播带货数字客服',
    nameEn: 'E-commerce/Live Streaming Digital Customer Service',
    description: '库存监控、价格调整、订单处理',
    descriptionEn: 'Inventory monitoring, price adjustment, order processing',
    icon: 'shopping-bag',
    scenario_skills: [
      { skill_name: 'email' },
      { skill_name: 'google-maps' },
      { skill_name: 'google-search' },
      { skill_name: 'browser' },
      { skill_name: 'api-integration' },
      { skill_name: 'screen-control' }
    ]
  },
  {
    id: 'trading-assistant',
    name: '金融交易助手',
    nameEn: 'Financial Trading Assistant',
    description: '交易执行、持仓分析、新闻监控',
    descriptionEn: 'Trading execution, position analysis, news monitoring',
    icon: 'trending-up',
    scenario_skills: [
      { skill_name: 'api-gateway' },
      { skill_name: 'notion' },
      { skill_name: 'browser' },
      { skill_name: 'data-analysis' },
      { skill_name: 'web-fetch' }
    ]
  },
  {
    id: 'flight-booking',
    name: '航空旅游数字员工',
    nameEn: 'Aviation/Travel Digital Employee',
    description: '订票改签、值机、客服处理',
    descriptionEn: 'Ticket booking, check-in, customer service',
    icon: 'plane',
    scenario_skills: [
      { skill_name: 'browser' },
      { skill_name: 'intent-recognition' },
      { skill_name: 'screen-control' },
      { skill_name: 'email' },
      { skill_name: 'google-calendar' }
    ]
  },
  {
    id: 'retail-customer-service',
    name: '餐饮零售智能客服',
    nameEn: 'Retail/Restaurant Intelligent Customer Service',
    description: '订单处理、问题解决、客户服务',
    descriptionEn: 'Order processing, problem solving, customer service',
    icon: 'store',
    scenario_skills: [
      { skill_name: 'api-integration' },
      { skill_name: 'chatbot-flow' },
      { skill_name: 'screen-control' },
      { skill_name: 'browser' },
      { skill_name: 'google-search' }
    ]
  },
  {
    id: 'content-creator',
    name: '内容创作社交媒体运营',
    nameEn: 'Content Creation Social Media Operation',
    description: '资讯收集、内容生成、账号管理',
    descriptionEn: 'Information gathering, content generation, account management',
    icon: 'megaphone',
    scenario_skills: [
      { skill_name: 'rss-browser' },
      { skill_name: 'social-api' },
      { skill_name: 'content-generation' },
      { skill_name: 'web-fetch' },
      { skill_name: 'google-search' }
    ]
  },
  {
    id: 'manufacturing-qa',
    name: '制造业质检员工',
    nameEn: 'Manufacturing Quality Assurance Employee',
    description: '数据录入、报表生成、质检辅助',
    descriptionEn: 'Data entry, report generation, quality inspection assistance',
    icon: 'factory',
    scenario_skills: [
      { skill_name: 'vision' },
      { skill_name: 'screen-control' },
      { skill_name: 'database' },
      { skill_name: 'report-generation' },
      { skill_name: 'file-system' }
    ]
  },
  {
    id: 'smart-home',
    name: '智能家居管家',
    nameEn: 'Smart Home Manager',
    description: '设备控制、环境调节、自动化场景',
    descriptionEn: 'Device control, environment adjustment, automation scenes',
    icon: 'home',
    scenario_skills: [
      { skill_name: 'iot-api' },
      { skill_name: 'screen-control' },
      { skill_name: 'google-calendar' },
      { skill_name: 'web-fetch' }
    ]
  },
  {
    id: 'hr-admin',
    name: 'HR/行政文档处理员工',
    nameEn: 'HR/Admin Document Processing Employee',
    description: '知识库管理、文档处理、流程自动化',
    descriptionEn: 'Knowledge base management, document processing, process automation',
    icon: 'users',
    scenario_skills: [
      { skill_name: 'knowledge-base' },
      { skill_name: 'notion' },
      { skill_name: 'browser' },
      { skill_name: 'ocr' },
      { skill_name: 'email' },
      { skill_name: 'google-calendar' }
    ]
  }
]

export default function WizardPage() {
  const { t, isLanguageLoaded, language } = useI18n()
  const [step, setStep] = useState(1)
  const [scenarios, setScenarios] = useState<Scenario[]>([])
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null)
  const [apiKey, setApiKey] = useState('')
  const [apiKeyProvider, setApiKeyProvider] = useState<'minimax' | 'aliyun'>('minimax')
  const [copied, setCopied] = useState(false)
  const [os, setOs] = useState<'mac' | 'windows' | 'linux'>('mac')
  const [showHelp, setShowHelp] = useState(false)
  const [loading, setLoading] = useState(true)
  const [channels, setChannels] = useState<ChannelConfig[]>([])
  const channelManager = new ChannelManager(channels)

  const miniMaxRegion = getMiniMaxRegion(language)

  // 根据API提供商生成配置
  const generateConfigWithChannelsAndProvider = (apiKey: string, selectedScenario?: any, provider: 'minimax' | 'aliyun' = 'minimax'): string => {
    const enabledChannels = channelManager.getEnabledChannels()
    const channelsConfig: Record<string, any> = {}

    // 只为非web渠道生成配置
    enabledChannels.forEach(channel => {
      if (channel.id !== 'web') {
        channelsConfig[channel.id] = {
          enabled: true,
          ...channel.config
        }
      }
    })

    // 根据API提供商构建模型配置
    let modelsConfig: any = {
      mode: "merge",
      providers: {}
    }

    if (provider === 'minimax') {
      modelsConfig.providers = {
        minimax: {
          baseUrl: "https://api.minimax.io/anthropic",
          apiKey: apiKey,
          api: "anthropic-messages",
          models: [
            { 
              id: "MiniMax-M2.5", 
              name: "MiniMax-M2.5", 
              reasoning: false, 
              input: ["text"], 
              cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, 
              contextWindow: 1000000, 
              maxTokens: 65536 
            }
          ]
        }
      }
    } else if (provider === 'aliyun') {
      // 阿里云百炼Coding Plan配置
      modelsConfig.providers = {
        bailian: {
          baseUrl: "https://coding.dashscope.aliyuncs.com/v1",
          apiKey: apiKey,
          api: "openai-completions",
          models: [
            { 
              id: "qwen3-max-2026-01-23", 
              name: "qwen3-max-thinking", 
              reasoning: false, 
              input: ["text"], 
              cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, 
              contextWindow: 1000000, 
              maxTokens: 65536 
            },
            { 
              id: "qwen3-coder-plus", 
              name: "qwen3-coder-plus", 
              reasoning: false, 
              input: ["text"], 
              cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, 
              contextWindow: 1000000, 
              maxTokens: 65536 
            }
          ]
        }
      }
    }

    // 构建最终配置对象
    const configObj = {
      meta: { 
        lastTouchedVersion: "2026.3.1", 
        lastTouchedAt: new Date().toISOString() 
      },
      wizard: {
        lastRunAt: new Date().toISOString(),
        lastRunVersion: "2026.3.1",
        lastRunCommand: "doctor",
        lastRunMode: "local"
      },
      update: { channel: "stable" },
      auth: provider === 'minimax' 
        ? { 
            profiles: { 
              "minimax-cn:default": { 
                provider: "minimax-cn", 
                mode: "api_key" 
              } 
            } 
          }
        : { 
            profiles: { 
              "bailian:default": { 
                provider: "bailian", 
                mode: "api_key" 
              } 
            } 
          },
      models: modelsConfig,
      agents: { 
        defaults: { 
          model: provider === 'minimax' 
            ? { primary: "minimax/MiniMax-M2.5" } 
            : { primary: "qwen3-max" }, 
          models: provider === 'minimax'
            ? { 
                "minimax/MiniMax-M2.5": { alias: "MiniMax" } 
              }
            : {
                "bailian/qwen3-max-2026-01-23": { alias: "qwen3-max" }
              }
        } 
      },
      commands: {
        native: "auto",
        nativeSkills: "auto",
        restart: true,
        ownerDisplay: "raw"
      },
      hooks: {
        internal: {
          enabled: true,
          entries: {
            "boot-md": {
              enabled: true
            },
            "bootstrap-extra-files": {
              enabled: true
            },
            "command-logger": {
              enabled: true
            },
            "session-memory": {
              enabled: true
            }
          }
        }
      },
      channels: channelsConfig,
      gateway: { 
        port: 18789, 
        mode: "local", 
        bind: "loopback", 
        auth: { 
          mode: "token", 
          token: "CHANGE_THIS_TOKEN" 
        }, 
        tailscale: { 
          mode: "off", 
          resetOnExit: false 
        },
        http: {
          endpoints: {
            chatCompletions: {
              enabled: true
            }
          }
        }
      },
      skills: { 
        install: { 
          nodeManager: "npm" 
        } 
      },
      plugins: {
        entries: {
          telegram: {
            enabled: true
          }
        }
      }
    }

    return JSON.stringify(configObj, null, 2)
  }

  useEffect(() => {
    setOs(getOS())
    const localizedScenarios = localScenarios.map(s => ({
      ...s,
      name: language === 'zh' ? s.name : s.nameEn,
      description: language === 'zh' ? s.description : s.descriptionEn
    }))
    setScenarios(localizedScenarios)
    const initialChannels: ChannelConfig[] = channelOptions.map(option => ({
      id: option.id,
      name: option.name,
      nameEn: option.nameEn,
      icon: option.icon,
      enabled: option.id === 'web',
      config: option.id === 'web' ? {} : {}
    }))
    setChannels(initialChannels)
    setLoading(false)
  }, [language])

  const getInstallScript = () => {
      if (!selectedScenario || !apiKey) return ''

      const skills = selectedScenario.scenario_skills?.map(s => s.skill_name) || []

      // 根据API提供商生成不同的配置
      const configJson = generateConfigWithChannelsAndProvider(apiKey, selectedScenario, apiKeyProvider)

      const skillsLines = skills.map(skill => `npx openclaw skills install ${skill}`).join('\n')

      const scriptLabels = language === 'zh' 
        ? {
            step1: '第1步', step2: '第2步', step3: '第3步', step4: '第4步', step5: '第5步',
            checkEnv: '检查环境', installOpenClaw: '安装 OpenClaw', installSkills: '安装 Skills',
            start: '启动服务', createConfig: '创建配置',
            nodeNotFound: '未检测到 Node.js', installNode: '正在通过 Homebrew 安装...',
            errorBrew: '错误: 请先安装 Homebrew', brewInstall: '访问 https://brew.sh 按照说明安装',
            nodeVersion: 'Node.js 版本:', installComplete: '安装完成！请在浏览器中打开',
            openBrowser: '请手动打开'
          }
        : {
            step1: 'Step 1', step2: 'Step 2', step3: 'Step 3', step4: 'Step 4', step5: 'Step 5',
            checkEnv: 'Check environment', installOpenClaw: 'Install OpenClaw', installSkills: 'Install Skills',
            start: 'Start service', createConfig: 'Create config',
            nodeNotFound: 'Node.js not detected', installNode: 'Installing via Homebrew...',
            errorBrew: 'Error: Please install Homebrew first', brewInstall: 'Visit https://brew.sh for installation instructions',
            nodeVersion: 'Node.js version:', installComplete: 'Installation complete! Please open in browser',
            openBrowser: 'Please open manually'
          }

      if (os === 'windows') {
        return `mkdir -Force %USERPROFILE%\\.openclaw
echo ${configJson.replace(/\r?\n/g, ' ').replace(/"/g, '\\"')}> %USERPROFILE%\\.openclaw\\openclaw.json

echo ${scriptLabels.checkEnv}...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (echo Please install Node.js first: https://nodejs.org)

echo ${scriptLabels.installOpenClaw}...
npm install -g openclaw@latest

echo ${scriptLabels.step4} ${scriptLabels.installSkills}...
${skillsLines}

echo ${scriptLabels.step5} ${scriptLabels.start}...
start cmd /k "openclaw gateway --port 18789"
start http://127.0.0.1:18789
echo ${scriptLabels.installComplete} http://127.0.0.1:18789
pause`
      }

      return `#!/bin/bash
echo "====== ${scriptLabels.step1}: ${scriptLabels.createConfig} ======"
mkdir -p ~/.openclaw

cat > ~/.openclaw/openclaw.json << 'EOFCONFIG'
${configJson}
EOFCONFIG

echo ""
echo "====== ${scriptLabels.step2}: ${scriptLabels.checkEnv} ======"
if ! command -v node &> /dev/null; then
    echo "${scriptLabels.nodeNotFound}"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        if command -v brew &> /dev/null; then
            echo "${scriptLabels.installNode}"
            brew install node
        else
            echo "${scriptLabels.errorBrew}"
            echo "${scriptLabels.brewInstall}"
            exit 1
        fi
    fi
fi
echo "${scriptLabels.nodeVersion} $(node -v)"

echo ""
echo "====== ${scriptLabels.step3}: ${scriptLabels.installOpenClaw} ======"
npm install -g openclaw@latest

echo ""
echo "====== ${scriptLabels.step4}: ${scriptLabels.installSkills} ======"
${skillsLines}

echo ""
echo "====== ${scriptLabels.step5}: ${scriptLabels.start} ======"
echo "${scriptLabels.start}..."
openclaw gateway --port 18789 > ~/.openclaw/gateway.log 2>&1 &
echo "OpenClaw gateway started"
echo "Server running at: http://127.0.0.1:18789"
echo ""
echo "${scriptLabels.installComplete}"
echo "${scriptLabels.openBrowser}"
open http://127.0.0.1:18789
`
  }

  const copyCommand = () => {
    const script = getInstallScript()
    if (script) {
      navigator.clipboard.writeText(script).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  const getEnabledChannels = () => {
    return channelManager.getEnabledChannels()
  }

  if (!isLanguageLoaded) {
    return null
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-[#f5f5f7] text-[#1d1d1f]">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold mb-1 text-[#1d1d1f]">{t.deployDownclaw}</h1>
          <p className="text-[#86868b] text-sm">{t.deploySubtitle}</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= s ? 'bg-[#0A84FF] text-white' : 'bg-[#e5e5e7] text-[#86868b]'
              }`}>
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 4 && <div className={`w-0.5 h-1 ${step > s ? 'bg-[#0A84FF]' : 'bg-[#e5e5e7]'}`} />}
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3 mb-6">
          <a
            href="https://discord.gg/gjGb5WEz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#e5e5e7] hover:bg-[#d2d2d7] rounded-full text-[#1d1d1f] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            {language === 'zh' ? 'Discord支持' : 'Discord Support'}
          </a>
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#e5e5e7] hover:bg-[#d2d2d7] rounded-full text-[#1d1d1f] transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            {language === 'zh' ? '帮助' : 'Help'}
          </button>
        </div>

        {showHelp && (
          <div className="mb-6 p-4 bg-white rounded-2xl border border-[#d2d2d7] text-xs text-[#6e6e73]">
            <p className="mb-2"><strong>{t.faqNodeTitle}</strong></p>
            <p className="mb-2">{t.faqNodeAnswer}</p>
            <p className="mb-2"><strong>{t.faqBrewTitle}</strong></p>
            <p className="mb-2">{t.faqBrewAnswer}</p>
            <code className="block bg-[#e5e5e7] px-3 py-2 rounded-lg text-xs text-[#1d1d1f] break-all font-mono">
              /bin/bash -c &quot;$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)&quot;
            </code>
            
            <p><strong className="text-[#1d1d1f]">{t.faqInstallFailedTitle}</strong><br/>
            {t.faqInstallFailedAnswer}</p>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[#1d1d1f]">{t.selectPurpose}</h2>
            <div className="grid grid-cols-2 gap-3">
              {scenarios.map((scenario) => {
                const Icon = iconMap[scenario.icon] || Sparkles
                return (
                  <button
                    key={scenario.id}
                    onClick={() => { setSelectedScenario(scenario); setStep(2); }}
                    className="p-4 card-apple border border-[#d2d2d7] rounded-2xl hover:border-[#0A84FF] hover:bg-[#f5f5f7] transition-all text-left cursor-pointer"
                  >
                    <Icon className="w-5 h-5 text-[#0A84FF] mb-2" />
                    <div className="font-medium text-sm text-[#1d1d1f]">{scenario.name}</div>
                    <div className="text-xs text-[#6e6e73]">{scenario.description}</div>
                  </button>
                )
              })}
            </div>
            <div className="pt-4">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                {t.channelTip}
              </div>
              
              {/* 测试消息发送功能 */}
              {channelManager.getEnabledChannels().length > 0 && (
                <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    {language === 'zh' ? '测试消息发送' : 'Test Message Sending'}
                  </h3>
                  <div className="space-y-2">
                    {channelManager.getEnabledChannels().map((channel: ChannelConfig) => (
                      <div key={channel.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            channel.id === 'dingtalk' ? 'bg-[#1890FF]' :
                            channel.id === 'feishu' ? 'bg-[#4285f4]' :
                            channel.id === 'telegram' ? 'bg-[#0088cc]' :
                            'bg-gray-400'
                          }`}>
                            {channel.id === 'dingtalk' ? '钉' :
                             channel.id === 'feishu' ? '飞' :
                             channel.id === 'telegram' ? 'TG' :
                             '🌐'}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 dark:text-gray-200">
                              {language === 'zh' ? channel.id === 'dingtalk' ? '钉钉' :
                               channel.id === 'feishu' ? '飞书' :
                               channel.id === 'telegram' ? 'Telegram' : 'Web界面' :
                               channel.id === 'dingtalk' ? 'DingTalk' :
                               channel.id === 'feishu' ? 'Feishu' :
                               channel.id === 'telegram' ? 'Telegram' : 'Web'}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {channel.enabled ? 
                                (language === 'zh' ? '已启用' : 'Enabled') :
                                (language === 'zh' ? '未启用' : 'Disabled')}
                            </div>
                          </div>
                        </div>
                        <TestMessageButton channel={channel} disabled={!channel.enabled} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 btn-apple rounded-xl transition-all"
                >
                  {language === 'zh' ? '跳过此步骤' : 'Skip This Step'}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 btn-primary-apple rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
                >
                  {language === 'zh' ? '下一步' : 'Next Step'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <button onClick={() => setStep(1)} className="text-[#86868b] hover:text-[#1d1d1f] text-sm">
              {language === 'zh' ? '返回' : 'Back'}
            </button>
            <h2 className="text-lg font-semibold text-[#1d1d1f]">{language === 'zh' ? '选择渠道' : 'Select Channels'}</h2>
            <div className="space-y-3">
              {channelOptions.map((option) => (
                <ChannelCard
                  key={option.id}
                  channel={channelManager.getChannel(option.id) || { 
                    id: option.id, 
                    name: option.name, 
                    nameEn: option.nameEn, 
                    icon: option.icon, 
                    enabled: false, 
                    config: {} 
                  }}
                  channelOption={option}
                  onToggle={(id, enabled) => {
                    channelManager.toggleChannel(id, enabled)
                    setChannels(channelManager.getAllChannels())
                  }}
                  onConfigChange={(id, field, value) => {
                    const currentChannel = channelManager.getChannel(id)
                    if (currentChannel) {
                      const newConfig = { ...currentChannel.config, [field]: value }
                      channelManager.updateChannel(id, { config: newConfig })
                      setChannels(channelManager.getAllChannels())
                    }
                  }}
                />
              ))}
            </div>
            <div className="pt-4">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                {language === 'zh' ? '选择一个或多个渠道，以便您的AI助手可以在这些平台上接收和发送消息' : 'Select one or more channels for your AI assistant to receive and send messages'}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 btn-primary-apple rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
                >
                  {language === 'zh' ? '下一步' : 'Next Step'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <button onClick={() => setStep(2)} className="text-[#86868b] hover:text-[#1d1d1f] text-sm">
              {language === 'zh' ? '返回' : 'Back'}
            </button>
             <h2 className="text-lg font-semibold text-[#1d1d1f]">{language === 'zh' ? '配置API密钥' : 'Configure API Key'}</h2>
             
            <div className="card-apple rounded-2xl p-4 space-y-3 shadow-sm mb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-sm">MiniMax</h3>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-xs text-gray-500">{language === 'zh' ? '推荐' : 'Recommended'}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-xs">
                <span className="w-5 h-5 rounded-full bg-[#0A84FF] text-white text-xs flex items-center justify-center">1</span>
                <span>{language === 'zh' ? '访问MiniMax控制台，创建API密钥' : 'Access MiniMax console, create API key'}</span>
              </div>
              <a
                href={miniMaxRegion.platformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#0A84FF] text-white px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-[#0A74E0] transition-colors"
              >
                {language === 'zh' ? '跳转到MiniMax控制台' : 'Go to MiniMax Console'}
              </a>
            </div>
            
            <div className="card-apple rounded-2xl p-4 space-y-3 shadow-sm mb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-sm">阿里云百炼</h3>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-xs text-gray-500">{language === 'zh' ? '可选' : 'Optional'}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-xs">
                <span className="w-5 h-5 rounded-full bg-[#0A84FF] text-white text-xs flex items-center justify-center">1</span>
                <span>{language === 'zh' ? '访问阿里云百炼，获取Coding Plan API密钥' : 'Access Alibaba Cloud Bailian, get Coding Plan API key'}</span>
              </div>
              <a
                href="https://bailian.console.aliyun.com/cn-beijing/?tab=coding-plan#/efm/detail"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#409eff] text-white px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-[#337ecc] transition-colors"
              >
                {language === 'zh' ? '跳转到阿里云百炼' : 'Go to Alibaba Cloud Bailian'}
              </a>
            </div>

            <div className="card-apple rounded-2xl p-4 space-y-3 shadow-sm">
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setApiKeyProvider('minimax')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    apiKeyProvider === 'minimax' 
                      ? 'bg-[#0A84FF] text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  MiniMax
                </button>
                <button
                  onClick={() => setApiKeyProvider('aliyun')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    apiKeyProvider === 'aliyun' 
                      ? 'bg-[#0A84FF] text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  阿里云
                </button>
              </div>
              
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                {apiKeyProvider === 'minimax'
                  ? (language === 'zh' ? '输入您的MiniMax API密钥' : 'Enter your MiniMax API key')
                  : (language === 'zh' ? '输入您的阿里云百炼API密钥' : 'Enter your Alibaba Cloud Bailian API key')}
              </div>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={apiKeyProvider === 'minimax' 
                  ? (language === 'zh' ? 'sk-xxx...' : 'sk-xxx...') 
                  : (language === 'zh' ? '阿里云API密钥...' : 'Alibaba Cloud API Key...')}
                className="w-full px-4 py-3 bg-white border border-[#d2d2d7] rounded-xl focus:outline-none focus:border-[#0A84FF] text-sm"
              />
              <button
                onClick={() => setStep(4)}
                disabled={!apiKey}
                className="w-full flex items-center justify-center gap-2 py-3 btn-primary-apple rounded-xl font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {language === 'zh' ? '下一步' : 'Next Step'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <button onClick={() => setStep(3)} className="text-[#86868b] hover:text-[#1d1d1f] text-sm">
              {language === 'zh' ? '返回' : 'Back'}
            </button>
            <h2 className="text-lg font-semibold text-[#1d1d1f]">{language === 'zh' ? '开始安装' : 'Start Install'}</h2>
            
            <div className="card-apple rounded-2xl p-4 space-y-3 shadow-sm">
              <div className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-[#0A84FF] text-white text-xs flex items-center justify-center">1</span>
                <span>{language === 'zh' ? '复制命令' : 'Copy Command'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-[#0A84FF] text-white text-xs flex items-center justify-center">2</span>
                <span>{language === 'zh' ? '在终端中运行' : 'Run in Terminal'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-[#0A84FF] text-white text-xs flex items-center justify-center">3</span>
                <span>{language === 'zh' ? '等待安装完成' : 'Wait for Installation'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-[#34C759] text-white text-xs flex items-center justify-center">✓</span>
                <span>{language === 'zh' ? '自动打开浏览器' : 'Auto Open Browser'}</span>
              </div>
            </div>

            <button
              onClick={copyCommand}
              disabled={!apiKey}
              className="w-full flex items-center justify-center gap-2 py-3 btn-primary-apple rounded-xl font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? (language === 'zh' ? '已复制' : 'Copied') : (language === 'zh' ? '复制命令' : 'Copy Command')}
            </button>

            <div className="text-center text-[#86868b] text-xs space-y-1">
              <p>{language === 'zh' ? '复制上述命令并粘贴到您的终端中运行' : 'Copy the command above and paste it into your terminal to run'}</p>
              <p>{language === 'zh' ? '安装完成后，浏览器将自动打开' : 'After installation, the browser will open automatically'} <span className="text-[#1d1d1f] font-medium">http://127.0.0.1:18789</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}