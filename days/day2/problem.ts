import fs from "fs";

type GameAction = "ROCK" | "PAPER" | "SCISSORS";

type Game = {
  elf: GameAction;
  human: GameAction;
};

type GameResult = "WIN" | "LOSE" | "DRAW";

const gameActionCodeToGameAction = (code: string): GameAction => {
  if (code === "A" || code === "X") {
    return "ROCK";
  } else if (code === "B" || code === "Y") {
    return "PAPER";
  } else if (code === "C" || code === "Z") {
    return "SCISSORS";
  } else {
    throw new Error("Invalid Game action code");
  }
};

function getGameResultForHuman(game: Game): GameResult {
  if (game.human === "ROCK" && game.elf === "SCISSORS") {
    return "WIN";
  } else if (game.human === "PAPER" && game.elf === "ROCK") {
    return "WIN";
  } else if (game.human === "SCISSORS" && game.elf === "PAPER") {
    return "WIN";
  } else if (game.human === game.elf) {
    return "DRAW";
  } else {
    return "LOSE";
  }
}

const input = fs.readFileSync("./days/day2/input.txt", "utf-8").trim();

console.log("started");

const games = input
  .split("\n")
  .map((s) => {
    return s.split(" ");
  })
  .map<Game>(([elfCode, meCode]) => {
    return {
      elf: gameActionCodeToGameAction(elfCode),
      human: gameActionCodeToGameAction(meCode),
    };
  });

let totalScore = 0;
games.forEach((game) => {
  if (game.human === "ROCK") {
    totalScore += 1;
  } else if (game.human === "PAPER") {
    totalScore += 2;
  } else if (game.human === "SCISSORS") {
    totalScore += 3;
  }

  if (getGameResultForHuman(game) === "WIN") {
    totalScore += 6;
  } else if (getGameResultForHuman(game) === "DRAW") {
    totalScore += 3;
  }
});

const res = totalScore;

console.log(res);

console.log("done");
