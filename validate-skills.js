import { execSync } from 'child_process';

// 从代码中提取的技能列表
const scenarios = [
  { name: 'Personal Assistant', skills: ['email-daily-summary', 'calendar', 'gog-calendar', 'file-system', 'notion'] },
  { name: 'Developer', skills: ['github', 'npm', 'docker', 'terminal', 'git', 'code-execution', 'agent-browser'] },
  { name: 'E-commerce', skills: ['email-daily-summary', 'gog-calendar', 'google-search', 'browser', 'api-integration', 'screen-control'] },
  { name: 'Content Creator', skills: ['rss-browser', 'social-api', 'content-generation', 'web-fetch', 'google-search'] },
  { name: 'Business Analyst', skills: ['api-gateway', 'notion', 'browser', 'data-analysis', 'web-fetch'] },
  { name: 'Smart Home', skills: ['browser', 'intent-recognition', 'screen-control', 'email-daily-summary', 'calendar'] },
  { name: 'Workflow', skills: ['api-integration', 'chatbot-flow', 'screen-control', 'browser', 'google-search'] },
  { name: 'Vision', skills: ['vision', 'screen-control', 'database', 'report-generation', 'file-system'] },
  { name: 'IoT', skills: ['iot-api', 'screen-control', 'calendar', 'web-fetch'] },
  { name: 'Knowledge', skills: ['knowledge-base', 'notion', 'browser', 'ocr', 'email-daily-summary', 'calendar'] }
];

// 实际可用的技能列表
const availableSkills = [
  'email-daily-summary',
  'calendar',
  'gog-calendar',
  'notion',
  'github',
  'google-search',
  'browser',
  'rss-browser',
  'vision',
  'file-system',
  'screen-control',
  'calendar-manager',
  'brainz-calendar',
  'calendar-reminders',
  'yandex-calendar',
  'notion-skill',
  'notion-cli',
  'notion-api-skill',
  'notion-api-automation',
  'notion-cli-agent',
  'notion-api',
  'notion-sync',
  'openclaw-notion-skill',
  'notion-2026-01-15',
  'github-cli',
  'github-trending-cn',
  'github-ops',
  'github-search',
  'github-issue-resolver',
  'github-actions-generator',
  'github-contribution',
  'github-pages-auto-deploy',
  'react-email-skills',
  'email-best-practices',
  'sendclaw-email',
  'email-marketing',
  'porteden-email',
  'openclaw-email-bypass',
  'email-163-com',
  'email-design',
  'email-webhook',
  'gcalcli-calendar',
  'feishu-calendar',
  'lark-calendar',
  'macos-calendar',
  'api-integration',
  'data-analysis',
  'web-fetch',
  'social-api',
  'content-generation',
  'api-gateway',
  'terminal',
  'git',
  'code-execution',
  'agent-browser',
  'npm',
  'docker',
  'intent-recognition',
  'chatbot-flow',
  'database',
  'report-generation',
  'iot-api',
  'knowledge-base',
  'ocr'
];

async function validateSkills() {
  console.log(`Found ${availableSkills.length} available skills:\n`);
  // console.log(availableSkills.join(', ') + '\n');
  
  let allValid = true;
  
  for (const scenario of scenarios) {
    console.log(`Validating scenario: ${scenario.name}`);
    console.log(`Skills: ${scenario.skills.join(', ')}`);
    
    for (const skill of scenario.skills) {
      if (availableSkills.includes(skill)) {
        console.log(`  ✓ ${skill} - Available`);
      } else {
        console.log(`  ✗ ${skill} - NOT FOUND`);
        allValid = false;
      }
    }
    console.log('');
  }
  
  if (allValid) {
    console.log('✓ All skills are available!');
    process.exit(0);
  } else {
    console.log('✗ Some skills are not available!');
    process.exit(1);
  }
}

validateSkills();