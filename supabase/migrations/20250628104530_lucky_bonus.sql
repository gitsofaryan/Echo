/*
  # Create AI training sessions table

  1. New Tables
    - `ai_training_sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `model_name` (text)
      - `training_data` (jsonb)
      - `status` (text)
      - `progress` (integer)
      - `error_message` (text)
      - `created_at` (timestamp)
      - `completed_at` (timestamp)

  2. Security
    - Enable RLS on table
    - Add policies for users to manage their own training sessions
*/

CREATE TABLE IF NOT EXISTS ai_training_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  model_name text NOT NULL,
  training_data jsonb,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'training', 'completed', 'failed')),
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  error_message text,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE ai_training_sessions ENABLE ROW LEVEL SECURITY;

-- Users can only see their own training sessions
CREATE POLICY "Users can view own training sessions"
  ON ai_training_sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can create their own training sessions
CREATE POLICY "Users can create own training sessions"
  ON ai_training_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own training sessions
CREATE POLICY "Users can update own training sessions"
  ON ai_training_sessions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete their own training sessions
CREATE POLICY "Users can delete own training sessions"
  ON ai_training_sessions
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index
CREATE INDEX IF NOT EXISTS ai_training_sessions_user_id_idx ON ai_training_sessions(user_id);
CREATE INDEX IF NOT EXISTS ai_training_sessions_status_idx ON ai_training_sessions(status);