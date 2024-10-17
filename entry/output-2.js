const fs = require("fs");
const path = require("path");

const a = 100;
const filePath = path.join(__dirname, "../utils/content.txt");

setImmediate(() => {
  console.log("CB from setImmediate executed");
});

fs.readFile(filePath, "utf8", () => {
  console.log("CB from file read operation");
});

setTimeout(() => {
  console.log("CB from setTimeout");
}, 0);

process.nextTick(() => {
  console.log("CB from nextTick");
});

const print = () => {
  console.log("a=", a);
};

print();

console.log("Last line of the file");
