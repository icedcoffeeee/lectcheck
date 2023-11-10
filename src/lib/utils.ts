export function first_uppercase(str: string): string {
  let strs = str.split(" ");
  if (strs.length == 1) return strs[0][0].toUpperCase() + strs[0].slice(1);
  else return strs.map(first_uppercase).join(" ");
}

export function average(nums: number[]) {
  let sum = nums.reduce((a, b) => a + b, 0);
  return Math.round((sum / nums.length || 0) * 100) / 100;
}
