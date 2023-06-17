import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qqgxhreezrulyhfbtmaj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxZ3hocmVlenJ1bHloZmJ0bWFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY2OTI5MjIsImV4cCI6MjAwMjI2ODkyMn0.22tytzqJcL7oIkPDLjsEaQGbPGUSefk9EHfTOc9IXIM";
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const { data: db, error } = await supabase.from("UF").select("*");

if (error) {
  throw new Error(`Erro ao obter dados do banco de dados: ${error}`);
}
/*
let { data: reg } = await supabase.from("UF").select(`
    Region,
    Regions (
      region_br
    )
  `);
console.log(reg[1].Regions.region_br);
*/
export { db };
//console.log('uf:', ufs);
//console.log('error:', error);
