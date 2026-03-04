-- OpenClaw Scenarios Table
CREATE TABLE scenarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scenario Skills Table
CREATE TABLE scenario_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scenario_id UUID REFERENCES scenarios(id) ON DELETE CASCADE NOT NULL,
  skill_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenario_skills ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Anyone can read scenarios" ON scenarios FOR SELECT USING (true);
CREATE POLICY "Anyone can read skills" ON scenario_skills FOR SELECT USING (true);

-- Insert sample data
INSERT INTO scenarios (name, description, icon, is_active) VALUES
  ('电商运营', '处理订单、客服咨询、商品上架', 'shopping-bag', true),
  ('社交媒体运营', '内容创作、发帖、分析数据', 'megaphone', true),
  ('个人助理', '日程管理、提醒、信息整理', 'user', true),
  ('开发助手', '代码编写、调试、Code Review', 'code', true),
  ('研究助手', '文献检索、总结、分析', 'book-open', true);

-- Get scenario IDs and insert skills
-- 电商运营 skills
INSERT INTO scenario_skills (scenario_id, skill_name) VALUES
  ((SELECT id FROM scenarios WHERE name = '电商运营'), 'email'),
  ((SELECT id FROM scenarios WHERE name = '电商运营'), 'google-maps'),
  ((SELECT id FROM scenarios WHERE name = '电商运营'), 'google-search'),
  ((SELECT id FROM scenarios WHERE name = '电商运营'), 'github');

-- 社交媒体运营 skills
INSERT INTO scenario_skills (scenario_id, skill_name) VALUES
  ((SELECT id FROM scenarios WHERE name = '社交媒体运营'), 'github'),
  ((SELECT id FROM scenarios WHERE name = '社交媒体运营'), 'google-search'),
  ((SELECT id FROM scenarios WHERE name = '社交媒体运营'), 'web-fetch');

-- 个人助理 skills
INSERT INTO scenario_skills (scenario_id, skill_name) VALUES
  ((SELECT id FROM scenarios WHERE name = '个人助理'), 'email'),
  ((SELECT id FROM scenarios WHERE name = '个人助理'), 'google-calendar'),
  ((SELECT id FROM scenarios WHERE name = '个人助理'), 'google-maps');

-- 开发助手 skills
INSERT INTO scenario_skills (scenario_id, skill_name) VALUES
  ((SELECT id FROM scenarios WHERE name = '开发助手'), 'github'),
  ((SELECT id FROM scenarios WHERE name = '开发助手'), 'npm'),
  ((SELECT id FROM scenarios WHERE name = '开发助手'), 'docker');

-- 研究助手 skills
INSERT INTO scenario_skills (scenario_id, skill_name) VALUES
  ((SELECT id FROM scenarios WHERE name = '研究助手'), 'web-fetch'),
  ((SELECT id FROM scenarios WHERE name = '研究助手'), 'google-search'),
  ((SELECT id FROM scenarios WHERE name = '研究助手'), 'github'),
  ((SELECT id FROM scenarios WHERE name = '研究助手'), 'arxiv');