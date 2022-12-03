import fs from "fs";

type GroupOfThreeElves = string[];

function convertItemToPriority(item: string): number {
  const charValue = item.charCodeAt(0);

  if (charValue >= 65 && charValue <= 90) {
    // uppercase
    return charValue - 38;
  } else if (charValue >= 97 && charValue <= 122) {
    // lowercase
    return charValue - 96;
  } else {
    throw new Error("Invalid item");
  }
}

const input = fs.readFileSync("./days/day3/input.txt", "utf-8").trim();

console.log("started");

const rucksacks = input.split("\n");

const groupsOfThreeElves = rucksacks.reduce<GroupOfThreeElves[]>(
  (acc, curr) => {
    if (acc[acc.length - 1].length === 3) {
      acc.push([]);
    }

    acc[acc.length - 1].push(curr);
    return acc;
  },
  [[]]
);

const badges = groupsOfThreeElves.map((groupOfThreeElves) => {
  const elf1Items = new Set(groupOfThreeElves[0]?.split("")) ?? [];
  const elf2Items = new Set(groupOfThreeElves[1]?.split("")) ?? [];
  const elf3Items = new Set(groupOfThreeElves[2]?.split("")) ?? [];

  for (const item of elf1Items) {
    if (elf2Items.has(item) && elf3Items.has(item)) {
      return item;
    }
  }
  throw new Error("did not find overlapping item");
});

const res = badges
  .map(convertItemToPriority)
  .reduce((acc, curr) => acc + curr, 0);

console.log(res);

console.log("done");
