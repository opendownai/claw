#!/bin/bash
set -euo pipefail

echo "====== OpenClaw Installer (China Mirror) ======"

detect_os() {
    case "$(uname -s 2>/dev/null || true)" in
        Darwin) echo "macos" ;;
        Linux) echo "linux" ;;
        *) echo "unknown" ;;
    esac
}

OS=$(detect_os)

echo ""
echo "====== Step 1: Check/Install Homebrew ======"

install_homebrew_china() {
    echo "Installing Homebrew (China mirror)..."
    # Use China mirror for Homebrew
    /bin/bash -c "$(curl -fsSL https://cdn.opendown.ai/homebrew-install.sh)"
}

if ! command -v brew &> /dev/null; then
    install_homebrew_china
fi

# Add Homebrew to PATH
if [[ -f "/opt/homebrew/bin/brew" ]]; then
    export PATH="/opt/homebrew/bin:$PATH"
elif [[ -f "/usr/local/bin/brew" ]]; then
    export PATH="/usr/local/bin:$PATH"
fi

if command -v brew &> /dev/null; then
    echo "Homebrew version: $(brew --version | head -1)"
else
    echo "Warning: Homebrew not available"
fi

echo ""
echo "====== Step 2: Check/Install Node.js ======"

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
    echo "Installing Node.js 22 via Homebrew..."
    HOMEBREW_NO_AUTO_UPDATE=1 brew install node@22 || true
    brew link node@22 --overwrite --force 2>/dev/null || true
}

install_node_linux() {
    echo "Installing Node.js via nvm (China mirror)..."
    export NVM_DIR="$HOME/.nvm"
    if [ ! -d "$NVM_DIR" ]; then
        # Use China mirror for nvm
        curl -o- https://cdn.opendown.ai/nvm-install.sh | bash
    fi
    if [ -s "$NVM_DIR/nvm.sh" ]; then
        . "$NVM_DIR/nvm.sh"
        nvm install 22
        nvm use 22
    else
        # Fallback to NodeSource China mirror
        curl -fsSL https://cdn.opendown.ai/nodesource-setup.sh | bash
    fi
}

if command -v node &> /dev/null; then
    NODE_VERSION=$(node_major_version || true)
    if [[ -n "$NODE_VERSION" && "$NODE_VERSION" -ge 18 ]]; then
        echo "Node.js $(node -v) found"
    else
        echo "Node.js version too old/upgrading..."
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
    fi
fi

if command -v node &> /dev/null; then
    echo "Node.js version: $(node -v)"
else
    echo "Warning: Node.js installation failed"
fi

echo ""
echo "====== Step 3: Install OpenClaw ======"

# Use China npm mirror
npm config set registry https://registry.npmmirror.com
echo "Using npm mirror: registry.npmmirror.com"

npm install -g openclaw@latest

echo ""
echo "====== Installation Complete! ======"
echo "Run 'openclaw gateway --port 18789' to start"
