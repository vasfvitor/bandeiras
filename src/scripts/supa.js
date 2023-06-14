import { createClient } from "@supabase/supabase-js";

  const supabaseUrl = "https://qqgxhreezrulyhfbtmaj.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxZ3hocmVlenJ1bHloZmJ0bWFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY2OTI5MjIsImV4cCI6MjAwMjI2ODkyMn0.22tytzqJcL7oIkPDLjsEaQGbPGUSefk9EHfTOc9IXIM";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: db, error } = await supabase.from("UF").select("*");

  if (error) {
    throw new Error("Erro ao obter dados do banco de dados: ", error);
  }
 
export { db };

function changeText(i) {
  let lang = document.getElementById("lang");
  db.value = db[i].UF;
  return db.value;
}
//console.log('uf:', ufs);
//console.log('error:', error);
