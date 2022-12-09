import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

console.log("started");

function getTreeHeightAtPosition(treeGrid: TreeGrid, position: Position): number {
  const height = treeGrid[position.row]?.[position.col];
  if (height === undefined) {
    throw new Error("Out of bounds!");
  }
  return height;
}

function isTreeVisibleFromTheLeft(treeGrid: TreeGrid, position: Position): boolean {
  for (let currentCol = position.col - 1; currentCol >= 0; currentCol--) {
    if (
      getTreeHeightAtPosition(treeGrid, { row: position.row, col: currentCol }) >=
      getTreeHeightAtPosition(treeGrid, position)
    ) {
      return false;
    }
  }

  return true;
}
function isTreeVisibleFromTheRight(treeGrid: TreeGrid, position: Position): boolean {
  for (let currentCol = position.col + 1; currentCol < treeGrid[position.row].length; currentCol++) {
    if (
      getTreeHeightAtPosition(treeGrid, { row: position.row, col: currentCol }) >=
      getTreeHeightAtPosition(treeGrid, position)
    ) {
      return false;
    }
  }

  return true;
}
function isTreeVisibleFromTheTop(treeGrid: TreeGrid, position: Position): boolean {
  for (let currentRow = position.row - 1; currentRow >= 0; currentRow--) {
    if (
      getTreeHeightAtPosition(treeGrid, { row: currentRow, col: position.col }) >=
      getTreeHeightAtPosition(treeGrid, position)
    ) {
      return false;
    }
  }

  return true;
}
function isTreeVisibleFromTheBottom(treeGrid: TreeGrid, position: Position): boolean {
  for (let currentRow = position.row + 1; currentRow < treeGrid.length; currentRow++) {
    if (
      getTreeHeightAtPosition(treeGrid, { row: currentRow, col: position.col }) >=
      getTreeHeightAtPosition(treeGrid, position)
    ) {
      return false;
    }
  }

  return true;
}

function isTreeVisibleFromTheOutside(treeGrid: TreeGrid, position: Position): boolean {
  if (isTreeVisibleFromTheLeft(treeGrid, position)) {
    return true;
  }
  if (isTreeVisibleFromTheRight(treeGrid, position)) {
    return true;
  }
  if (isTreeVisibleFromTheTop(treeGrid, position)) {
    return true;
  }
  if (isTreeVisibleFromTheBottom(treeGrid, position)) {
    return true;
  }

  return false;
}

type TreeGrid = number[][];
type Position = {
  row: number;
  col: number;
};

const treeGrid: TreeGrid = input.split("\n").map((row) => row.split("").map((tree) => Number(tree)));

let numberOfTreesVisibleFromTheOutside = 0;
for (let row = 0; row < treeGrid.length; row++) {
  for (let col = 0; col < treeGrid[row].length; col++) {
    if (isTreeVisibleFromTheOutside(treeGrid, { row, col })) {
      numberOfTreesVisibleFromTheOutside++;
    }
  }
}

const res = numberOfTreesVisibleFromTheOutside;

console.log(res);

console.log("done");
