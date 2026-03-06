<script setup lang="ts">
import { useI18nStore } from '@/stores/i18n'
import { Github, MessageCircle } from 'lucide-vue-next'

const { t } = useI18nStore()
</script>

<template>
  <header class="main-nav">
    <div class="nav-container">
      <div class="nav-logo">
        <img 
          src="https://cdn.opendown.ai/opendown-ai-2.png" 
          alt="OpenDown" 
          class="nav-logo-img"
        >
        <a href="https://opendown.ai" class="nav-logo-text">OpenDown</a>
      </div>
      <div class="nav-links">
        <a href="https://opendown.ai" class="nav-link">Home</a>
        <a href="/" class="nav-link active">OpenClaw Deploy</a>
        <a href="https://github.com/opendownai" target="_blank" class="nav-link">GitHub</a>
        <a href="https://discord.gg/gjGb5WEz" target="_blank" class="nav-link">Discord</a>
      </div>
      <div class="nav-theme-toggle">
        <!-- Theme toggle will be added later if needed -->
      </div>
    </div>
  </header>
</template>

<style scoped>
.main-nav {
  position: sticky;
  top: 0;
  background: var(--bg-primary);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  z-index: 1000;
  padding: 12px 0;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.nav-logo-img {
  height: 32px;
  width: auto;
  border-radius: 8px;
}

.nav-logo-text {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 20px;
  background: linear-gradient(135deg, var(--accent-blue), var(--accent-blue-dim));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
}

.nav-link:hover {
  color: var(--accent-blue);
}

.nav-link.active {
  color: var(--accent-blue);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent-blue);
  transform: scaleX(0);
  transition: transform 0.2s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  transform: scaleX(1);
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 16px;
  }
  
  .nav-links {
    display: none;
  }
  
  .nav-logo-img {
    height: 28px;
  }
  
  .nav-logo-text {
    font-size: 18px;
  }
}
</style>
