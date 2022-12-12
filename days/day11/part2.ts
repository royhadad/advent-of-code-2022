import lcm from "compute-lcm";
import { calculateLevelOfMonkeyBusiness, Monkey, monkeys } from "./part1";

function getLowestCommonMultipleOfAllDivisibilityNumbers(monkeys: Monkey[]): number {
  const lowestCommonMultipleOfAllDivisibilityNumbers = lcm(monkeys.map((monkey) => monkey.testDivisibilityBy));
  if (lowestCommonMultipleOfAllDivisibilityNumbers === null || isNaN(lowestCommonMultipleOfAllDivisibilityNumbers)) {
    throw new Error("Could not calculate LCM");
  } else {
    console.log("lowestCommonMultipleOfAllDivisibilityNumbers", lowestCommonMultipleOfAllDivisibilityNumbers);
  }
  return lowestCommonMultipleOfAllDivisibilityNumbers;
}

function main(): void {
  console.log("started");

  const lowestCommonMultipleOfAllDivisibilityNumbers = getLowestCommonMultipleOfAllDivisibilityNumbers(monkeys);

  for (let roundNumber = 1; roundNumber <= 10000; roundNumber++) {
    console.log(`Starting round ${roundNumber}`);
    monkeys.forEach((monkey) => {
      monkey.items.forEach((item, index) => {
        // because only the modulo of the item is relevant, we can take only the modulo of the item by the LCM of all divisibility numbers
        // this does not affect the result because of modular arithmetic
        // "I have discovered a truly marvelous proof of this, which this margin is too narrow to contain." - Pierre de Fermat
        const itemWithNewWorryLevel = monkey.operation(item) % lowestCommonMultipleOfAllDivisibilityNumbers;
        monkey.numberOfItemsInspected++;
        if (itemWithNewWorryLevel % monkey.testDivisibilityBy === 0) {
          monkeys[monkey.monkeyToThrowToOnTestSuccess].items.push(itemWithNewWorryLevel);
        } else {
          monkeys[monkey.monkeyToThrowToOnTestFailure].items.push(itemWithNewWorryLevel);
        }
      });
      monkey.items = [];
    });
  }

  const res = calculateLevelOfMonkeyBusiness(monkeys);

  console.log(res);

  console.log("done");
}

main();
