const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../utils/content.txt");

setImmediate(() => {
  console.log("CB from setImmediate executed");
});

setTimeout(() => {
  console.log("CB from setTimeout");
}, 0);

Promise.resolve("Inside the promise").then((val) => console.log);

fs.readFile(filePath, "utf8", () => {
  console.log("CB from file read");
});

process.nextTick(() => {
  process.nextTick(() => {
    console.log("CB from inner nextTick");
  });
  console.log("CB from nextTick");
});

console.log("Last line of the file");
