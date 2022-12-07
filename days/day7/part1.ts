import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

console.log("started");

export type InputRow = CdCommand | LsCommand | LsOutputDirectory | LsOutputFile;

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

export function parseInput(input: string): InputRow[] {
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
  return parsedInputRows;
}

export type Directory = {
  name: string;
  size: number | null;
  directories: Directory[];
  files: File[];
  parentDirectory: Directory | null;
};

type File = {
  name: string;
  size: number;
};

export function convertParsedInputToFileSystem(parsedInputRows: InputRow[]): Directory {
  const fileSystem: Directory = {
    name: "/",
    size: null,
    files: [],
    directories: [],
    parentDirectory: null,
  };

  let isCurrentlyLsOutput: boolean = false;
  let currentDirectory: Directory = fileSystem;
  for (let i = 0; i < parsedInputRows.length; i++) {
    const row = parsedInputRows[i];

    isCurrentlyLsOutput = row.type === InputRowType.LS;

    if (row.type === InputRowType.CD) {
      if (row.path === "/") {
        currentDirectory = fileSystem;
      } else if (row.path === ".." && currentDirectory.parentDirectory) {
        currentDirectory = currentDirectory.parentDirectory;
      } else {
        const directory = currentDirectory.directories.find((dir) => dir.name === row.path);
        if (directory) {
          currentDirectory = directory;
        } else {
          throw new Error("Unknown directory: " + row.path);
        }
      }
    } else if (row.type === InputRowType.LS_OUTPUT_DIR) {
      currentDirectory.directories.push({
        name: row.name,
        files: [],
        directories: [],
        size: null,
        parentDirectory: currentDirectory,
      });
    } else if (row.type === InputRowType.LS_OUTPUT_FILE) {
      currentDirectory.files.push({
        name: row.name,
        size: row.size,
      });
    }
  }

  return fileSystem;
}

export type DirectoryWithSize = Omit<Directory, "size" | "directories"> & {
  size: number;
  directories: DirectoryWithSize[];
};

export function addDirectorySizesToEntireFileSystem(directory: Directory): DirectoryWithSize {
  const childrenFileSizes = directory.files.reduce((acc, file) => acc + file.size, 0);
  const childrenDirectorySizes = directory.directories.reduce((acc, dir) => {
    if (dir.size === null) {
      addDirectorySizesToEntireFileSystem(dir);
    }
    if (dir.size === null) {
      throw new Error("dir.size is still null for some reason");
    }
    return acc + dir.size;
  }, 0);

  directory.size = childrenFileSizes + childrenDirectorySizes;
  return directory as DirectoryWithSize;
}

export function getAllDirectoriesWithUpToSize(fileSystem: DirectoryWithSize, size: number): DirectoryWithSize[] {
  const directoriesWithSizeUpTo100000: DirectoryWithSize[] = [];
  function findDirectoriesWithMaxSize(directory: DirectoryWithSize): void {
    if (directory.size <= size) {
      directoriesWithSizeUpTo100000.push(directory);
    }
    directory.directories.forEach(findDirectoriesWithMaxSize);
  }
  findDirectoriesWithMaxSize(fileSystem);
  return directoriesWithSizeUpTo100000;
}

const parsedInputRows = parseInput(input);
const fileSystem = convertParsedInputToFileSystem(parsedInputRows);
const fileSystemWithDirectorySizes = addDirectorySizesToEntireFileSystem(fileSystem);
const directoriesWithSizeUpTo100000 = getAllDirectoriesWithUpToSize(fileSystemWithDirectorySizes, 100000);
const sumOfAllDirectoriesWithSizeUpTo100000 = directoriesWithSizeUpTo100000.reduce((acc, dir) => acc + dir.size, 0);

const res = sumOfAllDirectoriesWithSizeUpTo100000;

console.log(res);

console.log("done");
