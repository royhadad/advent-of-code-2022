import fs from "fs";
import { Stack } from "typescript-collections";

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

console.log("started");

type Position = Stack<string>[];

const positionWithArrays = [
  [], // to offset starting from 0
  ["N", "R", "J", "T", "Z", "B", "D", "F"],
  ["H", "J", "N", "S", "R"],
  ["Q", "F", "Z", "G", "J", "N", "R", "C"],
  ["Q", "T", "R", "G", "N", "V", "F"],
  ["F", "Q", "T", "L"],
  ["N", "G", "R", "B", "Z", "W", "C", "Q"],
  ["M", "H", "N", "S", "L", "C", "F"],
  ["J", "T", "M", "Q", "N", "D"],
  ["S", "G", "P"],
];

function convertPositionWithArraysToPosition(
  positionWithArrays: string[][]
): Position {
  const position: Position = [];
  positionWithArrays.forEach((row, rowIndex) => {
    const rowStack = new Stack<string>();
    row.reverse().forEach((cargo: string) => {
      rowStack.push(cargo);
    });
    position.push(rowStack);
  });

  return position;
}

const position: Position =
  convertPositionWithArraysToPosition(positionWithArrays);

type Instruction = {
  amount: number;
  from: number;
  to: number;
};

const instructions = input.split("\n").map<Instruction>((rawInstruction) => {
  const inputSplit = rawInstruction.split(" ");
  return {
    amount: Number(inputSplit[1]),
    from: Number(inputSplit[3]),
    to: Number(inputSplit[5]),
  };
});

function moveCargosAccordingToInstruction(
  position: Position,
  instruction: Instruction
): void {
  const cargosToMove: string[] = [];
  for (let i = 0; i < instruction.amount; i++) {
    const singleCargoToMove = position[instruction.from].pop();
    if (!singleCargoToMove) {
      throw new Error(
        `No cargo to move from ${instruction.from} to ${instruction.to}`
      );
    }
    cargosToMove.push(singleCargoToMove);
  }
  cargosToMove.reverse().forEach((cargo) => {
    position[instruction.to].push(cargo);
  });
}

instructions.forEach((instruction) => {
  moveCargosAccordingToInstruction(position, instruction);
});

const positionWithoutTheFirstStack = position.slice(1); // because we offset the starting from 0
const topCargoOfEachStack = positionWithoutTheFirstStack.map((stack) =>
  stack.peek()
);

const res = topCargoOfEachStack.join("");

console.log(res);

console.log("done");
