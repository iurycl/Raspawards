const { DB } = require('../database/init');

function getMovies() {
  return new Promise((resolve, reject) => {
    DB.all("SELECT * FROM movies WHERE winner = 'yes'", [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

function calculateIntervals() {
  return new Promise(async (resolve, reject) => {
    try {
      const movies = await getMovies();
      const producerWins = {};

      movies.forEach(movie => {
        const producers = movie.producers.split(/,| and /).map(p => p.trim());
        producers.forEach(producer => {
          if (!producerWins[producer]) producerWins[producer] = [];
          producerWins[producer].push(movie.year);
        });
      });

      const intervals = [];

      for (const producer in producerWins) {
        const wins = producerWins[producer].sort((a, b) => a - b);
        if (wins.length > 1) {
          for (let i = 1; i < wins.length; i++) {
            intervals.push({
              producer,
              interval: wins[i] - wins[i - 1],
              previousWin: wins[i - 1],
              followingWin: wins[i]
            });
          }
        }
      }

      const maxInterval = Math.max(...intervals.map(i => i.interval));
      const minInterval = Math.min(...intervals.map(i => i.interval));

      resolve({
        min: intervals.filter(i => i.interval === minInterval),
        max: intervals.filter(i => i.interval === maxInterval)
      });
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  calculateIntervals
};