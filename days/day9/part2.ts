import fs from "fs";
import {
  Direction,
  Position,
  ActionsSpreadOut,
  removeDuplicatePositions,
  parseInput,
  getDistanceBetweenTwoPositions,
} from "./part1";

function simulateActionsAndReturnPositionsTheTailHasVisitedWithDuplicates10knots(
  actions: ActionsSpreadOut
): Position[] {
  const startingPosition = { x: 0, y: 0 };
  const knots: Position[] = Array(10)
    .fill(null)
    .map(() => ({ ...startingPosition }));

  const head = knots[0];
  const tail = knots[9];

  const positionsTheTailHasBeenAt: Position[] = [{ ...startingPosition }];

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

    for (let i = 1; i < knots.length; i++) {
      const lastOneThatMoved = knots[i - 1];
      const currentToMove = knots[i];

      if (getDistanceBetweenTwoPositions(lastOneThatMoved, currentToMove) >= 2) {
        // move currentToMove
        if (lastOneThatMoved.x > currentToMove.x) {
          currentToMove.x++;
        } else if (lastOneThatMoved.x < currentToMove.x) {
          currentToMove.x--;
        }

        if (lastOneThatMoved.y > currentToMove.y) {
          currentToMove.y++;
        } else if (lastOneThatMoved.y < currentToMove.y) {
          currentToMove.y--;
        }

        if (currentToMove === tail) {
          positionsTheTailHasBeenAt.push({ ...tail });
        }
      }
    }
  });

  return positionsTheTailHasBeenAt;
}

function main(): void {
  const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

  console.log("started");
  const actions = parseInput(input);
  const positionsTheTailHasBeenAt = simulateActionsAndReturnPositionsTheTailHasVisitedWithDuplicates10knots(actions);
  const positionsTheTailHasBeenAtWithoutDuplicates = removeDuplicatePositions(positionsTheTailHasBeenAt);
  const numberOfUniquePositionsTheTailHasBeenAt = positionsTheTailHasBeenAtWithoutDuplicates.length;

  const res = numberOfUniquePositionsTheTailHasBeenAt;

  console.log(res);

  console.log("done");
}

main();
