import fs from "fs";
import {
  Map,
  Position,
  Move,
  Altitude,
  parseInputToMap,
  arePositionsEqual,
  isMovePossible,
  getAltitudeAtPosition,
  isPositionInMap,
  getTwoDimensionalDistanceBetweenTwoPositions,
} from "./util";

console.log("started");

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
  createRoutesTreeRecursive(map, end, rootTreeNode, rootTreeNode);
  return rootTreeNode;
}

function createRoutesTreeRecursive(
  map: Map,
  end: Position,
  rootTreeNode: HistoryTreeNode,
  currentTreeNode: HistoryTreeNode
): void {
  if (arePositionsEqual(currentTreeNode.position, end)) {
    return;
  }
  currentTreeNode.nextPositions = getPossibleNextPositions(map, currentTreeNode).map((position) => ({
    position,
    previousPosition: currentTreeNode,
    nextPositions: [],
  }));
  currentTreeNode.nextPositions.forEach((nextPosition) => {
    createRoutesTreeRecursive(map, end, rootTreeNode, nextPosition);
  });
}

function findShortestRoute(map: Map, start: Position, end: Position): Position[] {
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
