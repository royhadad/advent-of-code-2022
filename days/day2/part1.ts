import fs from "fs";

type GameAction = "ROCK" | "PAPER" | "SCISSORS";
type GameResult = "WIN" | "LOSE" | "DRAW";

type GameWithDesiredResult = {
  elf: GameAction;
  desiredResult: GameResult;
};

type Game = GameWithDesiredResult & {
  human: GameAction;
};

const convertGameActionCodeToGameActionType = (code: string): GameAction => {
  if (code === "A") {
    return "ROCK";
  } else if (code === "B") {
    return "PAPER";
  } else if (code === "C") {
    return "SCISSORS";
  } else {
    throw new Error("Invalid Game action code");
  }
};

function convertGameDesiredResultCodeToType(getDesiredResultCode: string): GameResult {
  if (getDesiredResultCode === "X") {
    return "LOSE";
  } else if (getDesiredResultCode === "Y") {
    return "DRAW";
  } else if (getDesiredResultCode === "Z") {
    return "WIN";
  }
  throw new Error("Invalid Game desiredResult code");
}

function getCorrectActionForHumanToGetDesiredResult(gameWithDesiredResult: GameWithDesiredResult): GameAction {
  if (getGameResultForHuman({ ...gameWithDesiredResult, human: "ROCK" }) === gameWithDesiredResult.desiredResult) {
    return "ROCK";
  } else if (
    getGameResultForHuman({ ...gameWithDesiredResult, human: "PAPER" }) === gameWithDesiredResult.desiredResult
  ) {
    return "PAPER";
  } else if (
    getGameResultForHuman({ ...gameWithDesiredResult, human: "SCISSORS" }) === gameWithDesiredResult.desiredResult
  ) {
    return "SCISSORS";
  } else {
    throw new Error("No correct action found");
  }
}

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

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

console.log("started");

const games = input
  .split("\n")
  .map((s) => {
    return s.split(" ");
  })
  .map<GameWithDesiredResult>(([elfCode, desiredResultCode]) => {
    return {
      elf: convertGameActionCodeToGameActionType(elfCode),
      desiredResult: convertGameDesiredResultCodeToType(desiredResultCode),
    };
  })
  .map<Game>((gameWithDesiredResult) => {
    return {
      ...gameWithDesiredResult,
      human: getCorrectActionForHumanToGetDesiredResult(gameWithDesiredResult),
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
