import fs from "fs";

console.log("started");

// a-z
type Square = number; // 0-25
type Map = Square[][];

type Position = {
  x: number;
  y: number;
};

function parseInputToMap(input: string): { map: Map; start: Position; end: Position } {
  const start: Position = { x: -1, y: -1 };
  const end: Position = { x: -1, y: -1 };

  const map: Map = input.split("\n").map((line, yIndex) =>
    line.split("").map((char, xIndex) => {
      if (char === "S") {
        start.x = xIndex;
        start.y = yIndex;
        return 0;
      }
      if (char === "E") {
        end.x = xIndex;
        end.y = yIndex;
        return 25;
      }
      return char.charCodeAt(0) - 97;
    })
  );

  if (start.x === -1 || start.y === -1 || end.x === -1 || end.y === -1) {
    throw new Error("start or end not found");
  }

  return { map, start, end };
}

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();
const { map, start, end } = parseInputToMap(input);

// TODO find path with least steps
// only one step up at a time at most

const res = map;

console.log(res);

console.log("done");
