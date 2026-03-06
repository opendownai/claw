#!/bin/bash
set -euo pipefail

API_KEY=""
PROVIDER="minimax"
SKILLS=""
CHANNELS=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        --api-key)
            API_KEY="$2"
            shift 2
            ;;
        --provider)
            PROVIDER="$2"
            shift 2
            ;;
        --skills)
            SKILLS="$2"
            shift 2
            ;;
        --channels)
            CHANNELS="$2"
            shift 2
            ;;
        *)
            shift
            ;;
    esac
done

if [[ -z "$API_KEY" ]]; then
    echo "Error: --api-key is required"
    echo "Usage: curl -fsSL https://cdn.opendown.ai/install.sh | bash -s -- --api-key YOUR_API_KEY --provider minimax"
    exit 1
fi

if [[ -n "$CHANNELS" ]]; then
    CHANNELS_DECODED=$(echo "$CHANNELS" | base64 -d 2>/dev/null || echo "{}")
else
    CHANNELS_DECODED="{}"
fi

echo "====== OpenClaw Installer ======"
echo "Provider: $PROVIDER"

echo ""
echo "====== Step 1: Check Node.js ======"

detect_os() {
    case "$(uname -s 2>/dev/null || true)" in
        Darwin) echo "macos" ;;
        Linux) echo "linux" ;;
        *) echo "unknown" ;;
    esac
}

node_major_version() {
    if ! command -v node &> /dev/null; then
        return 1
    fi
    local version major
    version="$(node -v 2>/dev/null || true)"
    major="${version#v}"
    major="${major%%.*}"
    if [[ "$major" =~ ^[0-9]+$ ]]; then
        echo "$major"
        return 0
    fi
    return 1
}

install_node_macos() {
    if command -v brew &> /dev/null; then
        brew install node@22
        brew link node@22 --overwrite --force 2>/dev/null || true
    else
        echo "Installing Node.js via nvm..."
        export NVM_DIR="$HOME/.nvm"
        if [ ! -d "$NVM_DIR" ]; then
            curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
        fi
        if [ -s "$NVM_DIR/nvm.sh" ]; then
            export NVM_DIR="$HOME/.nvm"
            . "$NVM_DIR/nvm.sh"
            nvm install 22
            nvm use 22
        else
            echo "Error: Failed to install nvm. Please install Node.js manually: https://nodejs.org"
            exit 1
        fi
    fi
}

install_node_linux() {
    if command -v curl &> /dev/null; then
        echo "Installing Node.js via nvm..."
        export NVM_DIR="$HOME/.nvm"
        if [ ! -d "$NVM_DIR" ]; then
            curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
        fi
        if [ -s "$NVM_DIR/nvm.sh" ]; then
            export NVM_DIR="$HOME/.nvm"
            . "$NVM_DIR/nvm.sh"
            nvm install 22
            nvm use 22
        else
            echo "Installing Node.js via NodeSource..."
            if command -v apt-get &> /dev/null; then
                curl -fsSL https://deb.nodesource.com/setup_22.x | bash -E
                apt-get install -y nodejs
            elif command -v dnf &> /dev/null; then
                curl -fsSL https://rpm.nodesource.com/setup_22.x | bash -E
                dnf install -y nodejs
            else
                echo "Error: Could not install Node.js automatically. Please install manually: https://nodejs.org"
                exit 1
            fi
        fi
    else
        echo "Error: curl not found. Please install Node.js manually: https://nodejs.org"
        exit 1
    fi
}

OS=$(detect_os)

if command -v node &> /dev/null; then
    NODE_VERSION=$(node_major_version || true)
    if [[ -n "$NODE_VERSION" && "$NODE_VERSION" -ge 18 ]]; then
        echo "Node.js $(node -v) found"
    else
        echo "Node.js version too old, upgrading..."
        if [[ "$OS" == "macos" ]]; then
            install_node_macos
        elif [[ "$OS" == "linux" ]]; then
            install_node_linux
        fi
    fi
else
    echo "Node.js not found, installing..."
    if [[ "$OS" == "macos" ]]; then
        install_node_macos
    elif [[ "$OS" == "linux" ]]; then
        install_node_linux
    else
        echo "Error: Unsupported OS. Please install Node.js manually: https://nodejs.org"
        exit 1
    fi
