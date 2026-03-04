'use client'

import { useState } from 'react'
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { ChannelConfig } from '@/lib/channel-types'
import { MessageSender, SendResult } from '@/lib/message-sender'
import { useI18n } from '@/lib/i18n-context'

export function TestMessageButton({ 
  channel, 
  disabled 
}: { 
  channel: ChannelConfig; 
  disabled?: boolean;
}) {
  const { language } = useI18n()
  const [isSending, setIsSending] = useState(false)
  const [sendResult, setSendResult] = useState<SendResult | null>(null)

  const handleSendTestMessage = async () => {
    if (disabled || !channel.enabled) return

    setIsSending(true)
    setSendResult(null)

    try {
      const result = await MessageSender.sendTestMessage(channel, language)
      setSendResult(result)
    } catch (error) {
      setSendResult({
        success: false,
        message: `发送测试消息时发生错误: ${error instanceof Error ? error.message : '未知错误'}`
      })
    } finally {
      setIsSending(false)
    }
  }

  const isSuccess = sendResult?.success
  const isError = sendResult && !sendResult.success

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleSendTestMessage}
        disabled={disabled || isSending || !channel.enabled}
        className={`
          flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-sm
          transition-all
          ${disabled || isSending || !channel.enabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'}
        `}
      >
        {isSending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {language === 'zh' ? '发送中...' : 'Sending...'}
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            {language === 'zh' ? '测试发送' : 'Send Test'}
          </>
        )}
      </button>

      {(isSuccess || isError) && (
        <div className={`
          flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium
          ${isSuccess 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
          }
        `}>
          {isSuccess ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          {sendResult?.message}
        </div>
      )}
    </div>
  )
}