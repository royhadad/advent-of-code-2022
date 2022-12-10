import fs from "fs";

export enum Direction {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}

export type Action = {
  direction: Direction;
  numberOfSteps: number;
};
export type ActionsSpreadOut = Direction[];
export type Position = {
  x: number;
  y: number;
};

export function parseInput(input: string): ActionsSpreadOut {
  function parseInputDirectionToDirection(inputDirection: string): Direction {
    if (inputDirection === "U") return Direction.UP;
    if (inputDirection === "D") return Direction.DOWN;
    if (inputDirection === "L") return Direction.LEFT;
    if (inputDirection === "R") return Direction.RIGHT;
    throw new Error("Invalid input direction");
  }

  const actions: Action[] = input.split("\n").map<Action>((line) => {
    const [inputDirection, amount] = line.split(" ");
    return {
      direction: parseInputDirectionToDirection(inputDirection),
      numberOfSteps: Number(amount),
    };
  });

  const actionsSpreadOut: ActionsSpreadOut = [];
  actions.forEach((action) => {
    for (let i = 0; i < action.numberOfSteps; i++) {
      actionsSpreadOut.push(action.direction);
    }
  });

  return actionsSpreadOut;
}

export function getDistanceBetweenTwoPositions(position1: Position, position2: Position): number {
  return Math.hypot(position2.x - position1.x, position2.y - position1.y);
}

function simulateActionsAndReturnPositionsTheTailHasVisitedWithDuplicates(actions: ActionsSpreadOut): Position[] {
  const head: Position = { x: 0, y: 0 };
  const tail: Position = { x: 0, y: 0 };

  const positionsTheTailHasBeenAt: Position[] = [{ ...tail }];

  actions.forEach((action) => {
    // move head
    if (action === Direction.UP) {
      head.y++;
    } else if (action === Direction.DOWN) {
      head.y--;
    } else if (action === Direction.LEFT) {
      head.x--;
    } else if (action === Direction.RIGHT) {
      head.x++;
    } else {
      throw new Error("invalid action");
    }

    if (getDistanceBetweenTwoPositions(head, tail) >= 2) {
      // move tail
      if (head.x > tail.x) {
        tail.x++;
      } else if (head.x < tail.x) {
        tail.x--;
      }

      if (head.y > tail.y) {
        tail.y++;
      } else if (head.y < tail.y) {
        tail.y--;
      }

      positionsTheTailHasBeenAt.push({ ...tail });
    }
  });

  return positionsTheTailHasBeenAt;
}

export function removeDuplicatePositions(positions: Position[]): Position[] {
  const positionToStringPosition = (position: Position): string => `${position.x},${position.y}`;
  const stringPositionToPosition = (stringPosition: string): Position => {
    const [x, y] = stringPosition.split(",");
    return { x: Number(x), y: Number(y) };
  };

  const positionsAsStringPositions = positions.map(positionToStringPosition);
  const stringPositionsSet = new Set(positionsAsStringPositions);
  const uniquePositionsAsStrings = Array.from(stringPositionsSet);
  return uniquePositionsAsStrings.map(stringPositionToPosition);
}

function main(): void {
  const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

  console.log("started");
  const actions = parseInput(input);
  const positionsTheTailHasBeenAt = simulateActionsAndReturnPositionsTheTailHasVisitedWithDuplicates(actions);
  const positionsTheTailHasBeenAtWithoutDuplicates = removeDuplicatePositions(positionsTheTailHasBeenAt);
  const numberOfUniquePositionsTheTailHasBeenAt = positionsTheTailHasBeenAtWithoutDuplicates.length;

  const res = numberOfUniquePositionsTheTailHasBeenAt;

  console.log(res);

  console.log("done");
}

// main();
