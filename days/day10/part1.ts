import fs from "fs";

export function getValueOfRegisterXAtEveryStartOfCycle(): number[] {
  const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();
  const inputRows = input.split("\n");

  let registerX = 1;
  let currentCycle = 1;
  const valueOfRegisterXAtEveryStartOfCycle: number[] = [1];

  inputRows.forEach((row) => {
    if (row === "noop") {
      valueOfRegisterXAtEveryStartOfCycle.push(registerX);
      currentCycle++;
    } else if (row.startsWith("addx")) {
      valueOfRegisterXAtEveryStartOfCycle.push(registerX);
      currentCycle++;
      valueOfRegisterXAtEveryStartOfCycle.push(registerX);
      currentCycle++;
      const valueToAdd = Number(row.split(" ")[1]);
      registerX += valueToAdd;
    } else {
      throw new Error("Unknown instruction: " + row);
    }
  });

  return valueOfRegisterXAtEveryStartOfCycle;
}

function main(): void {
  console.log("started");

  const valueOfRegisterXAtEveryStartOfCycle = getValueOfRegisterXAtEveryStartOfCycle();

  const signalStrengthAtEveryStartOfCycle = valueOfRegisterXAtEveryStartOfCycle.map(
    (registerX, cycleNumber) => registerX * cycleNumber
  );

  const sumOfSignalStrengthsAtSpecificIndices =
    signalStrengthAtEveryStartOfCycle[20] +
    signalStrengthAtEveryStartOfCycle[60] +
    signalStrengthAtEveryStartOfCycle[100] +
    signalStrengthAtEveryStartOfCycle[140] +
    signalStrengthAtEveryStartOfCycle[180] +
    signalStrengthAtEveryStartOfCycle[220];

  const res = sumOfSignalStrengthsAtSpecificIndices;

  console.log(res);

  console.log("done");
}

// main();
