import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    try {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SECRET_KEY;

        if (!supabaseUrl || !supabaseUrl.startsWith('http')) {
            return res.status(500).json({ 
                error: "Invalid or missing SUPABASE_URL environment variable on Vercel. Make sure it starts with https://your-project.supabase.co" 
            });
        }

        if (!supabaseKey) {
            return res.status(500).json({ error: "Missing SUPABASE_SECRET_KEY on Vercel." });
        }

        const supabase = createClient(supabaseUrl, supabaseKey, {
            auth: { persistSession: false }
        });

        let { data: pendingDeposits, error } = await supabase
            .from('deposits')
            .select('*')
            .eq('status', 'PENDING');

        if (error) {
            throw error;
        }

        return res.status(200).json({ 
            success: true, 
            checked_count: pendingDeposits ? pendingDeposits.length : 0,
            message: "Deposit check cycle executed successfully." 
        });

    } catch (err) {
        console.error("Function error:", err.message);
        return res.status(500).json({ error: err.message });
    }
}
