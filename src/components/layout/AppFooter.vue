<script setup lang="ts">
import { useI18nStore } from '@/stores/i18n'
import { Github, MessageCircle } from 'lucide-vue-next'

const { t } = useI18nStore()
</script>

<template>
  <footer class="footer">
    <div class="container footer-content">
      <div class="footer-left">
        <img 
          src="https://cdn.opendown.ai/opendown-ai-2.png" 
          alt="DownClaw Logo" 
          class="footer-logo"
        />
        <span>{{ t.footerDownclaw }}</span>
      </div>
      <div class="footer-right">
        <a href="https://github.com/opendownai/claw" target="_blank" class="footer-link">
          <Github class="icon" />
          {{ t.github }}
        </a>
        <a href="https://discord.gg/gjGb5WEz" target="_blank" class="footer-link">
          <MessageCircle class="icon" />
          {{ t.discord }}
        </a>
        <span class="footer-license">{{ t.footerLicense }}</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 24px 0;
  border-top: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-logo {
  width: 24px;
  height: 24px;
  border-radius: 6px;
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  font-size: 14px;
  transition: color 0.2s;
}

.footer-link:hover {
  color: var(--accent-blue);
}

.footer-license {
  color: var(--text-tertiary);
  font-size: 14px;
}

.icon {
  width: 18px;
  height: 18px;
}

@media (max-width: 640px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-right {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
