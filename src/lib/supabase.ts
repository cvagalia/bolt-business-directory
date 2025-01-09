import { createClient } from '@supabase/supabase-js';

// Get Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://snwfrexsasaefhoueexh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNud2ZyZXhzYXNhZWZob3VlZXhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzODg2MTgsImV4cCI6MjA1MTk2NDYxOH0.1wX7EtAeH7X_iwEDBS6KPPLk8TBUzNvip619yi7wy1o';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
