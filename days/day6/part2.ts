import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

console.log("started");

const NUMBER_OF_UNIQUE_CHARACTERS_NEEDED = 14;
const inputAsArray = input.split("");

let firstInstanceWhereTheLast4CharactersAreUnique: number | undefined =
  undefined;
for (
  let i = 0;
  i <= inputAsArray.length - NUMBER_OF_UNIQUE_CHARACTERS_NEEDED;
  i++
) {
  const fourLetterSlice = inputAsArray.slice(
    i,
    i + NUMBER_OF_UNIQUE_CHARACTERS_NEEDED
  );
  if (new Set(fourLetterSlice).size === fourLetterSlice.length) {
    // no duplicates
    firstInstanceWhereTheLast4CharactersAreUnique =
      i + NUMBER_OF_UNIQUE_CHARACTERS_NEEDED;
    break;
  }
}

const res = firstInstanceWhereTheLast4CharactersAreUnique;

console.log(res);

console.log("done");
