import lcm from "compute-lcm";

export type Item = number;
export type Monkey = {
  items: Item[];
  operation: (oldValue: Item) => Item;
  testDivisibilityBy: number;
  monkeyToThrowToOnTestSuccess: number;
  monkeyToThrowToOnTestFailure: number;
  numberOfItemsInspected: number;
};

// the input, parsed by hand
export const monkeys: Monkey[] = [
  {
    items: [63, 57],
    operation: (oldValue) => oldValue * 11,
    testDivisibilityBy: 7,
    monkeyToThrowToOnTestSuccess: 6,
    monkeyToThrowToOnTestFailure: 2,
    numberOfItemsInspected: 0,
  },
  {
    items: [82, 66, 87, 78, 77, 92, 83],
    operation: (oldValue) => oldValue + 1,
    testDivisibilityBy: 11,
    monkeyToThrowToOnTestSuccess: 5,
    monkeyToThrowToOnTestFailure: 0,
    numberOfItemsInspected: 0,
  },
  {
    items: [97, 53, 53, 85, 58, 54],
    operation: (oldValue) => oldValue * 7,
    testDivisibilityBy: 13,
    monkeyToThrowToOnTestSuccess: 4,
    monkeyToThrowToOnTestFailure: 3,
    numberOfItemsInspected: 0,
  },
  {
    items: [50],
    operation: (oldValue) => oldValue + 3,
    testDivisibilityBy: 3,
    monkeyToThrowToOnTestSuccess: 1,
    monkeyToThrowToOnTestFailure: 7,
    numberOfItemsInspected: 0,
  },
  {
    items: [64, 69, 52, 65, 73],
    operation: (oldValue) => oldValue + 6,
    testDivisibilityBy: 17,
    monkeyToThrowToOnTestSuccess: 3,
    monkeyToThrowToOnTestFailure: 7,
    numberOfItemsInspected: 0,
  },
  {
    items: [57, 91, 65],
    operation: (oldValue) => oldValue + 5,
    testDivisibilityBy: 2,
    monkeyToThrowToOnTestSuccess: 0,
    monkeyToThrowToOnTestFailure: 6,
    numberOfItemsInspected: 0,
  },
  {
    items: [67, 91, 84, 78, 60, 69, 99, 83],
    operation: (oldValue) => oldValue * oldValue,
    testDivisibilityBy: 5,
    monkeyToThrowToOnTestSuccess: 2,
    monkeyToThrowToOnTestFailure: 4,
    numberOfItemsInspected: 0,
  },
  {
    items: [58, 78, 69, 65],
    operation: (oldValue) => oldValue + 7,
    testDivisibilityBy: 19,
    monkeyToThrowToOnTestSuccess: 5,
    monkeyToThrowToOnTestFailure: 1,
    numberOfItemsInspected: 0,
  },
];

function main(): void {
  console.log("started");

  const lowestCommonMultipleOfAllDivisibilityNumbers = lcm(monkeys.map((monkey) => monkey.testDivisibilityBy));

  if (lowestCommonMultipleOfAllDivisibilityNumbers === null || isNaN(lowestCommonMultipleOfAllDivisibilityNumbers)) {
    throw new Error("Could not calculate LCM");
  } else {
    console.log("lowestCommonMultipleOfAllDivisibilityNumbers", lowestCommonMultipleOfAllDivisibilityNumbers);
  }

  for (let roundNumber = 1; roundNumber <= 10000; roundNumber++) {
    console.log(`Starting round ${roundNumber}`);
    if (roundNumber % 100 === 0) {
      console.log("DIVISIBLE BY 100");
    }
    monkeys.forEach((monkey) => {
      monkey.items.forEach((item, index) => {
        const itemWithNewWorryLevel = monkey.operation(item);
        const itemWithNewWorryLevelReduced = itemWithNewWorryLevel % lowestCommonMultipleOfAllDivisibilityNumbers;
        monkey.numberOfItemsInspected++;
        if (itemWithNewWorryLevelReduced % monkey.testDivisibilityBy === 0) {
          monkeys[monkey.monkeyToThrowToOnTestSuccess].items.push(itemWithNewWorryLevelReduced);
        } else {
          monkeys[monkey.monkeyToThrowToOnTestFailure].items.push(itemWithNewWorryLevelReduced);
        }
      });
      monkey.items = [];
    });
  }

  const numberOfItemsEachMonkeyInspectedSortedDesc = monkeys
    .map((monkey) => monkey.numberOfItemsInspected)
    .sort((a, b) => b - a);

  const levelOfMonkeyBusiness =
    numberOfItemsEachMonkeyInspectedSortedDesc[0] * numberOfItemsEachMonkeyInspectedSortedDesc[1];
  const res = levelOfMonkeyBusiness;

  console.log(res);

  console.log("done");
}

main();
