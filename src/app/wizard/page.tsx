'use client'

import { useState, useEffect } from 'react'
import { Sparkles, ShoppingBag, Megaphone, User, Code, BookOpen, Copy, Check, ArrowRight, AlertCircle, HelpCircle, MessageCircle, Loader2, Send, MessageSquare, Zap, Globe } from 'lucide-react'
import { ChannelManager } from '@/lib/channel-manager'
import { ChannelConfig, channelOptions } from '@/lib/channel-types'
import { ChannelCard } from '@/components/ChannelCard'
import { useI18n } from '@/lib/i18n-context'
import { getMiniMaxRegion } from '@/lib/minimax-region'

const iconMap: Record<string, any> = {
  'shopping-bag': ShoppingBag,
  'megaphone': Megaphone,
  'user': User,
  'code': Code,
  'book-open': BookOpen,
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
    id: 'ecommerce',
    name: '电商运营',
    nameEn: 'E-commerce',
    description: '处理订单、客服咨询、商品上架',
    descriptionEn: 'Handle orders, customer service, product listings',
    icon: 'shopping-bag',
    scenario_skills: []
  },
  {
    id: 'social-media',
    name: '社交媒体运营',
    nameEn: 'Social Media',
    description: '内容创作、发帖，分析数据',
    descriptionEn: 'Content creation, posting, data analysis',
    icon: 'megaphone',
    scenario_skills: []
  },
  {
    id: 'personal-assistant',
    name: '个人助理',
    nameEn: 'Personal Assistant',
    description: '日程管理、提醒，信息整理',
    descriptionEn: 'Schedule management, reminders, info organization',
    icon: 'user',
    scenario_skills: []
  },
  {
    id: 'developer',
    name: '开发助手',
    nameEn: 'Developer',
    description: '代码编写、调试、Code Review',
    descriptionEn: 'Code writing, debugging, code review',
    icon: 'code',
    scenario_skills: []
  },
  {
    id: 'researcher',
    name: '研究助手',
    nameEn: 'Researcher',
    description: '文献检索、总结，分析',
    descriptionEn: 'Literature search, summarization, analysis',
    icon: 'book-open',
    scenario_skills: []
  }
]

export default function WizardPage() {
  const { t, isLanguageLoaded, language } = useI18n()
  const [step, setStep] = useState(1)
  const [scenarios, setScenarios] = useState<Scenario[]>([])
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null)
  const [apiKey, setApiKey] = useState('')
  const [copied, setCopied] = useState(false)
  const [os, setOs] = useState<'mac' | 'windows' | 'linux'>('mac')
  const [showHelp, setShowHelp] = useState(false)
  const [loading, setLoading] = useState(true)
  const [channels, setChannels] = useState<ChannelConfig[]>([])

  const miniMaxRegion = getMiniMaxRegion(language)

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

      const channelManager = new ChannelManager(channels)
      const configJson = channelManager.generateConfigWithChannels(apiKey, selectedScenario)

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
openclaw gateway --port 18789 &
sleep 5
open http://127.0.0.1:18789 2>/dev/null || echo "${scriptLabels.openBrowser} http://127.0.0.1:18789"

