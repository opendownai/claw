# claw

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
  <img src="https://img.shields.io/github/issues/opendownai/claw" alt="Issues">
  <img src="https://img.shields.io/github/forks/opendownai/claw" alt="Forks">
  <img src="https://img.shields.io/github/stars/opendownai/claw" alt="Stars">
</p>

**claw** is an open-source deployment platform that lets you package and deploy your applications to any cloud provider with a single command. Self-hostable, free forever.

**Note**: This is an independent project and is not officially affiliated with or endorsed by any "OpenClaw" organization.

## Features

- **One-Click Installation**: Designed for non-technical users - no coding knowledge required
- **Local Deployment**: Optimized for local installation to handle files, calendars, and personal data
- **Multi-Provider AI Models**: Support for MiniMax and Alibaba Cloud Bailian Coding Plan
- **Industry-Specific Templates**: Professionally designed templates for 10+ industries and use cases
- **Multi-Cloud Deployments**: One-click deploy to Aliyun FC, Tencent Cloud, Railway, Zeabur, and more
- **Template System**: Start with pre-built templates or create your own
- **Open Source**: 100% open source, MIT licensed
- **Self-Hostable**: Run your own deployment platform for complete privacy and control

## AI Model Providers

claw supports multiple AI model providers:

- **MiniMax**: Advanced language models including M2.5
- **Alibaba Cloud Bailian**: Qwen series models (qwen3-max, qwen3-coder-plus)
  - Access Coding Plan API at: [阿里云百炼 Coding Plan](https://bailian.console.aliyun.com/cn-beijing/?tab=coding-plan#/efm/detail)
  - Support for multiple Qwen models optimized for different tasks

## Industry Templates

We've professionally designed 10 industry-specific templates to help users quickly get started with OpenClaw in their specific domain:

- **Personal or Enterprise Digital Assistant**: Schedule management, email handling, file organization
- **Multi-Agent Development Team**: Code writing, testing, multi-agent collaboration
- **E-commerce/Live Streaming Digital Customer Service**: Inventory monitoring, price adjustment, order processing
- **Financial Trading Assistant**: Trading execution, position analysis, news monitoring
- **Aviation/Travel Digital Employee**: Ticket booking, check-in, customer service
- **Retail/Restaurant Intelligent Customer Service**: Order processing, problem solving, customer service
- **Content Creation Social Media Operation**: Information gathering, content generation, account management
- **Manufacturing Quality Assurance Employee**: Data entry, report generation, quality inspection assistance
- **Smart Home Manager**: Device control, environment adjustment, automation scenes
- **HR/Admin Document Processing Employee**: Knowledge base management, document processing, process automation

## Quick Start

```bash
# Clone the repository
git clone https://github.com/opendownai/claw.git
cd claw

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

## Configuration

During the setup wizard, you can choose between different AI model providers:

1. **MiniMax** (Recommended)
   - Visit the [MiniMax Console](https://www.minimaxi.com) to create an API key
   - Supports advanced language models

2. **Alibaba Cloud Bailian** (Optional)
   - Access Coding Plan at [阿里云百炼](https://bailian.console.aliyun.com/cn-beijing/?tab=coding-plan#/efm/detail)
   - Get your API key for Qwen series models

## Deployment

### Local Installation (Recommended)

We recommend installing locally to easily handle files, calendars, and other personal data:

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables
4. Run locally: `npm run dev`

### Cloudflare Pages (Cloud Deployment)

1. Fork this repository
2. Connect to Cloudflare Pages
3. Set environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Build command: `npm run build`
5. Output directory: `.next`

### Supabase Setup

Run the SQL in `supabase/schema.sql` to create the required tables.

## Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contributing Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Be respectful and constructive in discussions

## Community

Join our community:

- [GitHub Issues](https://github.com/opendownai/claw/issues) - Report bugs and request features

## Roadmap

- [ ] One-click installer for non-technical users
- [ ] Enhanced local file handling capabilities
- [ ] Calendar integration features
- [ ] Template marketplace
- [ ] More cloud provider integrations (AWS Lambda, GCP Cloud Functions)
- [ ] CI/CD pipeline integration
- [ ] Team collaboration features
- [ ] Deployment analytics

## License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ by the OpenDown Community</p>
