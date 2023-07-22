import db from "~/pages/uf/estados.json";

// Shuffle array
export function shuffle(arr: any[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate array[N] with shuffled values
export function randomNums(n: number): number[] {
  let nums = Array(n)
    .fill(0)
    .map((_: any, i: number) => i);
  return shuffle(nums);
}

//
interface States {
  short: string[];
  long: string[];
}

// Query UF data
export function getUfs(): States {
  const uf = db?.map((db) => db.UF);
  const uf_name = db?.map((db) => db.Name);
  const ufs = { short: uf, long: uf_name };
  return ufs;
}

const ufs = getUfs();

// in -> out | PE -> Pernambuco
export function getUFname(uf: string): string | null {
  const i = ufs.short.indexOf(uf);
  if (i !== -1) {
    return ufs.long[i];
  }
  return null;
}
