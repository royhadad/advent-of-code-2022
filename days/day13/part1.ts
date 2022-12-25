import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

type Packet = number | Packet[];
type Pair = { firstPacket: Packet; secondPacket: Packet };

function parseInput(input: string): Pair[] {
  function countHowManyTimesACharacterIsInAString(str: string, char: string): number {
    return str.split("").reduce((acc, next) => {
      if (next === char) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);
  }

  function lineToPacket(line: string): Packet {
    if (!isNaN(Number(line))) {
      return Number(line);
    } else {
      const lineWithoutOuterBrackets = line.slice(1, line.length - 1);
      const packets = [];

      let indicesToSplitAt: number[] = [];
      let leftBracketCount = 0;
      let rightBracketCount = 0;
      for (let i = 0; i < lineWithoutOuterBrackets.length; i++) {
        if (lineWithoutOuterBrackets[i] === "[") {
          leftBracketCount++;
        } else if (lineWithoutOuterBrackets[i] === "]") {
          rightBracketCount++;
        } else if (lineWithoutOuterBrackets[i] === "," && leftBracketCount === rightBracketCount) {
          indicesToSplitAt.push(i);
        }
      }

      const lineSplit = [];
      for (let i = 0; i < indicesToSplitAt.length; i++) {
        lineSplit.push(lineWithoutOuterBrackets.slice(i === 0 ? 0 : indicesToSplitAt[i - 1] + 1, indicesToSplitAt[i]));
      }

      return lineSplit.map(lineToPacket);
    }
  }

  const pairs: Pair[] = [];
  input.split("\n").forEach((line) => {
    if (!pairs[pairs.length - 1]) {
      pairs.push({ firstPacket: lineToPacket(line), secondPacket: [] });
    } else {
      pairs[pairs.length - 1].secondPacket = lineToPacket(line);
    }
  });

  return pairs;
}

console.log("started");

const pairs = parseInput(input);

const res = JSON.stringify(pairs[0]);

console.log(res);

console.log("done");
