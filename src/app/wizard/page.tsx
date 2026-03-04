'use client'

import { useState, useEffect } from 'react'
import { Sparkles, ShoppingBag, Megaphone, User, Code, BookOpen, Copy, Check, ArrowRight, AlertCircle, HelpCircle, MessageCircle, Loader2, Send, MessageSquare, Zap, Globe } from 'lucide-react'
import { ChannelManager } from '@/lib/channel-manager'
import { ChannelConfig, channelOptions } from '@/lib/channel-types'
import { ChannelCard } from '@/components/ChannelCard'

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
  description: string
  icon: string
  scenario_skills?: { skill_name: string }[]
}

// 本地场景数据
const localScenarios: Scenario[] = [
  {
    id: 'ecommerce',
    name: '电商运营',
    description: '处理订单、客服咨询、商品上架',
    icon: 'shopping-bag',
    scenario_skills: []
  },
  {
    id: 'social-media',
    name: '社交媒体运营',
    description: '内容创作、发帖，分析数据',
    icon: 'megaphone',
    scenario_skills: []
  },
  {
    id: 'personal-assistant',
    name: '个人助理',
    description: '日程管理、提醒，信息整理',
    icon: 'user',
    scenario_skills: []
  },
  {
    id: 'developer',
    name: '开发助手',
    description: '代码编写、调试、Code Review',
    icon: 'code',
    scenario_skills: []
  },
  {
    id: 'researcher',
    name: '研究助手',
    description: '文献检索、总结，分析',
    icon: 'book-open',
    scenario_skills: []
  }
]

