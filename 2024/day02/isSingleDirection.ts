
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
      console.log("Report changed direction:", report[i], "->", report[i + 1], "!==", initialDirection);
      directionChangeIndex = i;
      break;
    }
    // console.log("nextDirection", i, report[i], report[i + 1], nextDirection)
  }
  return directionChangeIndex;
}

const report = [1, 2, 4, 3, 5];
const firstPass = isSingleDirection(report);
if (firstPass === -1) {
  console.log("Report is safe:", report)
} else {
  const newReport = report.toSpliced(firstPass, 1);
  console.log("Retrying with:", newReport);
  const secondPass = isSingleDirection(newReport);

  if (secondPass === -1) {
    console.log("Report is safe:", report);
  } else {
    console.log("Report is not safe:", report);
  }
}