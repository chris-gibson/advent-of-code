import { sortedLeft, sortedRight } from "./part1.ts";

const instanceCounts = sortedLeft.reduce((acc: Record<number, number>, curr) => {
  if (acc[curr]) {
    return acc;
  }

  const instances = sortedRight.filter((r) => r === curr).length;
  if (instances === 0) {
    return acc;
  }
  acc[curr] = instances;
  return acc;

}, {});

const similarity = Object.entries(instanceCounts).reduce((acc, [key, value]) => {
  const thing = +key * value;
  return acc + thing;
}, 0);
console.log("Similarity:", similarity);