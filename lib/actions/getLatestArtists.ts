"use server";

import { createClient } from "@/utils/supabase/server";

export default async function getAllData() {
  const supabase = createClient();
  const { data: artists } = await supabase.from("artists").select("*");
  return artists;
}
