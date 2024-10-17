const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../utils/content.txt");

setImmediate(() => {
  console.log("CB from setImmediate executed");
});

Promise.resolve("Inside the promise").then(console.log);

fs.readFile(filePath, "utf8", () => {
  setTimeout(() => {
    console.log("CB from inner setTimeout");
  }, 0);

  process.nextTick(() => {
    console.log("CB from inner nextTick");
  });

  setImmediate(() => {
    console.log("CB from inner setImmediate executed");
  });

  console.log("Last line of the inner block");
});

process.nextTick(() => {
  console.log("CB from nextTick");
});

console.log("Last line of the file");
