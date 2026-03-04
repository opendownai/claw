import { ChannelConfig, channelOptions } from '@/lib/channel-types'

export class ChannelManager {
  private channels: ChannelConfig[] = []

  constructor(initialChannels?: ChannelConfig[]) {
    if (initialChannels) {
      this.channels = initialChannels
    } else {
      // 初始化默认频道配置
      this.channels = channelOptions.map(option => ({
        id: option.id,
        name: option.name,
        icon: option.icon,
        enabled: false,
        config: {}
      }))
    }
  }

  getChannel(id: string): ChannelConfig | undefined {
    return this.channels.find(channel => channel.id === id)
  }

  getAllChannels(): ChannelConfig[] {
    return this.channels
  }

  addChannel(config: ChannelConfig): void {
    const existingIndex = this.channels.findIndex(c => c.id === config.id)
    if (existingIndex >= 0) {
      this.channels[existingIndex] = config
    } else {
      this.channels.push(config)
    }
  }

  updateChannel(id: string, updates: Partial<ChannelConfig>): void {
    const channel = this.getChannel(id)
    if (channel) {
      Object.assign(channel, updates)
    }
  }

  toggleChannel(id: string, enabled: boolean): void {
    this.updateChannel(id, { enabled })
  }

  removeChannel(id: string): void {
    this.channels = this.channels.filter(channel => channel.id !== id)
  }

  getEnabledChannels(): ChannelConfig[] {
    return this.channels.filter(channel => channel.enabled)
  }

  // 生成包含频道配置的安装脚本
  generateConfigWithChannels(apiKey: string, selectedScenario?: any): string {
    const enabledChannels = this.getEnabledChannels()
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

    // 构建最终配置对象
    const configObj = {
      meta: { 
        lastTouchedVersion: "2026.3.1", 
        lastTouchedAt: new Date().toISOString() 
      },
      update: { channel: "stable" },
      models: {
        mode: "merge",
        providers: {
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
      },
      agents: { 
        defaults: { 
          model: { primary: "minimax/MiniMax-M2.5" }, 
          models: { 
            "minimax/MiniMax-M2.5": { alias: "MiniMax" } 
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
        } 
      },
      skills: { 
        install: { 
          nodeManager: "npm" 
        } 
      }
    }

    return JSON.stringify(configObj, null, 2)
  }
}