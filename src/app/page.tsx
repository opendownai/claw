'use client'

import Link from 'next/link'
import { Download, Github, Sparkles, Terminal, Shield, Zap } from 'lucide-react'
import { useI18n } from '@/lib/i18n-context'

export default function HomePage() {
  const { t, isLanguageLoaded } = useI18n()

  if (!isLanguageLoaded) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <section className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#0A84FF] to-[#30D158] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <img src="https://cdn.opendown.ai/opendown-ai-2.png" alt="ClawDown Logo" className="w-12 h-12 rounded-xl z-10" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-foreground">
            {t.homeTitle}
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 whitespace-pre-line">
            {t.homeSubtitle}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            {t.homeDescription}
          </p>
          
          <div className="card-apple rounded-2xl p-6 max-w-md mx-auto mb-8 shadow-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
              {t.homeDescription}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/wizard"
                className="inline-flex items-center gap-2 px-6 py-3 btn-primary-apple text-white rounded-xl font-medium flex-1 justify-center shadow-md hover:shadow-lg transition-shadow"
              >
                <Download className="w-5 h-5" />
                {t.oneClickDeploy}
              </Link>
              
              <a
                href="https://github.com/opendownai/claw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 btn-apple rounded-xl transition-all flex-1 justify-center"
              >
                <Github className="w-5 h-5" />
                {t.github}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-50 dark:bg-[#0a0a12]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-center mb-8 text-gray-800 dark:text-gray-200">{t.whyChooseDownclaw}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-2xl card-apple shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0A84FF] to-[#30D158] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white z-10" />
              </div>
              <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">{t.dataLocalStorage}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.dataLocalStorageDesc}</p>
            </div>
            <div className="text-center p-6 rounded-2xl card-apple shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0A84FF] to-[#30D158] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white z-10" />
              </div>
              <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">{t.oneClickInstall}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.oneClickInstallDesc}</p>
            </div>
            <div className="text-center p-6 rounded-2xl card-apple shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0A84FF] to-[#30D158] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Terminal className="w-6 h-6 text-white z-10" />
              </div>
              <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">{t.multiChannelAccess}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.multiChannelAccessDesc}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-6 px-4 border-t border-gray-200 dark:border-[#424245] bg-white dark:bg-[#000000]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <img src="https://cdn.opendown.ai/opendown-ai-2.png" alt="DownClaw Logo" className="w-6 h-6 rounded-xl" />
            <span>{t.footerDownclaw}</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/opendownai/claw" className="hover:text-[#0A84FF] dark:hover:text-[#0A84FF] transition-colors">{t.github}</a>
            <a href="https://discord.gg/gjGb5WEz" className="hover:text-[#0A84FF] dark:hover:text-[#0A84FF] transition-colors">{t.discord}</a>
            <span>{t.footerLicense}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
