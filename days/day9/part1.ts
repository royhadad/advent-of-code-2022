import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

console.log("started");

enum Direction {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}
type Action = {
  direction: Direction;
  numberOfSteps: number;
};
type ActionsSpreadOut = Direction[];
type Position = {
  x: number;
  y: number;
};

function parseInput(input: string): ActionsSpreadOut {
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

function simulateActionsAndReturnPositionsTheTailHasVisitedWithDuplicates(actions: ActionsSpreadOut): Position[] {
  function getDistanceBetweenTwoPositions(position1: Position, position2: Position): number {
    return Math.hypot(position2.x - position1.x, position2.y - position1.y);
  }

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
        tail.x = head.x - 1;
      } else if (head.x < tail.x) {
        tail.x = head.x + 1;
      }

      if (head.y > tail.y) {
        tail.y = head.y - 1;
      } else if (head.y < tail.y) {
        tail.y = head.y + 1;
      }

      positionsTheTailHasBeenAt.push({ ...tail });
    }
  });

  return positionsTheTailHasBeenAt;
}

function removeDuplicatePositions(positions: Position[]): Position[] {
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

const actions = parseInput(input);
const positionsTheTailHasBeenAt = simulateActionsAndReturnPositionsTheTailHasVisitedWithDuplicates(actions);
const positionsTheTailHasBeenAtWithoutDuplicates = removeDuplicatePositions(positionsTheTailHasBeenAt);
const numberOfUniquePositionsTheTailHasBeenAt = positionsTheTailHasBeenAtWithoutDuplicates.length;

console.log("actions: ", actions.length);
console.log("positionsTheTailHasBeenAt: ", positionsTheTailHasBeenAt.length);
console.log("numberOfUniquePositionsTheTailHasBeenAt: ", numberOfUniquePositionsTheTailHasBeenAt);

// const res = numberOfUniquePositionsTheTailHasBeenAt;

// console.log(res);

console.log("done");
