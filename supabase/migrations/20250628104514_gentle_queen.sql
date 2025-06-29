/*
  # Create stories/posts table

  1. New Tables
    - `stories`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `title` (text)
      - `content` (text)
      - `media_url` (text)
      - `media_type` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `stories` table
    - Add policies for CRUD operations
*/

CREATE TABLE IF NOT EXISTS stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content text,
  media_url text,
  media_type text CHECK (media_type IN ('image', 'video', 'audio')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

-- Anyone can read stories
CREATE POLICY "Stories are viewable by everyone"
  ON stories
  FOR SELECT
  TO authenticated
  USING (true);

-- Users can create their own stories
CREATE POLICY "Users can create own stories"
  ON stories
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own stories
CREATE POLICY "Users can update own stories"
  ON stories
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete their own stories
CREATE POLICY "Users can delete own stories"
  ON stories
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS stories_user_id_idx ON stories(user_id);
CREATE INDEX IF NOT EXISTS stories_created_at_idx ON stories(created_at DESC);