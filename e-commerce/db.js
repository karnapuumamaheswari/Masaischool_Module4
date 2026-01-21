const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');

// Read database
const readDB = () => {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
};

// Write database
const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

module.exports = { readDB, writeDB };
