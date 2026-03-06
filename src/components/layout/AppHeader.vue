<script setup lang="ts">
import { useI18nStore } from '@/stores/i18n'
import { Github, MessageCircle, Sun, Moon } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'

const { t } = useI18nStore()

const isDark = ref(true)

const toggleTheme = () => {
  isDark.value = !isDark.value
  const theme = isDark.value ? 'dark' : 'light'
  localStorage.setItem('theme', theme)
  document.documentElement.setAttribute('data-theme', theme)
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved) {
    isDark.value = saved === 'dark'
    document.documentElement.setAttribute('data-theme', saved)
  } else {
    document.documentElement.setAttribute('data-theme', 'dark')
  }
})
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
        <button class="theme-btn" @click="toggleTheme" title="Toggle theme">
          <Sun v-if="!isDark" class="icon-sun" />
          <Moon v-else class="icon-moon" />
        </button>
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

.nav-theme-toggle {
  display: flex;
  align-items: center;
}

.theme-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 8px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-btn:hover {
  background: rgba(128, 128, 128, 0.1);
  color: var(--text-primary);
}

.theme-btn .icon-sun,
.theme-btn .icon-moon {
  width: 20px;
  height: 20px;
}

.icon-sun {
  display: block;
}

.icon-moon {
  display: block;
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
