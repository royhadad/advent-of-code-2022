import { monkeys, Monkey, Item } from "./part1";

function main(): void {
  console.log("started");

  for (let roundNumber = 1; roundNumber <= 10000; roundNumber++) {
    console.log(`Starting round ${roundNumber}`);
    monkeys.forEach((monkey) => {
      monkey.items.forEach((item, index) => {
        const itemWithNewWorryLevel = Math.floor(monkey.operation(item));
        monkey.numberOfItemsInspected++;
        if (monkey.test(itemWithNewWorryLevel)) {
          monkeys[monkey.monkeyToThrowToOnTestSuccess].items.push(itemWithNewWorryLevel);
        } else {
          monkeys[monkey.monkeyToThrowToOnTestFailure].items.push(itemWithNewWorryLevel);
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
