import type { ChannelConfig } from './channel-types'
import { channelOptions } from './channel-types'

export class ChannelManager {
  private channels: Map<string, ChannelConfig>

  constructor(initialChannels?: ChannelConfig[]) {
    this.channels = new Map()
    
    if (initialChannels) {
      initialChannels.forEach(channel => {
        this.channels.set(channel.id, channel)
      })
    } else {
      channelOptions.forEach(option => {
        this.channels.set(option.id, {
          id: option.id,
          name: option.name,
          nameEn: option.nameEn,
          icon: option.icon,
          enabled: option.id === 'web',
          config: option.id === 'web' ? {} : {}
        })
      })
    }
  }

  getChannel(id: string): ChannelConfig | undefined {
    return this.channels.get(id)
  }

  getAllChannels(): ChannelConfig[] {
    return Array.from(this.channels.values())
  }

  getEnabledChannels(): ChannelConfig[] {
    return this.getAllChannels().filter(channel => channel.enabled)
  }

  toggleChannel(id: string, enabled: boolean): void {
    const channel = this.channels.get(id)
    if (channel) {
      channel.enabled = enabled
      this.channels.set(id, channel)
    }
  }

  updateChannel(id: string, updates: Partial<ChannelConfig>): void {
    const channel = this.channels.get(id)
    if (channel) {
      this.channels.set(id, { ...channel, ...updates })
    }
  }

  updateChannelConfig(id: string, config: Record<string, any>): void {
    const channel = this.channels.get(id)
    if (channel) {
      channel.config = { ...channel.config, ...config }
      this.channels.set(id, channel)
    }
  }
}
