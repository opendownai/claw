# OpenClaw

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
  <img src="https://img.shields.io/github/issues/opendownai/claw" alt="Issues">
  <img src="https://img.shields.io/github/forks/opendownai/claw" alt="Forks">
  <img src="https://img.shields.io/github/stars/opendownai/claw" alt="Stars">
</p>

OpenClaw is an open-source deployment platform that lets you package and deploy your applications to any cloud provider with a single command. Self-hostable, free forever.

## Features

- **Multi-Cloud Deployments**: One-click deploy to Aliyun FC, Tencent Cloud, Railway, Zeabur, and more
- **Template System**: Start with pre-built templates or create your own
- **Open Source**: 100% open source, MIT licensed
- **Self-Hostable**: Run your own deployment platform
- **Community Driven**: Built by developers, for developers

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

## Deployment

### Cloudflare Pages (Recommended)

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

- [Discord](https://discord.gg/openclaw) - Chat with other developers
- [GitHub Issues](https://github.com/opendownai/claw/issues) - Report bugs and request features

## Roadmap

- [ ] Template marketplace
- [ ] More cloud provider integrations (AWS Lambda, GCP Cloud Functions)
- [ ] CI/CD pipeline integration
- [ ] Team collaboration features
- [ ] Deployment analytics

## License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ by the OpenClaw Community</p>
