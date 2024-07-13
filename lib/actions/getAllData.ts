"use server";

import { createClient } from "@/utils/supabase/server";

export default async function getAllData() {
  const supabase = createClient();
  const { data: songs } = await supabase.from("songs").select();

  return JSON.stringify(songs, null, 2);
}
