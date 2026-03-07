<script setup lang="ts">
import { useI18nStore } from '@/stores/i18n'
import { Download, Github, Sparkles, Terminal, Shield, Zap } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const { t, language } = useI18nStore()
const router = useRouter()

const channels = [
  { id: 'web', name: 'Web', logo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' },
  { id: 'feishu', name: '飞书', logo: 'https://p1-hera.feishucdn.com/tos-cn-i-jbbdkfciu3/1ec7129d900e442d8501d810efdaa369~tplv-jbbdkfciu3-image:0:0.image' },
  { id: 'dingtalk', name: '钉钉', logo: 'https://img.alicdn.com/imgextra/i3/O1CN017PqYP51OX3bSJGxQY_!!6000000001714-2-tps-200-200.png' },
  { id: 'telegram', name: 'Telegram', logo: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"></path></svg>' },
  { id: 'iflow', name: '心流', logo: 'https://img.alicdn.com/imgextra/i3/O1CN01xW6E191OTOlht5PNg_!!6000000001706-55-tps-50-50.svg' },
  { id: 'whatsapp', name: 'WhatsApp', logo: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>' },
  { id: 'discord', name: 'Discord', logo: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path></svg>' },
  { id: 'slack', name: 'Slack', logo: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>' },
]

const providers = [
  { id: 'minimax', name: 'MiniMax', nameEn: 'MiniMax', logo: '<svg viewBox="0 0 24 24" fill="#2563EB"><path d="M11.43 3.92a.86.86 0 1 0-1.718 0v14.236a1.999 1.999 0 0 1-3.997 0V9.022a.86.86 0 1 0-1.718 0v3.87a1.999 1.999 0 0 1-3.997 0V11.49a.57.57 0 0 1 1.139 0v1.404a.86.86 0 0 0 1.719 0V9.022a1.999 1.999 0 0 1 3.997 0v9.134a.86.86 0 0 0 1.719 0V3.92a1.998 1.998 0 1 1 3.996 0v11.788a.57.57 0 1 1-1.139 0zm10.572 3.105a2 2 0 0 0-1.999 1.997v7.63a.86.86 0 0 1-1.718 0V3.923a1.999 1.999 0 0 0-3.997 0v16.16a.86.86 0 0 1-1.719 0V18.08a.57.57 0 1 0-1.138 0v2a1.998 1.998 0 0 0 3.996 0V3.92a.86.86 0 0 1 1.719 0v12.73a1.999 1.999 0 0 0 3.996 0V9.023a.86.86 0 1 1 1.72 0v6.686a.57.57 0 0 0 1.138 0V9.022a2 2 0 0 0-1.998-1.997"/></svg>' },
  { id: 'aliyun', name: '阿里云百炼', nameEn: 'Alibaba Cloud', logo: 'https://gw.alicdn.com/imgextra/i4/O1CN01vVn7g32134zNZEeAR_!!6000000006928-55-tps-24-24.svg' },
  { id: 'iflow', name: '心流', nameEn: 'iFlow', logo: 'https://img.alicdn.com/imgextra/i1/O1CN01nulwex1q7Eq1TVqUh_!!6000000005448-55-tps-32-32.svg' },
]

function isInlineSvg(logo?: string): boolean {
  if (!logo) return false
  return logo.trim().startsWith('<svg')
}

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
            alt="OpenClaw Logo" 
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
              <Zap class="icon" />
            </div>
            <h3 class="feature-name">{{ language === 'zh' ? '国内镜像加速' : 'China Mirror Acceleration' }}</h3>
            <p class="feature-desc">{{ language === 'zh' ? '采用阿里云镜像，安装速度提升数倍' : 'Using Alibaba Cloud mirrors, installation speed improved several times' }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="channels-section">
      <div class="container">
        <h2 class="section-title">{{ language === 'zh' ? '支持的渠道' : 'Supported Channels' }}</h2>
        <p class="section-desc">{{ language === 'zh' ? '通过多种渠道与 AI 助手交互' : 'Interact with AI assistant through multiple channels' }}</p>
        <div class="channels-grid">
          <div v-for="channel in channels" :key="channel.id" class="channel-item">
            <div class="channel-logo" :class="{ 'is-svg': isInlineSvg(channel.logo) }">
              <img v-if="!isInlineSvg(channel.logo)" :src="channel.logo" :alt="channel.name" />
              <span v-else class="channel-svg" v-html="channel.logo"></span>
            </div>
            <span class="channel-name">{{ channel.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="providers-section">
      <div class="container">
        <h2 class="section-title">{{ language === 'zh' ? '支持的模型' : 'Supported Models' }}</h2>
        <p class="section-desc">{{ language === 'zh' ? '支持多种 AI 模型提供商' : 'Multiple AI model providers support' }}</p>
        <div class="providers-grid">
          <div v-for="provider in providers" :key="provider.id" class="provider-item">
            <div class="provider-logo" :class="{ 'is-svg': isInlineSvg(provider.logo) }">
              <img v-if="!isInlineSvg(provider.logo)" :src="provider.logo" :alt="language === 'zh' ? provider.name : provider.nameEn" />
              <span v-else class="provider-svg" v-html="provider.logo"></span>
            </div>
            <span class="provider-name">{{ language === 'zh' ? provider.name : provider.nameEn }}</span>
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

.features-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 40px;
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
  background: linear-gradient(135deg, var(--accent-blue), var(--accent-blue-dim));
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--accent-blue-dim), #4338ca);
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
  background: linear-gradient(135deg, var(--accent-blue), var(--accent-blue-dim));
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

.channels-section {
  padding: 60px 0;
  background: var(--bg-card);
}

.providers-section {
  padding: 60px 0;
  background: var(--bg-primary);
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 8px;
}

.section-desc {
  font-size: 15px;
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 32px;
}

.channels-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
}

.channel-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.channel-logo {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.channel-logo img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.channel-logo.is-svg .channel-svg :deep(svg) {
  width: 28px;
  height: 28px;
}

.channel-name {
  font-size: 13px;
  color: var(--text-secondary);
}

.providers-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
}

.provider-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.provider-logo {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.provider-logo img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.provider-logo.is-svg .provider-svg :deep(svg) {
  width: 28px;
  height: 28px;
}

.provider-name {
  font-size: 13px;
  color: var(--text-secondary);
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
