// api/keepalive/route.js
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // Simple query to keep DB alive
  const { data, error } = await supabase
    .from('your_table')
    .select('*')
    .limit(1);

  return new Response(JSON.stringify({ success: !error }), {
    status: error ? 500 : 200,
  });
}