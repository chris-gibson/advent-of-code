const contents = await Deno.readTextFile("./2024/day02/input.txt");

const MAX_DIFF = 3;

const reports = contents.split("\n");

const safeReports = reports.filter((report) => {
  const levels = report.trim().split(" ").map((level) => +level);
  const reportSafe = isReportSafe(levels);

  if (!reportSafe) {
    console.log(reportSafe, report);
  }
  return reportSafe;
});

console.log("Safe reports:", safeReports.length);

function isReportSafe(report: number[]) {
  const sortedAscReport = [...report].sort((a, b) => a - b);
  const sortedDescReport = [...report].sort((a, b) => b - a);
  const onlyIncreasing = sortedAscReport.every((v, i) => v === report[i]);
  const onlyDecreasing = sortedDescReport.every((v, i) => v === report[i]);
  if (!onlyDecreasing && !onlyIncreasing) {
    return false;
  }

  const safeLevelDiffs = report.reduce((acc, curr, i) => {
    if (!acc || i === 0) {
      return acc;
    }

    const prev = report[i - 1];
    const diff = Math.abs(curr - prev);
    if (diff > MAX_DIFF || diff < 1) {
      return false;
    }
    return acc;
  }, true);

  return safeLevelDiffs;
}