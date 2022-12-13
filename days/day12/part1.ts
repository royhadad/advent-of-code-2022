import fs from "fs";

console.log("started");

// a-z
type Altitude = number; // 0-25
type Map = Altitude[][];

type Position = {
  x: number;
  y: number;
};

enum Move {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}

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

function getAltitudeAtPosition(position: Position, map: Map): Altitude {
  const res = map[position.y]?.[position.x];
  if (res === undefined) {
    throw new Error("position out of bounds");
  }
  return res;
}

function isPositionInMap(position: Position, map: Map): boolean {
  try {
    const res = getAltitudeAtPosition(position, map);
    if (res === undefined) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}

function getTwoDimensionalDistanceBetweenTwoPositions(position1: Position, position2: Position): number {
  return Math.hypot(position2.x - position1.x, position2.y - position1.y);
}

function isMovePossible(start: Position, destinationPosition: Position, map: Map): boolean {
  if (!isPositionInMap(destinationPosition, map)) {
    return false;
  }
  if (getTwoDimensionalDistanceBetweenTwoPositions(start, destinationPosition) > 1) {
    return false;
  }
  if (getAltitudeAtPosition(destinationPosition, map) > getAltitudeAtPosition(start, map) + 1) {
    return false;
  }
  return true;
}

function arePositionsEqual(position1: Position, position2: Position): boolean {
  return position1.x === position2.x && position1.y === position2.y;
}

function isPositionAlreadyVisited(currentPosition: HistoryTreeNode, positionToCheck: Position): boolean {
  if (arePositionsEqual(currentPosition.position, positionToCheck)) {
    return true;
  }
  if (currentPosition.previousPosition === null) {
    return false;
  }
  return isPositionAlreadyVisited(currentPosition.previousPosition, positionToCheck);
}

function getPossibleNextPositions(map: Map, start: HistoryTreeNode): Position[] {
  const possibleMoves: Position[] = [];

  const currentPosition = start.position;
  const positionAfterMoveLeft = { ...currentPosition, x: currentPosition.x - 1 };
  if (
    isMovePossible(currentPosition, positionAfterMoveLeft, map) &&
    !isPositionAlreadyVisited(start, positionAfterMoveLeft)
  ) {
    possibleMoves.push(positionAfterMoveLeft);
  }

  const positionAfterMoveRight = { ...currentPosition, x: currentPosition.x + 1 };
  if (
    isMovePossible(currentPosition, positionAfterMoveRight, map) &&
    !isPositionAlreadyVisited(start, positionAfterMoveRight)
  ) {
    possibleMoves.push(positionAfterMoveRight);
  }

  const positionAfterMoveUp = { ...currentPosition, y: currentPosition.y - 1 };
  if (
    isMovePossible(currentPosition, positionAfterMoveUp, map) &&
    !isPositionAlreadyVisited(start, positionAfterMoveUp)
  ) {
    possibleMoves.push(positionAfterMoveUp);
  }

  const positionAfterMoveDown = { ...currentPosition, y: currentPosition.y + 1 };
  if (
    isMovePossible(currentPosition, positionAfterMoveDown, map) &&
    !isPositionAlreadyVisited(start, positionAfterMoveDown)
  ) {
    possibleMoves.push(positionAfterMoveDown);
  }

  return possibleMoves;
}

type HistoryTreeNode = {
  position: Position;
  previousPosition: HistoryTreeNode | null;
  nextPositions: HistoryTreeNode[];
};

function createRoutesTree(map: Map, start: Position, end: Position): HistoryTreeNode {
  const rootTreeNode: HistoryTreeNode = {
    position: start,
    previousPosition: null,
    nextPositions: [],
  };
  createRoutesTreeRecursive(map, end, rootTreeNode);
  return rootTreeNode;
}
let recursionCount = 0;
function createRoutesTreeRecursive(map: Map, end: Position, currentTreeNode: HistoryTreeNode): void {
  recursionCount++;
  if (recursionCount === 1000000) {
    console.log("got to 1000000");
  }
  if (arePositionsEqual(currentTreeNode.position, end)) {
    return;
  }
  currentTreeNode.nextPositions = getPossibleNextPositions(map, currentTreeNode).map((position) => ({
    position,
    previousPosition: currentTreeNode,
    nextPositions: [],
  }));
  currentTreeNode.nextPositions.forEach((nextPosition) => {
    createRoutesTreeRecursive(map, end, nextPosition);
  });
}

function findShortestRoute(map: Map, start: Position, end: Position): Move[] {
  const routesTree = createRoutesTree(map, start, end);

  console.log(routesTree);

  return [];
}

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();
const { map, start, end } = parseInputToMap(input);
const shortestRouteLength = findShortestRoute(map, start, end).length;

const res = shortestRouteLength;

console.log(res);

console.log("done");
