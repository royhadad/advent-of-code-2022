export type Item = bigint;
export type Monkey = {
  items: Item[];
  operation: (oldValue: Item) => Item;
  test: (oldValue: Item) => boolean;
  monkeyToThrowToOnTestSuccess: number;
  monkeyToThrowToOnTestFailure: number;
  numberOfItemsInspected: number;
};

// the input, parsed by hand
export const monkeysWithBigIntItems: Monkey[] = [
  {
    items: [63, 57].map(BigInt),
    operation: (oldValue) => oldValue * 11n,
    test: (oldValue) => oldValue % 7n === 0n,
    monkeyToThrowToOnTestSuccess: 6,
    monkeyToThrowToOnTestFailure: 2,
    numberOfItemsInspected: 0,
  },
  {
    items: [82, 66, 87, 78, 77, 92, 83].map(BigInt),
    operation: (oldValue) => oldValue + 1n,
    test: (oldValue) => oldValue % 11n === 0n,
    monkeyToThrowToOnTestSuccess: 5,
    monkeyToThrowToOnTestFailure: 0,
    numberOfItemsInspected: 0,
  },
  {
    items: [97, 53, 53, 85, 58, 54].map(BigInt),
    operation: (oldValue) => oldValue * 7n,
    test: (oldValue) => oldValue % 13n === 0n,
    monkeyToThrowToOnTestSuccess: 4,
    monkeyToThrowToOnTestFailure: 3,
    numberOfItemsInspected: 0,
  },
  {
    items: [50].map(BigInt),
    operation: (oldValue) => oldValue + 3n,
    test: (oldValue) => oldValue % 3n === 0n,
    monkeyToThrowToOnTestSuccess: 1,
    monkeyToThrowToOnTestFailure: 7,
    numberOfItemsInspected: 0,
  },
  {
    items: [64, 69, 52, 65, 73].map(BigInt),
    operation: (oldValue) => oldValue + 6n,
    test: (oldValue) => oldValue % 17n === 0n,
    monkeyToThrowToOnTestSuccess: 3,
    monkeyToThrowToOnTestFailure: 7,
    numberOfItemsInspected: 0,
  },
  {
    items: [57, 91, 65].map(BigInt),
    operation: (oldValue) => oldValue + 5n,
    test: (oldValue) => oldValue % 2n === 0n,
    monkeyToThrowToOnTestSuccess: 0,
    monkeyToThrowToOnTestFailure: 6,
    numberOfItemsInspected: 0,
  },
  {
    items: [67, 91, 84, 78, 60, 69, 99, 83].map(BigInt),
    operation: (oldValue) => oldValue * oldValue,
    test: (oldValue) => oldValue % 5n === 0n,
    monkeyToThrowToOnTestSuccess: 2,
    monkeyToThrowToOnTestFailure: 4,
    numberOfItemsInspected: 0,
  },
  {
    items: [58, 78, 69, 65].map(BigInt),
    operation: (oldValue) => oldValue + 7n,
    test: (oldValue) => oldValue % 19n === 0n,
    monkeyToThrowToOnTestSuccess: 5,
    monkeyToThrowToOnTestFailure: 1,
    numberOfItemsInspected: 0,
  },
];

function main(): void {
  console.log("started");

  for (let roundNumber = 1; roundNumber <= 10000; roundNumber++) {
    console.log(`Starting round ${roundNumber}`);
    if (roundNumber % 100 === 0) {
      console.log("DIVISIBLE BY 100");
    }
    monkeysWithBigIntItems.forEach((monkey) => {
      monkey.items.forEach((item, index) => {
        const itemWithNewWorryLevel = monkey.operation(item);
        monkey.numberOfItemsInspected++;
        if (monkey.test(itemWithNewWorryLevel)) {
          monkeysWithBigIntItems[monkey.monkeyToThrowToOnTestSuccess].items.push(itemWithNewWorryLevel);
        } else {
          monkeysWithBigIntItems[monkey.monkeyToThrowToOnTestFailure].items.push(itemWithNewWorryLevel);
        }
      });
      monkey.items = [];
    });
  }

  const numberOfItemsEachMonkeyInspectedSortedDesc = monkeysWithBigIntItems
    .map((monkey) => monkey.numberOfItemsInspected)
    .sort((a, b) => b - a);

  const levelOfMonkeyBusiness =
    numberOfItemsEachMonkeyInspectedSortedDesc[0] * numberOfItemsEachMonkeyInspectedSortedDesc[1];
  const res = levelOfMonkeyBusiness;

  console.log(res);

  console.log("done");
}

main();
