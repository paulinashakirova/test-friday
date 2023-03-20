import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://gsdsqdbpihmzyobxozge.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZHNxZGJwaWhtenlvYnhvemdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgxMjA3NDEsImV4cCI6MTk5MzY5Njc0MX0.5qmqeJxWforCXv8ocPNP-lk87ruAywBBAvAV97Dy_94'
);
