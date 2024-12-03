
const contents = await Deno.readTextFile("./2024/day02/puzzleInput.txt");

const MAX_DIFF = 3;

const examples = [
"7 6 4 2 1", //: Safe without removing any level.
"1 2 7 8 9", //: Unsafe regardless of which level is removed.
"9 7 6 2 1", //: Unsafe regardless of which level is removed.
"1 3 2 4 5", //: Safe by removing the second level, 3.
"8 6 4 4 1", //: Safe by removing the third level, 4.
"1 3 6 7 9", //: Safe because the levels are all increasing by 1, 2, or 3.
// Reddit check
// "5 4 3 2 1 2",
// "4 5 4 3 2 1",
// "1 1 2 3 4",
// "1 2 3 3 4",
// "1 2 3 4 4",
// "4 4 3 2 1",
// "4 3 3 2 1",
// "4 3 2 1 1",
// "1 2 6 4 5",
// "6 2 3 4 5",
// "1 2 3 4 9",
// "5 4 3 2 6",
// "1 2 3 4 9",
// "9 2 3 4 5",
// "1 2 3 500 4",
// "1 2 3 0 4",
// "1 9 10 11",
];
const reports = contents.split("\n");

let safeReports = 0;

reports.forEach((report) => {
  const levels = report.trim().split(" ").map((level) => +level);

  const unsafeIndex = doCheck(levels);

  if (unsafeIndex === -1) {
    safeReports++;
  } else {
    let reportSafe = false;
    for (let i = 0; i < levels.length; i++) {
      const newLevels = levels.toSpliced(i, 1);
      const unsafeIndex = doCheck(newLevels);
      if (unsafeIndex === -1) {
        reportSafe = true;
        break;
      }
    }
    if (reportSafe) {
      safeReports++;
    }
  }


});

console.log("Safe reports:", safeReports);

/**
 * 
 * @param levels levels to check against safety rules
 * @returns index of not safe level or -1 if all levels are safe
 */
function doCheck(levels: number[]) {
  let direction;
  for (let i = 0; i < levels.length; i++) {

    if (i + 1 === levels.length) {
      break;
    }
    const current = levels[i];
    const next = levels[i + 1];

    const currentDirection = getDirection(current, next);
    if (currentDirection === "same") {
      return i;
    }
    // * should only happen on first iteration
    direction = direction ?? currentDirection;
    if (direction !== currentDirection) {
      return i;
    }

    const diff = Math.abs(current - next);
    // * the diff < 1 is redundant since we check for same values above but it makes me feel better
    if (diff > MAX_DIFF || diff < 1) {
      return i;
    }

  }
  return -1;
}

function getDirection(level1: number, level2: number) {
  if (level1 === level2) {
    return "same";
  }
  return level1 - level2 < 0 ? "increasing" : "decreasing";
}
