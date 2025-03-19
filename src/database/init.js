const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const DB = new sqlite3.Database(':memory:');

function initializeDatabase() {
  DB.serialize(() => {
    DB.run(`
      CREATE TABLE movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        year INTEGER,
        title TEXT,
        studios TEXT,
        producers TEXT,
        winner TEXT
      )
    `, () => {
      const csvFilePath = path.join(__dirname, '../../csv/movielist.csv');
      fs.createReadStream(csvFilePath)
        .pipe(csv({ separator: ';'}))
        .on('data', (row) => {
          const stmt = DB.prepare(`INSERT INTO movies (year, title, studios, producers, winner) VALUES (?, ?, ?, ?, ?)`);
          stmt.run(
            row.year,
            row.title,
            row.studios,
            row.producers,
            row.winner
          );
          stmt.finalize();
        });
    });
  });
}

module.exports = {
  DB,
  initializeDatabase
};