export default function WizardPage() {
  const [step, setStep] = useState(1)
  const [scenarios, setScenarios] = useState<Scenario[]>([])
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null)
  const [apiKey, setApiKey] = useState('')
  const [copied, setCopied] = useState(false)
  const [os, setOs] = useState<'mac' | 'windows' | 'linux'>('mac')
  const [showHelp, setShowHelp] = useState(false)
  const [loading, setLoading] = useState(true)
  const [channels, setChannels] = useState<ChannelConfig[]>([])

  useEffect(() => {
    setOs(getOS())
    setScenarios(localScenarios)
    const initialChannels: ChannelConfig[] = channelOptions.map(option => ({
      id: option.id,
      name: option.name,
      icon: option.icon,
      enabled: option.id === 'web',
      config: option.id === 'web' ? {} : {}
    }))
    setChannels(initialChannels)
    setLoading(false)
  }, [])

  const getInstallScript = () => {
      if (!selectedScenario || !apiKey) return ''

      const skills = selectedScenario.scenario_skills?.map(s => s.skill_name) || []

      // 使用ChannelManager生成配置
      const channelManager = new ChannelManager(channels)
      const configJson = channelManager.generateConfigWithChannels(apiKey, selectedScenario)

      const skillsLines = skills.map(skill => `npx openclaw skills install ${skill}`).join('\n')

      if (os === 'windows') {
        return `mkdir -Force %USERPROFILE%\\.openclaw
echo ${configJson.replace(/\r?\n/g, ' ').replace(/"/g, '\\"')}> %USERPROFILE%\\.openclaw\\openclaw.json

echo 检查 Node.js...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (echo 请先安装 Node.js: https://nodejs.org)

echo 安装 OpenClaw...
npm install -g openclaw@latest

echo 安装 Skills...
${skillsLines}

echo 启动服务...
start cmd /k "openclaw gateway --port 18789"
start http://127.0.0.1:18789
echo 完成！打开 http://127.0.0.1:18789
pause`
      }

      return `#!/bin/bash
echo "====== 第1步: 创建配置 ======"
mkdir -p ~/.openclaw

cat > ~/.openclaw/openclaw.json << 'EOFCONFIG'
${configJson}
EOFCONFIG

echo ""
echo "====== 第2步: 检查环境 ======"
if ! command -v node &> /dev/null; then
    echo "未检测到 Node.js"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        if command -v brew &> /dev/null; then
            echo "正在通过 Homebrew 安装..."
            brew install node
        else
            echo "错误: 请先安装 Homebrew"
            echo "访问 https://brew.sh 按照说明安装"
            exit 1
        fi
    fi
fi
echo "Node.js 版本: $(node -v)"

echo ""
echo "====== 第3步: 安装 OpenClaw ======"
npm install -g openclaw@latest

echo ""
echo "====== 第4步: 安装 Skills ======"
${skillsLines}

echo ""
echo "====== 第5步: 启动服务 ======"
openclaw gateway --port 18789 &
sleep 5
open http://127.0.0.1:18789 2>/dev/null || echo "请手动打开 http://127.0.0.1:18789"

echo ""
echo "=========================================="
echo "  安装完成！请在浏览器中打开"
echo "  http://127.0.0.1:18789"
echo "=========================================="
read`
    }

  const copyCommand = () => {
    navigator.clipboard.writeText(getInstallScript())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
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
          <h1 className="text-2xl font-semibold mb-1 text-[#1d1d1f]">部署 DownClaw</h1>
          <p className="text-[#86868b] text-sm">4 步完成，在你的电脑上运行 AI 助手</p>
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
            Discord 客服
          </a>
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#e5e5e7] hover:bg-[#d2d2d7] rounded-full text-[#1d1d1f] transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            常见问题
          </button>
        </div>

        {showHelp && (
          <div className="mb-6 p-4 card-apple rounded-2xl text-sm text-[#6e6e73] space-y-3">
            <p><strong className="text-[#1d1d1f]">Q: 提示找不到 Node.js 怎么办？</strong><br/>
            A: 访问 <a href="https://nodejs.org" className="text-[#0A84FF] hover:underline">nodejs.org</a> 下载安装后重新运行脚本</p>
            
            <p><strong className="text-[#1d1d1f]">Q: Mac 提示没有 brew 怎么办？</strong><br/>
            A: 打开终端，粘贴运行以下命令安装 brew：</p>
            <code className="block bg-[#e5e5e7] px-3 py-2 rounded-lg text-xs text-[#1d1d1f] break-all font-mono">
              /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
            </code>
            
            <p><strong className="text-[#1d1d1f]">Q: 安装失败怎么办？</strong><br/>
            A: 加入 Discord 群，截图发给我们帮你排查</p>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[#1d1d1f]">选择你的用途</h2>
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
              ← 返回选择
            </button>
            <h2 className="text-lg font-semibold text-[#1d1d1f]">输入 MiniMax API Key</h2>
            
            <div className="bg-[#fff9e6] border border-[#ffd60a]/30 rounded-2xl p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-[#ff9f0a] flex-shrink-0 mt-0.5" />
                <div className="text-sm text-[#1d1d1f]">
                  <p className="font-medium mb-1">💡 强烈建议购买 Coding Plan</p>
                  <p className="text-[#86868b] text-xs">
                    虽然有赠送余额，但不够稳定。Coding Plan 每月仅需 ¥29 起，用量更充足。
                  </p>
                </div>
              </div>
            </div>

            <div>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-xxx..."
                className="w-full px-4 py-3 input-apple text-[#1d1d1f]"
              />
              <p className="text-xs text-[#86868b] mt-2">
                获取地址：<a href="https://platform.minimaxi.com/user-center/basic-information" target="_blank" rel="noopener noreferrer" className="text-[#0A84FF] hover:underline">platform.minimaxi.com</a>
              </p>
            </div>
            <button
              onClick={() => setStep(3)}
              disabled={!apiKey}
              className="w-full flex items-center justify-center gap-2 py-3 btn-primary-apple rounded-xl font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-50"
            >
              下一步 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-4">
            <button onClick={() => setStep(2)} className="text-[#86868b] hover:text-[#1d1d1f] text-sm">
              ← 返回
            </button>
            <h2 className="text-lg font-semibold text-[#1d1d1f]">配置消息渠道</h2>
            <p className="text-[#86868b] text-sm mb-4">
              选择你想要接入的平台，配置后 AI 助手可以在这些渠道接收和发送消息
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
                      // 可以在这里添加测试结果的处理逻辑
                      console.log(`Channel ${channelId} test result:`, result)
                    }}
                  />
                )
              })}
            </div>
            
            <div className="pt-4">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                提示：Web界面默认已启用，您可以在浏览器中直接使用 AI 助手
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 btn-apple rounded-xl transition-all"
                >
                  跳过此步
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 btn-primary-apple rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
                >
                  下一步 <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <button onClick={() => setStep(3)} className="text-[#86868b] hover:text-[#1d1d1f] text-sm">
              ← 返回
            </button>
            <h2 className="text-lg font-semibold text-[#1d1d1f]">开始安装</h2>
            
            <div className="card-apple rounded-2xl p-4 space-y-3 shadow-sm">
              <div className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-[#0A84FF] text-white text-xs flex items-center justify-center">1</span>
                <span>复制下方命令</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-[#0A84FF] text-white text-xs flex items-center justify-center">2</span>
                <span>打开终端（Mac: ⌘+空格 搜索 Terminal）</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-[#0A84FF] text-white text-xs flex items-center justify-center">3</span>
                <span>粘贴命令，回车运行</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-[#34C759] text-white text-xs flex items-center justify-center">✓</span>
                <span>等待完成，自动打开浏览器</span>
              </div>
            </div>

            <button
              onClick={copyCommand}
              disabled={!apiKey}
              className="w-full flex items-center justify-center gap-2 py-3 btn-primary-apple rounded-xl font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? '已复制！' : '复制安装命令'}
            </button>

            <div className="text-center text-[#86868b] text-xs space-y-1">
              <p>运行后会自动完成所有配置</p>
              <p>然后打开 <span className="text-[#1d1d1f] font-medium">http://127.0.0.1:18789</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}