echo ""
echo "=========================================="
echo "  ${scriptLabels.installComplete}"
echo "  http://127.0.0.1:18789"
echo "=========================================="
read`
    }

  const copyCommand = () => {
    navigator.clipboard.writeText(getInstallScript())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading || !isLanguageLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <Loader2 className="w-8 h-8 animate-spin text-[#0A84FF]" />
      </div>
    )
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
            {t.discordSupport}
          </a>
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#e5e5e7] hover:bg-[#d2d2d7] rounded-full text-[#1d1d1f] transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            {t.faq}
          </button>
        </div>

        {showHelp && (
          <div className="mb-6 p-4 card-apple rounded-2xl text-sm text-[#6e6e73] space-y-3">
            <p><strong className="text-[#1d1d1f]">{t.faqNodeTitle}</strong><br/>
            {t.faqNodeAnswer}</p>
            
            <p><strong className="text-[#1d1d1f]">{t.faqBrewTitle}</strong><br/>
            {t.faqBrewAnswer}</p>
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
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <button onClick={() => setStep(1)} className="text-[#86868b] hover:text-[#1d1d1f] text-sm">
              {t.backToSelect}
            </button>
            <h2 className="text-lg font-semibold text-[#1d1d1f]">{t.inputMinimaxApiKey}</h2>
            
            <div className="bg-[#fff9e6] border border-[#ffd60a]/30 rounded-2xl p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-[#ff9f0a] flex-shrink-0 mt-0.5" />
                <div className="text-sm text-[#1d1d1f]">
                  <p className="font-medium mb-1">&quot;{t.codingPlanRecommended}&quot;</p>
                  <p className="text-[#86868b] text-xs">
                    {t.codingPlanDesc}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={t.apiKeyPlaceholder}
                className="w-full px-4 py-3 input-apple text-[#1d1d1f]"
              />
              <p className="text-xs text-[#86868b] mt-2">
                {t.apiKeyHint}<a href={miniMaxRegion.platformUrl} target="_blank" rel="noopener noreferrer" className="text-[#0A84FF] hover:underline">{language === 'zh' ? 'platform.minimaxi.com' : 'platform.minimax.io'}</a>
              </p>
            </div>
            <button
              onClick={() => setStep(3)}
              disabled={!apiKey}
              className="w-full flex items-center justify-center gap-2 py-3 btn-primary-apple rounded-xl font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {t.nextStep} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-4">
            <button onClick={() => setStep(2)} className="text-[#86868b] hover:text-[#1d1d1f] text-sm">
              {t.backToChannels}
            </button>
            <h2 className="text-lg font-semibold text-[#1d1d1f]">{t.configureChannels}</h2>
            <p className="text-[#86868b] text-sm mb-4">
              {t.channelDesc}
            </p>
            
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
              {channels.map((channel) => {
                const channelOption = channelOptions.find(opt => opt.id === channel.id)
                if (!channelOption) return null
                
                return (
                  <ChannelCard
                    key={channel.id}
                    channel={channel}
                    channelOption={channelOption}
                    onToggle={(id, enabled) => {
                      const updatedChannels = channels.map(c => 
                        c.id === id 
                          ? { ...c, enabled } 
                          : c
                      )
                      setChannels(updatedChannels)
                    }}
                    onConfigChange={(id, field, value) => {
                      const updatedChannels = channels.map(c => 
                        c.id === id
                          ? {
                              ...c,
                              config: {
                                ...c.config,
                                [field]: value
                              }
                            }
                          : c
                      )
                      setChannels(updatedChannels)
                    }}
                    showDetails={true}
                    onTestResult={(channelId, result) => {
                      console.log(`Channel ${channelId} test result:`, result)
                    }}
                  />
                )
              })}
            </div>
            
            <div className="pt-4">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                {t.channelTip}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 btn-apple rounded-xl transition-all"
                >
                  {t.skipThisStep}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 btn-primary-apple rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
                >
                  {t.nextStep} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <button onClick={() => setStep(3)} className="text-[#86868b] hover:text-[#1d1d1f] text-sm">
              {t.backToChannels}
            </button>
            <h2 className="text-lg font-semibold text-[#1d1d1f]">{t.startInstall}</h2>
            
            <div className="card-apple rounded-2xl p-4 space-y-3 shadow-sm">
              <div className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-[#0A84FF] text-white text-xs flex items-center justify-center">1</span>
                <span>{t.step1Copy}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-[#0A84FF] text-white text-xs flex items-center justify-center">2</span>
                <span>{t.step2Terminal}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-[#0A84FF] text-white text-xs flex items-center justify-center">3</span>
                <span>{t.step3Run}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-[#34C759] text-white text-xs flex items-center justify-center">✓</span>
                <span>{t.step4Wait}</span>
              </div>
            </div>

            <button
              onClick={copyCommand}
              disabled={!apiKey}
              className="w-full flex items-center justify-center gap-2 py-3 btn-primary-apple rounded-xl font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? t.copied : t.copyCommand}
            </button>

            <div className="text-center text-[#86868b] text-xs space-y-1">
              <p>{t.copyAndRun}</p>
              <p>{t.autoOpenBrowser} <span className="text-[#1d1d1f] font-medium">http://127.0.0.1:18789</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
