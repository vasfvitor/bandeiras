export function shuffle(arr: any[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function randomNums(n: number): number[] {
  let nums = Array(n)
    .fill(0)
    .map((_: any, i: number) => i);
  return shuffle(nums);
}