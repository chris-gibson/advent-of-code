const fileContents = await Deno.readTextFile("./puzzleInput.txt");
const rows = fileContents.split("\n");
const left: number[] = [];
const right: number[] = [];
rows.forEach((row) => {
  const thing = row.split("   ");
  left.push(+thing[0]);
  right.push(+thing[1]);
});

export const sortedLeft = left.sort((a, b) => a - b);
export const sortedRight = right.sort((a, b) => a - b);

const value = sortedLeft.reduce((acc, curr, i) => {
  const currRight = sortedRight[i];
  const distance = currRight - curr;

  return acc + Math.abs(distance);
}, 0);

console.log(value);