'use client'

import Link from 'next/link'
import { Github, Sparkles } from 'lucide-react'

export function Header() {
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
            <a
              href="https://discord.gg/gjGb5WEz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6e6e73] hover:text-[#0A84FF] transition-colors px-3 py-1.5 rounded-full hover:bg-[#e5e5e7]"
            >
              Discord
            </a>
            <a
              href="https://github.com/opendownai/claw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6e6e73] hover:text-[#0A84FF] transition-colors p-2 rounded-full hover:bg-[#e5e5e7]"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}