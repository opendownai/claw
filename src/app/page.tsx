import Link from 'next/link'
import { Download, Github, Sparkles, Terminal, Shield, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <section className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#0A84FF] to-[#30D158] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <img src="https://cdn.opendown.ai/opendown-ai-2.png" alt="ClawDown Logo" className="w-12 h-12 rounded-xl z-10" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-foreground">
            opendown.ai - DownClaw
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            开源的个人 AI 助手，<br/>
            数据存在本地，支持多种消息渠道接入
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            选择用途 → 输入 API Key → 一键安装，3 步完成
          </p>
          
          <div className="card-apple rounded-2xl p-6 max-w-md mx-auto mb-8 shadow-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
              选择用途 → 输入 API Key → 一键安装
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/wizard"
                className="inline-flex items-center gap-2 px-6 py-3 btn-primary-apple text-white rounded-xl font-medium flex-1 justify-center shadow-md hover:shadow-lg transition-shadow"
              >
                <Download className="w-5 h-5" />
                一键部署
              </Link>
              
              <a
                href="https://github.com/opendownai/claw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 btn-apple rounded-xl transition-all flex-1 justify-center"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-50 dark:bg-[#0a0a12]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-center mb-8 text-gray-800 dark:text-gray-200">为什么选择 ClawDown？</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-2xl card-apple shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0A84FF] to-[#30D158] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white z-10" />
              </div>
              <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">数据本地存储</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">数据只在你自己的电脑上</p>
            </div>
            <div className="text-center p-6 rounded-2xl card-apple shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0A84FF] to-[#30D158] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white z-10" />
              </div>
              <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">一键安装</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">3 步完成，无需配置</p>
            </div>
            <div className="text-center p-6 rounded-2xl card-apple shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0A84FF] to-[#30D158] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Terminal className="w-6 h-6 text-white z-10" />
              </div>
              <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">多渠道接入</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">支持 Telegram、Discord 等</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-6 px-4 border-t border-gray-200 dark:border-[#424245] bg-white dark:bg-[#000000]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <img src="https://cdn.opendown.ai/opendown-ai-2.png" alt="DownClaw Logo" className="w-6 h-6 rounded-xl" />
            <span>DownClaw</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/opendownai/claw" className="hover:text-[#0A84FF] dark:hover:text-[#0A84FF] transition-colors">GitHub</a>
            <a href="https://discord.gg/gjGb5WEz" className="hover:text-[#0A84FF] dark:hover:text-[#0A84FF] transition-colors">Discord</a>
            <span>MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  )
}