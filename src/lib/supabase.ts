import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          full_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      stories: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          content: string | null;
          media_url: string | null;
          media_type: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          content?: string | null;
          media_url?: string | null;
          media_type?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          content?: string | null;
          media_url?: string | null;
          media_type?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      video_sessions: {
        Row: {
          id: string;
          room_id: string;
          host_id: string;
          title: string;
          description: string | null;
          is_active: boolean;
          max_participants: number;
          created_at: string;
          ended_at: string | null;
        };
        Insert: {
          id?: string;
          room_id: string;
          host_id: string;
          title: string;
          description?: string | null;
          is_active?: boolean;
          max_participants?: number;
          created_at?: string;
          ended_at?: string | null;
        };
        Update: {
          id?: string;
          room_id?: string;
          host_id?: string;
          title?: string;
          description?: string | null;
          is_active?: boolean;
          max_participants?: number;
          created_at?: string;
          ended_at?: string | null;
        };
      };
      ai_training_sessions: {
        Row: {
          id: string;
          user_id: string;
          model_name: string;
          training_data: any;
          status: string;
          progress: number;
          error_message: string | null;
          created_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          model_name: string;
          training_data?: any;
          status?: string;
          progress?: number;
          error_message?: string | null;
          created_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          model_name?: string;
          training_data?: any;
          status?: string;
          progress?: number;
          error_message?: string | null;
          created_at?: string;
          completed_at?: string | null;
        };
      };
    };
  };
};