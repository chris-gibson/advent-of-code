const contents = await Deno.readTextFile("./2024/day02.txt");

const MAX_DIFF = 3;

const reports = contents.split("\n");

// const safeReports = reports.filter((report) => {
const safeReports = ["66 67 68 71 72 75"].filter((report) => {
  const levels = report.trim().split(" ").map((level) => +level);


  const reportSafe = isReportSafe(levels);
  if (reportSafe === true) {
    return true;
  }

  console.log("Trying again", levels, levels.toSpliced(reportSafe, 1))
  const isSafe2 = isReportSafe(levels.toSpliced(reportSafe, 1))

  return isSafe2 === true;
});

console.log("Safe reports:", safeReports.length);


type ReportAccumulator = {
  safe: boolean;
  tolerances: number;
};
// when checking direction change we need to remove the bad delta from the report and rerun it
// because the next direction change back will also be considered unsafe
export function isReportSafe(report: number[]) {
  let direction: "increasing" | "decreasing" = report[0] - report[1] < 0 ? "decreasing" : "increasing";

  let badIndex = -1;
  for (let i = 0; i < report.length; i++) {
    const curr = report[i];
    const prev = report[i - 1];
    if (curr === prev) {
        badIndex = i;
        break;
    } else {
      // something here is never going to work
      const localDirection = curr - prev < 0 ? "decreasing" : "increasing";
      direction = localDirection;
      if (direction !== localDirection) {
        badIndex = i;
        break;
      }
    }

    if (areLevelDistancesSafe(curr, prev)) {
      continue;
    } else {
      badIndex = i;
      break;
    }
  }

  if (badIndex > -1) {
    return badIndex;
  }
  return true;
}

function areLevelDistancesSafe(level1: number, level2: number) {
  const diff = Math.abs(level1 - level2);
  if (diff > MAX_DIFF || diff < 1) {
    return false;
  }
  return true;
}
