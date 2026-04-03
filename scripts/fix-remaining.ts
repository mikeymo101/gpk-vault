import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const BASE = "https://www.geepeekay.com/gallery";

const fixes: Record<string, string> = {
  "500a": `${BASE}/os12/os12_500a.jpg`,
  "500b": `${BASE}/os12/os12_500b.jpg`,
  "581a": `${BASE}/os15/os15_581a.jpg`,
  "581b": `${BASE}/os15/os15_581b.jpg`,
  "582a": `${BASE}/os15/os15_582a.jpg`,
  "582b": `${BASE}/os15/os15_582b.jpg`,
};

async function fix() {
  for (const [num, url] of Object.entries(fixes)) {
    const { data: card } = await supabase.from("cards").select("id").eq("number", num).single();
    if (!card) { console.log(`  #${num} not found`); continue; }
    const res = await fetch(url, { method: "HEAD" });
    if (!res.ok) { console.log(`  #${num} → ${res.status}: ${url}`); continue; }
    await supabase.from("cards").update({ image_url_a: url }).eq("id", card.id);
    console.log(`  ✓ #${num} fixed`);
  }
}
fix();
