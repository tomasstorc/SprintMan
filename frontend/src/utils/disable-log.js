export default function disableLog() {
  const consoleLog = false;
  if (!consoleLog) {
    console.log = function () {};
  }
}
