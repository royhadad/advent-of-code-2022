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

function getPossibleNextPositions(map: Map, start: HistoryTreeNode): Position[] {
  const possibleMoves: Position[] = [];

  const currentPosition = start.position;
  const positionAfterMoveLeft = { ...currentPosition, x: currentPosition.x - 1 };
  if (isMovePossible(currentPosition, positionAfterMoveLeft, map)) {
    possibleMoves.push(positionAfterMoveLeft);
  }

  const positionAfterMoveRight = { ...currentPosition, x: currentPosition.x + 1 };
  if (isMovePossible(currentPosition, positionAfterMoveRight, map)) {
    possibleMoves.push(positionAfterMoveRight);
  }

  const positionAfterMoveUp = { ...currentPosition, y: currentPosition.y - 1 };
  if (isMovePossible(currentPosition, positionAfterMoveUp, map)) {
    possibleMoves.push(positionAfterMoveUp);
  }

  const positionAfterMoveDown = { ...currentPosition, y: currentPosition.y + 1 };
  if (isMovePossible(currentPosition, positionAfterMoveDown, map)) {
    possibleMoves.push(positionAfterMoveDown);
  }

  return possibleMoves;
}

type HistoryTreeNode = {
  position: Position;
  previousPosition: HistoryTreeNode | null;
  nextPositions: HistoryTreeNode[];
};

// function createRoutesTree(map: Map, start: Position, end: Position): HistoryTreeNode {
//   const rootTreeNode: HistoryTreeNode = {
//     position: start,
//     previousPosition: null,
//     nextPositions: [],
//   };
//   createRoutesTreeRecursive(map, end, rootTreeNode, rootTreeNode);
//   return rootTreeNode;
// }
//
// function createRoutesTreeRecursive(
//   map: Map,
//   end: Position,
//   rootTreeNode: HistoryTreeNode,
//   currentTreeNode: HistoryTreeNode
// ): void {
//   if (arePositionsEqual(currentTreeNode.position, end)) {
//     return;
//   }
//   currentTreeNode.nextPositions = getPossibleNextPositions(map, currentTreeNode).map((position) => ({
//     position,
//     previousPosition: currentTreeNode,
//     nextPositions: [],
//   }));
//   currentTreeNode.nextPositions.forEach((nextPosition) => {
//     createRoutesTreeRecursive(map, end, rootTreeNode, nextPosition);
//   });
// }

class VisitedPositionsMap {
  private readonly map;
  constructor() {
    this.map = new Map<string, boolean>();
  }
  private positionToUniqueKey(position: Position): string {
    return `${position.x},${position.y}`;
  }

  public isVisited(position: Position): boolean {
    return this.map.get(this.positionToUniqueKey(position)) ?? false;
  }
  public markAsVisited(position: Position): void {
    this.map.set(this.positionToUniqueKey(position), true);
  }
}

function createRoutesTreeBFS(map: Map, start: Position, end: Position): HistoryTreeNode {
  const positionsThatHaveAlreadyBeenVisited = new VisitedPositionsMap();

  const rootTreeNode: HistoryTreeNode = {
    position: start,
    previousPosition: null,
    nextPositions: [],
  };
  return createRoutesTreeRecursiveBFS(map, positionsThatHaveAlreadyBeenVisited, end, [rootTreeNode]);
}

function createRoutesTreeRecursiveBFS(
  map: Map,
  positionsThatHaveAlreadyBeenVisited: VisitedPositionsMap,
  end: Position,
  currentTreeNodes: HistoryTreeNode[]
): HistoryTreeNode {
  // if one of the current positions is the end positions, we found the shortest route, return it!
  for (const currentTreeNode of currentTreeNodes) {
    if (arePositionsEqual(currentTreeNode.position, end)) {
      return currentTreeNode;
    }
  }

  // get the next nodes for each node and flatten it
  const nextNodes = currentTreeNodes.flatMap<HistoryTreeNode>((currentNode) => {
    return getPossibleNextPositions(map, currentNode).map<HistoryTreeNode>((position) => ({
      position,
      previousPosition: currentNode,
      nextPositions: [],
    }));
  });

  // get rid of positions that have already been visited, remove duplicates as well
  const nextNodesFiltered = nextNodes.filter((nextNode) => {
    const shouldKeepPosition = !positionsThatHaveAlreadyBeenVisited.isVisited(nextNode.position);
    if (shouldKeepPosition) {
      positionsThatHaveAlreadyBeenVisited.markAsVisited(nextNode.position);
    }
    return shouldKeepPosition;
  });

  return createRoutesTreeRecursiveBFS(map, positionsThatHaveAlreadyBeenVisited, end, nextNodesFiltered);
}

function findShortestRoute(map: Map, start: Position, end: Position): Position[] {
  const routesTree = createRoutesTreeBFS(map, start, end);

  const route: Position[] = [];
  let current: HistoryTreeNode | null = routesTree;
  while (current !== null) {
    route.push(current.position);
    current = current.previousPosition;
  }

  return route.reverse();
}

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();
const { map, start, end } = parseInputToMap(input);
const shortestRoute = findShortestRoute(map, start, end);
const shortestRouteLength = shortestRoute.length - 1;

const res = shortestRouteLength;

console.log(res);

console.log("done");
