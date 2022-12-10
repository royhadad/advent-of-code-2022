import fs from "fs";
import {
  Direction,
  Position,
  ActionsSpreadOut,
  removeDuplicatePositions,
  parseInput,
  getDistanceBetweenTwoPositions,
} from "./part1";

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

console.log("started");

function simulateActionsAndReturnPositionsTheTailHasVisitedWithDuplicates10knots(
  actions: ActionsSpreadOut
): Position[] {
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

const actions = parseInput(input);
const positionsTheTailHasBeenAt = simulateActionsAndReturnPositionsTheTailHasVisitedWithDuplicates10knots(actions);
const positionsTheTailHasBeenAtWithoutDuplicates = removeDuplicatePositions(positionsTheTailHasBeenAt);
const numberOfUniquePositionsTheTailHasBeenAt = positionsTheTailHasBeenAtWithoutDuplicates.length;

const res = numberOfUniquePositionsTheTailHasBeenAt;

console.log(res);

console.log("done");