fi
echo "Node.js version: $(node -v)"

echo ""
echo "====== Step 2: Install OpenClaw ======"
npm install -g openclaw@latest

echo ""
echo "====== Step 3: Create Config ======"
mkdir -p ~/.openclaw

if [[ "$PROVIDER" == "minimax" ]]; then
    PROVIDER_CONFIG="minimax-cn"
    BASE_URL="https://api.minimax.io/anthropic"
    MODEL="MiniMax-M2.5"
    MODEL_PRIMARY="minimax/MiniMax-M2.5"
elif [[ "$PROVIDER" == "aliyun" ]]; then
    PROVIDER_CONFIG="bailian"
    BASE_URL="https://coding.dashscope.aliyuncs.com/v1"
    MODEL="qwen3-max-thinking"
    MODEL_PRIMARY="qwen3-max"
elif [[ "$PROVIDER" == "iflow" ]]; then
    PROVIDER_CONFIG="iflow"
    BASE_URL="https://apis.iflow.cn/v1"
    MODEL="TBStars2-200B-A13B"
    MODEL_PRIMARY="iflow/TBStars2-200B-A13B"
fi

cat > ~/.openclaw/openclaw.json << EOF
{
  "meta": {
    "lastTouchedVersion": "2026.3.1",
    "lastTouchedAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  },
  "wizard": {
    "lastRunAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
    "lastRunVersion": "2026.3.1"
  },
  "update": {
    "channel": "stable"
  },
  "auth": {
    "profiles": {
      "${PROVIDER_CONFIG}:default": {
        "provider": "${PROVIDER_CONFIG}",
        "mode": "api_key"
      }
    }
  },
  "models": {
    "mode": "merge",
    "providers": {
      "${PROVIDER}": {
        "baseUrl": "${BASE_URL}",
        "apiKey": "${API_KEY}",
        "api": "anthropic-messages",
        "models": [
          {
            "id": "${MODEL}",
            "name": "${MODEL}",
            "reasoning": false,
            "input": ["text"],
            "cost": { "input": 0, "output": 0, "cacheRead": 0, "cacheWrite": 0 },
            "contextWindow": 1000000,
            "maxTokens": 65536
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "${MODEL_PRIMARY}"
      }
    }
  },
  "commands": {
    "native": "auto",
    "nativeSkills": "auto",
    "restart": true,
    "ownerDisplay": "raw"
  },
  "hooks": {
    "internal": {
      "enabled": true,
      "entries": {
        "boot-md": { "enabled": true },
        "bootstrap-extra-files": { "enabled": true },
        "command-logger": { "enabled": true },
        "session-memory": { "enabled": true }
      }
    }
  },
  "channels": $CHANNELS_DECODED,
  "gateway": {
    "port": 18789,
    "mode": "local",
    "bind": "loopback",
    "auth": {
      "mode": "token",
      "token": "CHANGE_THIS_TOKEN"
    },
    "tailscale": {
      "mode": "off",
      "resetOnExit": false
    },
    "http": {
      "endpoints": {
        "chatCompletions": {
          "enabled": true
        }
      }
    }
  },
  "skills": {
    "install": {
      "nodeManager": "npm"
    }
  },
  "plugins": {
    "entries": {
      "telegram": {
        "enabled": true
      }
    }
  }
}
EOF

echo "Config created at ~/.openclaw/openclaw.json"

if [[ -n "$SKILLS" ]]; then
    echo ""
    echo "====== Step 3.5: Install Skills ======"
    IFS=',' read -ra SKILL_ARRAY <<< "$SKILLS"
    for skill in "${SKILL_ARRAY[@]}"; do
        echo "Installing skill: $skill"
        npx clawhub@latest install "$skill" || true
    done
fi

echo ""
echo "====== Step 4: Start Service ======"
openclaw gateway --port 18789 > ~/.openclaw/gateway.log 2>&1 &
echo "OpenClaw gateway started"
echo "Server running at: http://127.0.0.1:18789"

echo ""
echo "====== Installation Complete! ======"
echo "Please open http://127.0.0.1:18789 in your browser"
