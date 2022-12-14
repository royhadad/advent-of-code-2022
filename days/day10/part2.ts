import { getValueOfRegisterXAtEveryStartOfCycle } from "./part1";

enum PixelOptions {
  ON = "#",
  OFF = ".",
}
type Pixel = PixelOptions.ON | PixelOptions.OFF;
type Screen = Pixel[][];
const NUMBER_OF_ROWS = 6;
const NUMBER_OF_PIXELS_PER_ROW = 40;

function renderScreenToString(screen: Screen): string {
  return screen.map((row) => row.join("")).join("\n");
}

function createEmptyScreen(): Screen {
  return Array(NUMBER_OF_ROWS)
    .fill(Array(NUMBER_OF_PIXELS_PER_ROW).fill(PixelOptions.OFF))
    .map((row) => [...row]); // spreading each row is necessary to avoid mutating the same array
}

export function main(): void {
  console.log("started");

  const valueOfRegisterXAtEveryStartOfCycle = getValueOfRegisterXAtEveryStartOfCycle();

  const screen: Screen = createEmptyScreen();

  let currentCycle = 0;
  screen.forEach((row, rowIndex) => {
    row.forEach((pixel, pixelIndex) => {
      currentCycle++;
      const valueOfRegisterXAtCurrentCycle = valueOfRegisterXAtEveryStartOfCycle[currentCycle];
      if (valueOfRegisterXAtCurrentCycle >= pixelIndex - 1 && valueOfRegisterXAtCurrentCycle <= pixelIndex + 1) {
        screen[rowIndex][pixelIndex] = PixelOptions.ON;
      }
    });
  });

  const res = renderScreenToString(screen);

  console.log("---------------------------------------");
  console.log(res);
  console.log("---------------------------------------");

  console.log("done");
}

main();
