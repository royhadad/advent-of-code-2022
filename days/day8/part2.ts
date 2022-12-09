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

function getTreeScenicViewForTheLeft(treeGrid: TreeGrid, position: Position): number {
  let numberOfTreesVisible = 0;
  for (let currentCol = position.col - 1; currentCol >= 0; currentCol--) {
    numberOfTreesVisible++;
    if (
      getTreeHeightAtPosition(treeGrid, { row: position.row, col: currentCol }) >=
      getTreeHeightAtPosition(treeGrid, position)
    ) {
      break;
    }
  }

  return numberOfTreesVisible;
}
function getTreeScenicViewForTheRight(treeGrid: TreeGrid, position: Position): number {
  let numberOfTreesVisible = 0;
  for (let currentCol = position.col + 1; currentCol < treeGrid[position.row].length; currentCol++) {
    numberOfTreesVisible++;
    if (
      getTreeHeightAtPosition(treeGrid, { row: position.row, col: currentCol }) >=
      getTreeHeightAtPosition(treeGrid, position)
    ) {
      break;
    }
  }

  return numberOfTreesVisible;
}
function getTreeScenicViewForTheTop(treeGrid: TreeGrid, position: Position): number {
  let numberOfTreesVisible = 0;
  for (let currentRow = position.row - 1; currentRow >= 0; currentRow--) {
    numberOfTreesVisible++;
    if (
      getTreeHeightAtPosition(treeGrid, { row: currentRow, col: position.col }) >=
      getTreeHeightAtPosition(treeGrid, position)
    ) {
      break;
    }
  }

  return numberOfTreesVisible;
}
function getTreeScenicViewForTheBottom(treeGrid: TreeGrid, position: Position): number {
  let numberOfTreesVisible = 0;
  for (let currentRow = position.row + 1; currentRow < treeGrid.length; currentRow++) {
    numberOfTreesVisible++;
    if (
      getTreeHeightAtPosition(treeGrid, { row: currentRow, col: position.col }) >=
      getTreeHeightAtPosition(treeGrid, position)
    ) {
      break;
    }
  }

  return numberOfTreesVisible;
}

function getTreeScenicScore(treeGrid: TreeGrid, position: Position): number {
  return (
    getTreeScenicViewForTheLeft(treeGrid, position) *
    getTreeScenicViewForTheRight(treeGrid, position) *
    getTreeScenicViewForTheTop(treeGrid, position) *
    getTreeScenicViewForTheBottom(treeGrid, position)
  );
}

type TreeGrid = number[][];
type Position = {
  row: number;
  col: number;
};

const treeGrid: TreeGrid = input.split("\n").map((row) => row.split("").map((tree) => Number(tree)));

let maxScenicScore = -1;
for (let row = 0; row < treeGrid.length; row++) {
  for (let col = 0; col < treeGrid[row].length; col++) {
    if (getTreeScenicScore(treeGrid, { row, col }) > maxScenicScore) {
      maxScenicScore = getTreeScenicScore(treeGrid, { row, col });
    }
  }
}

const res = maxScenicScore;

console.log(res);

console.log("done");
