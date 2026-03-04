-- OpenClaw Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Templates table (pre-defined templates)
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  config JSONB NOT NULL DEFAULT '{}',
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Claws table (user's deployments)
CREATE TABLE claws (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  config JSONB NOT NULL DEFAULT '{}',
  template_id UUID REFERENCES templates(id),
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills table (capabilities/abilities)
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  claw_id UUID REFERENCES claws(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100),
  config JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Deployments table
CREATE TABLE deployments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  claw_id UUID REFERENCES claws(id) ON DELETE CASCADE NOT NULL,
  provider VARCHAR(50) NOT NULL,
  region VARCHAR(100),
  status VARCHAR(50) DEFAULT 'pending',
  deploy_url TEXT,
  deploy_script TEXT,
  deployed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Shares table
CREATE TABLE shares (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  claw_id UUID REFERENCES claws(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  is_public BOOLEAN DEFAULT false,
  share_url TEXT,
  gist_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE claws ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE deployments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shares ENABLE ROW LEVEL SECURITY;

-- Templates: anyone can view public templates
CREATE POLICY "Public templates are viewable by everyone"
  ON templates FOR SELECT
  USING (is_public = true);

-- Templates: users can insert their own templates
CREATE POLICY "Users can insert their own templates"
  ON templates FOR INSERT
  WITH CHECK (true);

-- Claws: users can only manage their own claws
CREATE POLICY "Users can view own claws"
  ON claws FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own claws"
  ON claws FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own claws"
  ON claws FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own claws"
  ON claws FOR DELETE
  USING (auth.uid() = user_id);

-- Skills: users can only manage skills of their own claws
CREATE POLICY "Users can manage skills of own claws"
  ON skills FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM claws
      WHERE claws.id = skills.claw_id
      AND claws.user_id = auth.uid()
    )
  );

-- Deployments: users can only manage deployments of their own claws
CREATE POLICY "Users can manage deployments of own claws"
  ON deployments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM claws
      WHERE claws.id = deployments.claw_id
      AND claws.user_id = auth.uid()
    )
  );

-- Shares: users can only manage shares of their own claws
CREATE POLICY "Users can manage shares of own claws"
  ON shares FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM claws
      WHERE claws.id = shares.claw_id
      AND claws.user_id = auth.uid()
    )
  );

-- Insert default templates
INSERT INTO templates (name, description, category, config, is_public) VALUES
  ('Basic Node.js', 'Simple Node.js Express app', 'web', '{"runtime": "nodejs", "port": 3000}', true),
  ('Python Flask', 'Python Flask API server', 'api', '{"runtime": "python", "port": 5000}', true),
  ('Static Site', 'Static HTML/CSS/JS site', 'static', '{"type": "static"}', true),
  ('Docker Container', 'Custom Docker container', 'docker', '{"type": "docker"}', true);

-- Create indexes
CREATE INDEX idx_claws_user_id ON claws(user_id);
CREATE INDEX idx_claws_template_id ON claws(template_id);
CREATE INDEX idx_skills_claw_id ON skills(claw_id);
CREATE INDEX idx_deployments_claw_id ON deployments(claw_id);
CREATE INDEX idx_shares_claw_id ON shares(claw_id);
