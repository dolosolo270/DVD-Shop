// Initialize Supabase Client CDN
const SUPABASE_URL = "lujaxhghiogtgvgkluap";
const SUPABASE_ANON_KEY = "sb_publishable_ZxUkwgRtjFDTmM8qZF9e6w_X7Ue0PU-";

// Create global supabase client instance
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper function to get or set a mock current user handle for testing
function getCurrentUserHandle() {
    let handle = localStorage.getItem('dvd_current_user');
    if (!handle) {
        handle = 'Operative_' + Math.floor(1000 + Math.random() * 9000);
        localStorage.setItem('dvd_current_user', handle);
    }
    return handle;
}
