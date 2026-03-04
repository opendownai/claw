'use client'

import Link from 'next/link'
import { Github, Sparkles, Globe, Sun, Moon } from 'lucide-react'
import { useI18n } from '@/lib/i18n-context'
import { useTheme } from '@/lib/theme-context'
import { useState, useEffect } from 'react'

export function Header() {
  const { language, setLanguage, t, isLanguageLoaded } = useI18n()
  const { theme, toggleTheme } = useTheme()
  const [showLangMenu, setShowLangMenu] = useState(false)

  if (!isLanguageLoaded) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#d2d2d7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <img 
              src="https://cdn.opendown.ai/opendown-ai-2.png" 
              alt="DownClaw Logo" 
              className="w-10 h-10 rounded-xl" 
            />
            <span className="text-xl font-semibold text-[#1d1d1f]">DownClaw</span>
          </Link>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="text-[#6e6e73] hover:text-[#0A84FF] transition-colors p-2 rounded-full hover:bg-[#e5e5e7] dark:hover:bg-[#31313a]"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-1 text-[#6e6e73] hover:text-[#0A84FF] transition-colors px-3 py-1.5 rounded-full hover:bg-[#e5e5e7] dark:hover:bg-[#31313a]"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">{language === 'zh' ? '中文' : 'EN'}</span>
                </button>
                {showLangMenu && (
                  <div className="absolute right-0 mt-2 w-24 bg-white rounded-xl shadow-lg border border-[#d2d2d7] dark:bg-[#121218] dark:border-[#31313a] overflow-hidden">
                    <button
                      onClick={() => { setLanguage('en'); setShowLangMenu(false); }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-[#e5e5e7] dark:hover:bg-[#31313a] ${language === 'en' ? 'text-[#0A84FF] font-medium' : 'text-[#1d1d1f] dark:text-[#f5f5f7]'}`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => { setLanguage('zh'); setShowLangMenu(false); }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-[#e5e5e7] dark:hover:bg-[#31313a] ${language === 'zh' ? 'text-[#0A84FF] font-medium' : 'text-[#1d1d1f] dark:text-[#f5f5f7]'}`}
                    >
                      中文
                    </button>
                  </div>
                )}
              </div>
              <a
                href="https://discord.gg/gjGb5WEz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6e6e73] hover:text-[#0A84FF] transition-colors px-3 py-1.5 rounded-full hover:bg-[#e5e5e7] dark:hover:bg-[#31313a]"
              >
                {t.discord}
              </a>
              <a
                href="https://github.com/opendownai/claw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6e6e73] hover:text-[#0A84FF] transition-colors p-2 rounded-full hover:bg-[#e5e5e7] dark:hover:bg-[#31313a]"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
        </div>
      </div>
    </header>
  )
}