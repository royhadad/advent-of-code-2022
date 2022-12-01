import fs from "fs";

const input = fs.readFileSync("./days/day1/input.txt", "utf-8");

console.log("started");

const elvesTotals: number[] = [];
input.split("\n").forEach((line) => {
  if (line.length > 0) {
    elvesTotals[elvesTotals.length - 1] += Number(line); // add to last item in the array
  } else {
    // empty strings represent the separator line between 2 elves
    elvesTotals.push(0);
  }
});

const elvesTotalsSorted = elvesTotals.sort((a, b) => b - a);

const res = elvesTotalsSorted[0] + elvesTotalsSorted[1] + elvesTotalsSorted[2];

console.log(res);

console.log("done");
