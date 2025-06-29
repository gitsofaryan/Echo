/*
  # Create video chat sessions table

  1. New Tables
    - `video_sessions`
      - `id` (uuid, primary key)
      - `room_id` (text, unique)
      - `host_id` (uuid, references profiles)
      - `title` (text)
      - `description` (text)
      - `is_active` (boolean)
      - `max_participants` (integer)
      - `created_at` (timestamp)
      - `ended_at` (timestamp)

    - `session_participants`
      - `id` (uuid, primary key)
      - `session_id` (uuid, references video_sessions)
      - `user_id` (uuid, references profiles)
      - `joined_at` (timestamp)
      - `left_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add appropriate policies
*/

CREATE TABLE IF NOT EXISTS video_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id text UNIQUE NOT NULL,
  host_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  is_active boolean DEFAULT true,
  max_participants integer DEFAULT 10,
  created_at timestamptz DEFAULT now(),
  ended_at timestamptz
);

CREATE TABLE IF NOT EXISTS session_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES video_sessions(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  joined_at timestamptz DEFAULT now(),
  left_at timestamptz,
  UNIQUE(session_id, user_id)
);

ALTER TABLE video_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_participants ENABLE ROW LEVEL SECURITY;

-- Video sessions policies
CREATE POLICY "Video sessions are viewable by everyone"
  ON video_sessions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create video sessions"
  ON video_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Hosts can update their sessions"
  ON video_sessions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = host_id);

-- Session participants policies
CREATE POLICY "Session participants are viewable by session members"
  ON session_participants
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM session_participants sp
      WHERE sp.session_id = session_participants.session_id
      AND sp.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can join sessions"
  ON session_participants
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their participation"
  ON session_participants
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS video_sessions_host_id_idx ON video_sessions(host_id);
CREATE INDEX IF NOT EXISTS video_sessions_room_id_idx ON video_sessions(room_id);
CREATE INDEX IF NOT EXISTS session_participants_session_id_idx ON session_participants(session_id);
CREATE INDEX IF NOT EXISTS session_participants_user_id_idx ON session_participants(user_id);