import sqlite3 = require("sqlite3");

const db: sqlite3.Database = new sqlite3.Database("db/fortunes.db");
const QUERY_WITH_TOPIC: string = `SELECT fortune FROM fortunes
  WHERE topic = ?
  ORDER BY RANDOM()
  LIMIT 1;
`;
const QUERY_NO_TOPIC: string = `
  SELECT fortune FROM fortunes WHERE
  topic IN (SELECT topic FROM fortunes ORDER BY RANDOM() LIMIT 1)
  ORDER BY RANDOM()
  LIMIT 1;";
`;

/**
 * Returns a random fortune
 * @param  {string?}   topic  An optional topic for the fortune
 * @return {string}           Promise to return a random fortune
 */
export function fortune(topic?: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (topic) {
      db.get(QUERY_WITH_TOPIC, [topic], (err, row) => {
        if (err) { reject(err); }
        else {
          resolve(row.fortune);
        }
      });
    } else {
      db.get(QUERY_NO_TOPIC, (err, row) => {
        if (err) { reject(err); }
        else {
          resolve(row.fortune);
        }
      });
    }
  });
}
