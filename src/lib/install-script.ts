import { scenarios, getScenario } from '@/lib/scenarios'

export function generateInstallScript(scenarioId: string): string {
  const scenario = getScenario(scenarioId)
  if (!scenario) {
    return '# Invalid scenario'
  }

  const configJson = JSON.stringify({
    name: `${scenario.name}助手`,
    description: scenario.description,
    systemPrompt: scenario.systemPrompt,
    skills: scenario.skills
  }, null, 2).replace(/"/g, '\\"')

  return `#!/bin/bash

# OpenClaw 一键安装脚本 - ${scenario.name}
# 生成时间: ${new Date().toISOString()}

set -e

echo "🦞 正在安装 OpenClaw..."

# 检查 Node.js 版本
if ! command -v node &> /dev/null; then
  echo "📦 正在安装 Node.js..."
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 22 ]; then
  echo "❌ Node.js 版本需要 22 或更高，当前版本: $(node -v)"
  exit 1
fi

# 安装 OpenClaw
echo "📦 安装 OpenClaw..."
npm install -g openclaw@latest

# 创建配置目录
mkdir -p ~/.openclaw

# 写入配置文件
cat > ~/.openclaw/openclaw.json << 'EOF'
${configJson}
EOF

echo "✅ 安装完成！"
echo ""
echo "📋 下一步："
echo "1. 运行: openclaw onboard --install-daemon"
echo "2. 打开浏览器访问: http://127.0.0.1:18789"
echo "3. 在界面中登录你的 MiniMax 账号"
echo ""
echo "💡 提示: 运行 'openclaw gateway --port 18789' 启动服务"
`
}

export function generateDockerScript(scenarioId: string): string {
  const scenario = getScenario(scenarioId)
  if (!scenario) {
    return '# Invalid scenario'
  }

  const configJson = JSON.stringify({
    name: `${scenario.name}助手`,
    description: scenario.description,
    skills: scenario.skills
  }, null, 2)

  return `#!/bin/bash

# OpenClaw Docker 部署脚本 - ${scenario.name}

# 1. 创建配置目录
mkdir -p ~/.openclaw

# 2. 写入配置
cat > ~/.openclaw/openclaw.json << 'EOF'
${configJson}
EOF

# 3. 启动 Docker 容器
docker run -d \\
  --name openclaw-${scenario.id} \\
  -p 18789:18789 \\
  -v ~/.openclaw:/home/node/.openclaw \\
  openclaw/openclaw:latest

echo "✅ OpenClaw (${scenario.name}) 已启动"
echo "访问 http://127.0.0.1:18789 配置"
`
}