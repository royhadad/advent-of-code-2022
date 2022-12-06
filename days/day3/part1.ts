import fs from "fs";

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

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

console.log("started");

const rucksacks = input.split("\n");

const overlappingItems = rucksacks.map((rucksack) => {
  const compartment1 = rucksack.substring(0, rucksack.length / 2);
  const compartment2 = rucksack.substring(rucksack.length / 2, rucksack.length);

  const compartment1Items = new Set(compartment1.split(""));
  const compartment2Items = new Set(compartment2.split(""));

  for (const item of compartment1Items) {
    if (compartment2Items.has(item)) {
      return item;
    }
  }
  throw new Error("did not find overlapping item");
});

const res = overlappingItems.map(convertItemToPriority).reduce((acc, curr) => acc + curr, 0);

console.log(res);

console.log("done");
