
/**
 * 
 * @param report the report of levels to check
 * @returns returns -1 if the report is safe, otherwise returns the index of the first unsafe level
 */
function isSingleDirection(report: number[]) {
  let directionChangeIndex = -1;
  const initialDirection: "increasing" | "decreasing" = report[0] - report[1] < 0 ? "increasing" : "decreasing";
  for (let i = 1; i < report.length; i++) {
    if (i === report.length - 1) {
      continue;
    }

    const nextDirection = report[i] - report[i + 1] < 0 ? "increasing" : "decreasing";
    if (nextDirection !== initialDirection) {
      directionChangeIndex = i + 1;
      break;
    }
    console.log("nextDirection", i, report[i], report[i + 1], nextDirection)
  }
  return directionChangeIndex;
}

console.log(isSingleDirection([1, 2, 3, 4, 5]))