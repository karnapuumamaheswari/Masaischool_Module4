const fs = require("fs");
const path = require("path");

let readFilePath = path.join(__dirname, "data.txt");
let writeFilePath = path.join(__dirname, "data1.txt");

let d = fs.readFileSync(readFilePath, "utf-8");
console.log("Content from data.txt:");
console.log(d);

fs.writeFileSync(writeFilePath, "This is new content added to the file.");
console.log("Successfully wrote to data1.txt");
