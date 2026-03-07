<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18nStore } from '@/stores/i18n'

const { language } = storeToRefs(useI18nStore())

const isWindows = computed(() => {
  return typeof navigator !== 'undefined' && navigator.platform.toLowerCase().includes('win')
})
</script>

<template>
  <div class="key-sequence" :class="{ windows: isWindows }">
    <template v-if="!isWindows">
      <span class="key cmd">⌘</span>
      <span class="plus">+</span>
      <span class="key space">空格</span>
      <span class="arrow">→</span>
      <span class="key terminal">terminal</span>
      <span class="arrow">↩</span>
    </template>
    <template v-else>
      <span class="key win">⊞</span>
      <span class="plus">+</span>
      <span class="key x">X</span>
      <span class="arrow">→</span>
      <span class="key select">{{ language === 'zh' ? '选择 Terminal' : 'Select Terminal' }}</span>
    </template>
  </div>
</template>

<style scoped>
.key-sequence {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  font-family: inherit;
  animation: keyPress 0.3s ease forwards;
  opacity: 0;
}

.key.cmd {
  font-size: 16px;
}

.key.space {
  padding: 4px 14px;
}

.key.terminal {
  background: linear-gradient(135deg, var(--accent-blue), var(--accent-blue-dim));
  color: white;
  border-color: var(--accent-blue);
}

.key.win {
  font-size: 14px;
}

.key.x {
  font-size: 13px;
  font-weight: 700;
}

.key.select {
  background: linear-gradient(135deg, var(--accent-blue), var(--accent-blue-dim));
  color: white;
  border-color: var(--accent-blue);
}

.plus,
.arrow {
  color: var(--text-tertiary);
  font-size: 12px;
  opacity: 0;
  animation: fadeIn 0.2s ease forwards;
}

.key:nth-child(1) { animation-delay: 0s; }
.plus:nth-child(2) { animation-delay: 0.15s; }
.key:nth-child(3) { animation-delay: 0.3s; }
.arrow:nth-child(4) { animation-delay: 0.6s; }
.key:nth-child(5) { animation-delay: 0.75s; }
.arrow:nth-child(6) { animation-delay: 1.2s; }

.windows .key:nth-child(1) { animation-delay: 0s; }
.windows .plus:nth-child(2) { animation-delay: 0.15s; }
.windows .key:nth-child(3) { animation-delay: 0.3s; }
.windows .arrow:nth-child(4) { animation-delay: 0.6s; }
.windows .key:nth-child(5) { animation-delay: 0.75s; }

@keyframes keyPress {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
