import { createClient } from "@supabase/supabase-js";
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
async function check() {
  const { data, error } = await s.from("sets").select("name, description, release_date").limit(3);
  console.log("Error:", error);
  console.log(JSON.stringify(data, null, 2));
}
check();
