import fs from "fs";

const input = fs.readFileSync("./days/day4/input.txt", "utf-8").trim();

console.log("started");

type ElfPair = {
  elf1: { start: number; end: number };
  elf2: { start: number; end: number };
};

// parse input
const elfPairs = input.split("\n").map<ElfPair>((s) => {
  const [elf1String, elf2String] = s.split(",");
  return {
    elf1: {
      start: Number(elf1String.split("-")[0]),
      end: Number(elf1String.split("-")[1]),
    },
    elf2: {
      start: Number(elf2String.split("-")[0]),
      end: Number(elf2String.split("-")[1]),
    },
  };
});

// calculate result
let numberOfPairsWhereOneElfRangeFullyOverlapsTheOther = 0;

elfPairs.forEach((elfPair) => {
  const { elf1, elf2 } = elfPair;

  if (elf1.start >= elf2.start && elf1.end <= elf2.end) {
    numberOfPairsWhereOneElfRangeFullyOverlapsTheOther++;
  } else if (elf2.start >= elf1.start && elf2.end <= elf1.end) {
    numberOfPairsWhereOneElfRangeFullyOverlapsTheOther++;
  }
});

const res = numberOfPairsWhereOneElfRangeFullyOverlapsTheOther;

console.log(res);

console.log("done");
