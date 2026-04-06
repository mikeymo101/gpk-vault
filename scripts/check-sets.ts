import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function check() {
  const { data: sets } = await supabase.from("sets").select("id, name, total_cards").order("year");
  for (const set of sets ?? []) {
    const { count } = await supabase.from("cards").select("id", { count: "exact", head: true }).eq("set_id", set.id);
    console.log(`${set.name}: total_cards=${set.total_cards}, actual cards=${count}`);
  }
}
check();
