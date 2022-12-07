import fs from "fs";
import {
  parseInput,
  convertParsedInputToFileSystem,
  getAllDirectoriesWithUpToSize,
  addDirectorySizesToEntireFileSystem,
  DirectoryWithSize,
} from "./part1";

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

console.log("started");

function getFlattenedDirectories(directory: DirectoryWithSize): DirectoryWithSize[] {
  const flatDirectories: DirectoryWithSize[] = [];
  function flattenDirectory(directory: DirectoryWithSize) {
    flatDirectories.push(directory);
    directory.directories.forEach((directory) => flattenDirectory(directory));
  }
  flattenDirectory(directory);
  return flatDirectories;
}

const parsedInputRows = parseInput(input);
const fileSystem = convertParsedInputToFileSystem(parsedInputRows);
const fileSystemWithDirectorySizes = addDirectorySizesToEntireFileSystem(fileSystem);

const TOTAL_DISK_SPACE = 70000000;
const SPACE_NEEDED_FOR_UPDATE = 30000000;

const currentlyUsedSpace = fileSystemWithDirectorySizes.size;
const currentlyFreeSpace = TOTAL_DISK_SPACE - currentlyUsedSpace;
const spaceThatNeedsToBeClearedForUpdate = SPACE_NEEDED_FOR_UPDATE - currentlyFreeSpace;

const flatDirectories = getFlattenedDirectories(fileSystemWithDirectorySizes);

const flatDirectoriesSortedBySizeAscending = flatDirectories.sort((a, b) => a.size - b.size);

let directoryThatNeedsToBeDeleted: DirectoryWithSize | null = null;

for (const directory of flatDirectoriesSortedBySizeAscending) {
  if (directory.size > spaceThatNeedsToBeClearedForUpdate) {
    directoryThatNeedsToBeDeleted = directory;
    break;
  }
}

if (directoryThatNeedsToBeDeleted === null) {
  throw new Error("directoryThatNeedsToBeDeleted is null, couldn't find a directory to delete");
}

const res = directoryThatNeedsToBeDeleted.size;

console.log("spaceThatNeedsToBeClearedForUpdate:" + spaceThatNeedsToBeClearedForUpdate);
console.log("directoryThatNeedsToBeDeleted:");
console.log(directoryThatNeedsToBeDeleted);

console.log("-----------------------------");
console.log("result: " + res);
console.log("-----------------------------");

console.log("done");
