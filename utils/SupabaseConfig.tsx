import { createClient } from '@supabase/supabase-js'

const supabaseURL = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseAPIKey = process.env.EXPO_PUBLIC_SUPABASE_API_KEY

if (!supabaseURL || !supabaseAPIKey) {
    throw new Error('Missing Supabase environment variables')
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseURL, supabaseAPIKey)