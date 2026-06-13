import { createClient } from "@supabase/supabase-js/dist/index.cjs";

const supabseurl = process.env.SUPABASE_URL;
const supabasekey = process.env.SUPABASE_KEY ;

export const supabaseAdmin = createClient(supabseurl, supabasekey);