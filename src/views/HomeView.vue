<script setup lang="ts">
import { useI18nStore } from '@/stores/i18n'
import { Download, Github, Sparkles, Terminal, Shield, Zap } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const { t } = useI18nStore()
const router = useRouter()

function goToWizard() {
  router.push('/wizard')
}
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="container hero-content">
        <div class="hero-logo">
          <img 
            src="https://cdn.opendown.ai/opendown-ai-2.png" 
            alt="ClawDown Logo" 
            class="logo-img"
          />
        </div>
        
        <h1 class="hero-title">{{ t.homeTitle }}</h1>
        
        <p class="hero-subtitle">{{ t.homeSubtitle }}</p>

        <p class="hero-desc">{{ t.homeDescription }}</p>
        
        <div class="hero-actions">
          <button @click="goToWizard" class="btn btn-primary">
            <Download class="btn-icon" />
            {{ t.oneClickDeploy }}
          </button>
          
          <a 
            href="https://github.com/opendownai/claw" 
            target="_blank" 
            class="btn btn-secondary"
          >
            <Github class="btn-icon" />
            {{ t.github }}
          </a>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h2 class="features-title">{{ t.whyChooseDownclaw }}</h2>
        <div class="features-grid">
          <div class="feature-card card-apple">
            <div class="feature-icon">
              <Shield class="icon" />
            </div>
            <h3 class="feature-name">{{ t.dataLocalStorage }}</h3>
            <p class="feature-desc">{{ t.dataLocalStorageDesc }}</p>
          </div>
          <div class="feature-card card-apple">
            <div class="feature-icon">
              <Sparkles class="icon" />
            </div>
            <h3 class="feature-name">{{ t.oneClickInstall }}</h3>
            <p class="feature-desc">{{ t.oneClickInstallDesc }}</p>
          </div>
          <div class="feature-card card-apple">
            <div class="feature-icon">
              <Terminal class="icon" />
            </div>
            <h3 class="feature-name">{{ t.multiChannelAccess }}</h3>
            <p class="feature-desc">{{ t.multiChannelAccessDesc }}</p>
          </div>
          <div class="feature-card card-apple">
            <div class="feature-icon">
              <Zap class="icon" />
            </div>
            <h3 class="feature-name">多模型支持</h3>
            <p class="feature-desc">支持 MiniMax、阿里云百炼、iFlow 等多种 AI 模型提供商</p>
          </div>
          <div class="feature-card card-apple">
            <div class="feature-icon">
              <Download class="icon" />
            </div>
            <h3 class="feature-name">10+ 行业模板</h3>
            <p class="feature-desc">涵盖电商、金融、制造等 10+ 个行业的专业模板</p>
          </div>
          <div class="feature-card card-apple">
            <div class="feature-icon">
              <Github class="icon" />
            </div>
            <h3 class="feature-name">开源免费</h3>
            <p class="feature-desc">100% 开源，MIT 许可证，永久免费使用</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
}

.hero-content {
  text-align: center;
  max-width: 640px;
  margin: 0 auto;
}

.hero-logo {
  margin-bottom: 24px;
}

.logo-img {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.hero-title {
  font-size: 42px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: 18px;
  color: var(--text-secondary);
  margin-bottom: 16px;
  line-height: 1.6;
}

.hero-desc {
  font-size: 15px;
  color: var(--text-tertiary);
  margin-bottom: 32px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent-blue), #0A74E0);
  color: white;
  box-shadow: 0 4px 12px rgba(10, 132, 255, 0.3);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #0A74E0, #0956BF);
  box-shadow: 0 6px 16px rgba(10, 132, 255, 0.4);
}

.btn-secondary {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}

.btn-secondary:hover {
  background: var(--bg-secondary);
  border-color: var(--text-tertiary);
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.features {
  padding: 60px 0;
  background: var(--bg-primary);
}

.features-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 40px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.feature-card {
  padding: 32px 24px;
  text-align: center;
}

.feature-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, var(--accent-blue), var(--accent-green));
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon .icon {
  width: 28px;
  height: 28px;
  color: white;
}

.feature-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.feature-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 32px;
  }
  
  .hero-subtitle {
    font-size: 16px;
  }
  
  .hero-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
