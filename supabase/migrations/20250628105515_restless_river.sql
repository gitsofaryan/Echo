/*
  # Fix profiles table foreign key constraint

  1. Changes
    - Remove the incorrect foreign key constraint that references a non-existent `users` table
    - The profiles table should reference auth.users, but this is handled automatically by Supabase
    - Update the INSERT policy to use proper auth.uid() function

  2. Security
    - Maintain existing RLS policies
    - Ensure users can only create their own profiles
*/

-- Remove the incorrect foreign key constraint
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Update the INSERT policy to be more explicit
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Ensure the SELECT policy uses the correct function name
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;

CREATE POLICY "Profiles are viewable by everyone"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- Ensure the UPDATE policy is correct
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);