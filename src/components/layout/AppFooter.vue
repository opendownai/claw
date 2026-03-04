<script setup lang="ts">
import { useI18nStore } from '@/stores/i18n'
import { Github, MessageCircle } from 'lucide-vue-next'

const { t } = useI18nStore()
</script>

<template>
  <footer class="footer">
    <div class="footer-main">
      <div class="footer-links">
        <a href="https://github.com/opendownai" target="_blank">GitHub</a>
        <a href="https://discord.gg/gjGb5WEz" target="_blank">Discord</a>
        <a href="https://opendown.ai/docs" target="_blank">Docs</a>
        <a href="https://claw.opendown.ai/" target="_blank">OpenClaw Deploy</a>
        <a href="https://www.buymeacoffee.com/opendown" target="_blank">Buy Me a Coffee</a>
        <a href="mailto:support@opendown.ai">Contact</a>
      </div>
      <p class="footer-copyright">
        © 2026 OpenDown. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  text-align: center;
  padding: 40px 24px 80px;
  color: var(--text-secondary);
  font-size: 14px;
}

.footer-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  margin-bottom: 20px;
  padding: 0 24px;
}

.footer-links a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
  padding: 6px 12px;
  border-radius: 8px;
}

.footer-links a:hover {
  color: var(--accent-blue);
  background: rgba(99, 102, 241, 0.1);
}

.footer-copyright {
  text-align: center;
  color: var(--text-secondary);
  font-size: 13px;
  opacity: 0.8;
  margin: 0;
  padding: 0 24px;
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 16px;
  }
  
  .footer-links {
    gap: 16px;
    padding: 0 8px;
  }
  
  .footer-links a {
    padding: 4px 8px;
    font-size: 13px;
  }
}
</style>
