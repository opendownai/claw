<script setup lang="ts">
import { useI18nStore } from '@/stores/i18n'
import { Github, MessageCircle } from 'lucide-vue-next'

const { t } = useI18nStore()
</script>

<template>
  <header class="header">
    <div class="container header-content">
      <div class="header-left">
        <a href="/" class="header-link">
          <span>OpenClaw</span>
        </a>
      </div>
      <div class="header-right">
        <a href="https://discord.gg/gjGb5WEz" target="_blank" class="header-link">
          <MessageCircle class="icon" />
          <span>{{ t.discord }}</span>
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  padding: 16px 0;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 14px;
  transition: color 0.2s;
}

.header-link:hover {
  color: var(--accent-blue);
}

.icon {
  width: 20px;
  height: 20px;
}
</style>
