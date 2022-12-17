import fs from "fs";
import { Map, Position, VisitedPositionsMap, parseInputToMap, arePositionsEqual, isMovePossible } from "./util";

console.log("started");

function getPossibleNextPositions(map: Map, currentPosition: Position): Position[] {
  const possibleMoves: Position[] = [];

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

type Route = {
  position: Position;
  previousPosition: Route | null;
};

function findShortestRouteToEndPositionBFS(map: Map, start: Position, end: Position): Position[] {
  const visitedPositionMap = new VisitedPositionsMap();
  const startingRoute: Route = {
    position: start,
    previousPosition: null,
  };
  const endOfShortestRouteToEndPosition = recursiveFindShortestRouteToEndPositionBFS(map, visitedPositionMap, end, [
    startingRoute,
  ]);

  // extract the list of positions from the end of the shortest route
  const positionsList: Position[] = [];
  let current: Route | null = endOfShortestRouteToEndPosition;
  while (current !== null) {
    positionsList.push(current.position);
    current = current.previousPosition;
  }
  return positionsList.reverse();
}

function recursiveFindShortestRouteToEndPositionBFS(
  map: Map,
  visitedPositionMap: VisitedPositionsMap,
  end: Position,
  currentRoutes: Route[]
): Route {
  // if one of the current positions is the end positions, we found the shortest route, return it!
  for (const currentRoute of currentRoutes) {
    if (arePositionsEqual(currentRoute.position, end)) {
      return currentRoute;
    }
  }

  // get the next nodes for each node and flatten it
  const nextRoutes = currentRoutes.flatMap<Route>((currentRoute) => {
    return getPossibleNextPositions(map, currentRoute.position).map<Route>((position) => ({
      position,
      previousPosition: currentRoute,
    }));
  });

  // get rid of positions that have already been visited, remove duplicates as well
  const nextRoutesFiltered = nextRoutes.filter((nextNode) => {
    const shouldKeepPosition = !visitedPositionMap.isVisited(nextNode.position);
    if (shouldKeepPosition) {
      visitedPositionMap.markAsVisited(nextNode.position);
    }
    return shouldKeepPosition;
  });

  return recursiveFindShortestRouteToEndPositionBFS(map, visitedPositionMap, end, nextRoutesFiltered);
}

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();
const { map, start, end } = parseInputToMap(input);
const shortestRoute = findShortestRouteToEndPositionBFS(map, start, end);
const shortestRouteLength = shortestRoute.length - 1;

const res = shortestRouteLength;

console.log(res);

console.log("done");
