import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

console.log("started");

type InputRow = CdCommand | LsCommand | LsOutputDirectory | LsOutputFile;

enum InputRowType {
  CD = "cd",
  LS = "ls",
  LS_OUTPUT_FILE = "ls_output_file",
  LS_OUTPUT_DIR = "ls_output_dir",
}

type CdCommand = {
  type: InputRowType.CD;
  path: string;
};

type LsCommand = {
  type: InputRowType.LS;
};

type LsOutputDirectory = {
  type: InputRowType.LS_OUTPUT_DIR;
  name: string;
};
type LsOutputFile = {
  type: InputRowType.LS_OUTPUT_FILE;
  name: string;
  size: number;
};

const inputRows = input.split("\n");

const parsedInputRows: InputRow[] = inputRows.map<InputRow>((row) => {
  if (row.startsWith("$ cd ")) {
    return {
      type: InputRowType.CD,
      path: row.slice(5),
    };
  } else if (row.startsWith("$ ls")) {
    return {
      type: InputRowType.LS,
    };
  } else if (row.startsWith("dir ")) {
    return {
      type: InputRowType.LS_OUTPUT_DIR,
      name: row.slice(4),
    };
  } else if (row.match(/^\d+[ ]\w+(\.\w+)?$/)) {
    return {
      type: InputRowType.LS_OUTPUT_FILE,
      name: row.slice(row.lastIndexOf(" ") + 1),
      size: parseInt(row.slice(0, row.lastIndexOf(" "))),
    };
  } else {
    throw new Error("Unknown input row: " + row);
  }
});

const res = parsedInputRows;

console.log(res);

console.log("done");
