<script setup lang="ts">
import { computed } from 'vue'
import type { ChannelConfig, ChannelOption } from '@/utils/channel-types'
import { getChannelOptionName, getChannelOptionDescription, getChannelConfigFieldLabel, getChannelConfigFieldPlaceholder } from '@/utils/channel-types'
import { useI18nStore } from '@/stores/i18n'
import { Globe, MessageCircle, Send, Zap, Phone, MessageSquare, Hash } from 'lucide-vue-next'

const props = defineProps<{
  channel: ChannelConfig
  channelOption: ChannelOption
}>()

const emit = defineEmits<{
  (e: 'toggle', id: string, enabled: boolean): void
  (e: 'update:config', id: string, field: string, value: any): void
}>()

const { t, language } = useI18nStore()

const iconComponent = computed(() => {
  const icons: Record<string, any> = {
    globe: Globe,
    'message-circle': MessageCircle,
    send: Send,
    zap: Zap,
    phone: Phone,
    'message-square': MessageSquare,
    hash: Hash
  }
  return icons[props.channelOption.icon] || Globe
})

const hasLogo = computed(() => !!props.channelOption.logo)

const isInlineSvg = computed(() => {
  if (!props.channelOption.logo) return false
  return props.channelOption.logo.trim().startsWith('<svg')
})

function handleToggle(e: Event) {
  const target = e.target as HTMLInputElement
  emit('toggle', props.channel.id, target.checked)
}

function handleConfigChange(field: string, e: Event) {
  const target = e.target as HTMLInputElement
  emit('update:config', props.channel.id, field, target.value)
}
</script>

<template>
  <div class="channel-card card-apple">
    <div class="channel-header">
      <div class="channel-info">
        <div class="channel-icon" :style="{ backgroundColor: channelOption.color }">
          <img v-if="hasLogo && !isInlineSvg" :src="channelOption.logo" class="channel-logo" :alt="getChannelOptionName(channelOption, language)" />
          <span v-else-if="hasLogo && isInlineSvg" class="channel-logo-svg" v-html="channelOption.logo"></span>
          <component v-else :is="iconComponent" class="icon" />
        </div>
        <div class="channel-text">
          <h3 class="channel-name">{{ getChannelOptionName(channelOption, language) }}</h3>
          <p class="channel-desc">{{ getChannelOptionDescription(channelOption, language) }}</p>
          <a 
            v-if="channelOption.helpUrl" 
            :href="channelOption.helpUrl" 
            target="_blank" 
            class="help-link"
          >
            {{ t.channelHelpLink }}
          </a>
        </div>
      </div>
      <label class="toggle">
        <input 
          type="checkbox" 
          :checked="channel.enabled" 
          @change="handleToggle"
        />
        <span class="toggle-slider"></span>
      </label>
    </div>
    
    <div v-if="channel.enabled && channelOption.configFields.length > 0" class="channel-config">
      <div 
        v-for="field in channelOption.configFields" 
        :key="field.name" 
        class="config-field"
      >
        <label class="field-label">{{ getChannelConfigFieldLabel(field, language) }}</label>
        <input
          :type="field.type"
          class="field-input"
          :value="channel.config[field.name] || ''"
          :placeholder="getChannelConfigFieldPlaceholder(field, language)"
          @input="handleConfigChange(field.name, $event)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.channel-card {
  padding: 16px;
}

.channel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.help-link {
  font-size: 12px;
  color: var(--accent-blue);
  text-decoration: none;
  margin-top: 4px;
  display: inline-block;
}

.help-link:hover {
  text-decoration: underline;
}

.channel-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.channel-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;
}

.channel-logo {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.channel-logo-svg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
}

.channel-logo-svg :deep(svg) {
  width: 100%;
  height: 100%;
  fill: white;
}

.channel-logo-svg :deep(svg[fill="none"]) {
  fill: none;
}

.channel-logo-svg :deep(svg[stroke]) {
  fill: none;
}

.icon {
  width: 22px;
  height: 22px;
}

.channel-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.channel-desc {
  font-size: 13px;
  color: var(--text-tertiary);
}

.toggle {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 28px;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--border-color);
  transition: 0.3s;
  border-radius: 28px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

.toggle input:checked + .toggle-slider {
  background-color: var(--accent-blue);
}

.toggle input:checked + .toggle-slider:before {
  transform: translateX(20px);
}

.channel-config {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.field-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.field-input {
  width: 100%;
  padding: 10px 14px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.field-input:focus {
  border-color: var(--accent-blue);
}

.field-input::placeholder {
  color: var(--text-tertiary);
}
</style>
