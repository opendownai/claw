import { useState } from 'react'
import { ChannelConfig, ChannelOption } from '@/lib/channel-types'
import { Check, Send, MessageSquare, Zap, MessageCircle, Globe, Eye, EyeOff, Play, Loader2, Info } from 'lucide-react'
import { ChannelDebugger, DebugResult } from '@/lib/channel-debugger'

interface ChannelCardProps {
  channel: ChannelConfig
  channelOption: ChannelOption
  onToggle: (id: string, enabled: boolean) => void
  onConfigChange: (id: string, field: string, value: string) => void
  showDetails?: boolean
  onTestResult?: (channelId: string, result: DebugResult) => void
}

export function ChannelCard({ 
  channel, 
  channelOption, 
  onToggle, 
  onConfigChange, 
  showDetails = true,
  onTestResult
}: ChannelCardProps) {
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<DebugResult | null>(null)
  const [showGuide, setShowGuide] = useState(false)

  const getChannelIcon = () => {
    switch (channelOption.id) {
      case 'dingtalk': return MessageCircle
      case 'telegram': return Send
      case 'feishu': return Zap
      case 'web': return Globe
      default: return MessageCircle
    }
  }

  const Icon = getChannelIcon()
  
  const testChannel = async () => {
    if (!channel.enabled) return
    
    setIsTesting(true)
    setTestResult(null)
    
    try {
      const result = await ChannelDebugger.testChannel(channel)
      setTestResult(result)
      if (onTestResult) {
        onTestResult(channel.id, result)
      }
    } catch (error) {
      const result = { success: false, message: `测试失败: ${(error as Error).message}` }
      setTestResult(result)
      if (onTestResult) {
        onTestResult(channel.id, result)
      }
    } finally {
      setIsTesting(false)
    }
  }

  const guideContent = ChannelDebugger.getSetupGuide(channel.id)

  return (
    <div 
      className={`p-4 card-apple border rounded-2xl transition-all ${
        channel.enabled 
          ? 'border-[#0A84FF] bg-[#f5f5f7]' 
          : 'border-[#d2d2d7]'
      }`}
    >
      <div className="flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer flex-1"
          onClick={() => onToggle(channel.id, !channel.enabled)}
        >
          <div 
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              channel.enabled 
                ? 'bg-[#0A84FF]' 
                : 'bg-[#e5e5e7]'
            }`}
          >
            <Icon className={`w-5 h-5 ${
              channel.enabled ? 'text-white' : 'text-[#86868b]'
            }`} />
          </div>
          <div className="flex-1">
            <div className="font-medium text-[#1d1d1f]">
              {channelOption.name}
            </div>
            <div className="text-xs text-[#6e6e73]">
              {channelOption.description}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {guideContent && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowGuide(!showGuide)
                }}
                className="p-1 rounded-md hover:bg-[#e5e5e7] transition-colors"
              >
                <Info className="w-4 h-4 text-[#86868b]" />
              </button>
            )}
            <div className={`relative w-10 h-6 flex items-center ${
              channel.enabled ? 'justify-end pr-1' : 'justify-start pl-1'
            }`}>
              <div 
                className={`w-4 h-4 rounded-full transition-colors ${
                  channel.enabled 
                    ? 'bg-white' 
                    : 'bg-[#aeaeb2]'
                }`}
              />
              <div 
                className={`absolute w-8 h-6 rounded-full transition-colors ${
                  channel.enabled 
                    ? 'bg-[#34C759]' 
                    : 'bg-[#d1d1d6]'
                }`}
              />
            </div>
          </div>
        </div>
        
        {channel.enabled && (
          <button
            onClick={testChannel}
            disabled={isTesting}
            className="ml-4 p-2 rounded-lg bg-[#e5e5e7] hover:bg-[#d2d2d7] disabled:opacity-50 transition-colors"
          >
            {isTesting ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#0A84FF]" />
            ) : (
              <Play className="w-4 h-4 text-[#6e6e73]" />
            )}
          </button>
        )}
      </div>
      
      {showGuide && guideContent && (
        <div className="mt-3 p-3 rounded-lg bg-[#e5e5e7] text-sm text-[#1d1d1f]">
          <div className="font-medium mb-1 text-[#0A84FF]">配置指南</div>
          <div className="whitespace-pre-line">{guideContent}</div>
        </div>
      )}
      
      {showDetails && channel.enabled && (
        <div className="mt-3 space-y-2 pl-13">
          {channelOption.configFields.map(field => (
            <div key={field.name} className="space-y-1">
              <label className="text-xs text-[#86868b] flex items-center gap-1">
                {field.label}{field.required && '*'}
                {field.name === 'webhookUrl' && (
                  <span className="relative group">
                    <Eye className="w-3 h-3 text-[#aeaeb2]" />
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-[#1d1d1f] text-white text-xs rounded px-2 py-1 w-48 z-10">
                      请在消息渠道中创建机器人并获取Webhook URL
                    </span>
                  </span>
                )}
              </label>
              <input
                type={field.type === 'password' ? 'password' : 'text'}
                value={channel.config[field.name] || ''}
                onChange={(e) => onConfigChange(channel.id, field.name, e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 input-apple text-sm text-[#1d1d1f]"
              />
            </div>
          ))}
        </div>
      )}
      
      {testResult && (
        <div className={`mt-3 p-3 rounded-lg text-sm ${
          testResult.success 
            ? 'bg-[#e5f5e8] text-[#30D158]' 
            : 'bg-[#ffe5e5] text-[#FF453A]'
        }`}>
          {testResult.message}
        </div>
      )}
    </div>
  )
}