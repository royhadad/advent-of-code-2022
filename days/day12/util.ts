// a-z
export type Altitude = number; // 0-25
export type Map = Altitude[][];

export type Position = {
  x: number;
  y: number;
};

export function parseInputToMap(input: string): { map: Map; start: Position; end: Position } {
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

export function getAltitudeAtPosition(position: Position, map: Map): Altitude {
  const res = map[position.y]?.[position.x];
  if (res === undefined) {
    throw new Error("position out of bounds");
  }
  return res;
}

export function isPositionInMap(position: Position, map: Map): boolean {
  try {
    getAltitudeAtPosition(position, map);
    return true;
  } catch (e) {
    return false;
  }
}

export function getTwoDimensionalDistanceBetweenTwoPositions(position1: Position, position2: Position): number {
  return Math.hypot(position2.x - position1.x, position2.y - position1.y);
}

export function isMovePossible(start: Position, destinationPosition: Position, map: Map): boolean {
  if (!isPositionInMap(destinationPosition, map) || !isPositionInMap(start, map)) {
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

export function arePositionsEqual(position1: Position, position2: Position): boolean {
  return position1.x === position2.x && position1.y === position2.y;
}

export class VisitedPositionsMap {
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
