import sqlite3 = require("sqlite3");

const QUERY_WITH_TOPIC: string = `
  SELECT fortune FROM fortunes
  WHERE topic = ?
  ORDER BY RANDOM()
  LIMIT 1;
`;
const QUERY_NO_TOPIC: string = `
  SELECT fortune FROM fortunes
  ORDER BY RANDOM()
  LIMIT 1;
`;
const QUERY_WITH_DIRTY: string = `
  SELECT fortune FROM fortunes
  WHERE DIRTY = ?
  ORDER BY RANDOM()
  LIMIT 1;
`
const QUERY_WITH_DIRTY_AND_TOPIC: string = `
  SELECT fortune FROM fortunes
  WHERE DIRTY = ?
  AND topic = ?
  ORDER BY RANDOM()
  LIMIT 1;
`

/**
 * The 'options' parameter for fortune()
 *
 * @interface
 */
interface Options {
  /** An optional topic for the fortune @member {string} */
  topic?: string,
  /**
   * An optional boolean specifying whether the fortune should be nsfw
   * @member {Boolean}
   */
  dirty?: Boolean
}

/**
 * Returns a random fortune from [fortune-mod]{@link https://launchpad.net/fortune-mod},
 * which is licensed under the [Simplified BSD Licence]{@link https://opensource.org/licenses/BSD-2-Clause}.
 * The original README can be found in the 'db' directory of this package
 * @function
 * @param   {string?}   topic   An optional topic for the fortune
 * @param   {Object?}   options An options object with members 'topic'
 *  (fortune topic) and 'dirty' (whether fortune should be dirty)
 * @returns {Promise<string>}   A promise to return the fortune. If no fortune
 *  matches the given options, the promise returns an empty string
 */
export function fortune(options?: Options): Promise<string> {
  const db: sqlite3.Database = new sqlite3.Database("db/fortunes.db");
  let promise: Promise<string> = new Promise<string>((resolve, reject) => {
    if (options && (options.hasOwnProperty("topic") || options.hasOwnProperty("dirty"))) {
      if (options.dirty == null && options.topic) {
        // Clean or dirty, with topic
        db.get(QUERY_WITH_TOPIC, [options.topic], (err, row) => {
          if (err) { reject(err); }
          else {
            if (row == null) { resolve(""); }
            resolve(row.fortune);
          }
        });
      } else if (options.dirty != null && options.topic) {
        // Dirty specified, with topic
        db.get(QUERY_WITH_DIRTY_AND_TOPIC, [options.dirty ? 1 : 0, options.topic], (err, row) => {
          if (err) { reject(err); }
          else {
            if (row == null) { resolve(""); }
            resolve(row.fortune);
          }
        });
      } else if (options.dirty != null && !options.topic) {
        // Dirty specified, no topic specified
        db.get(QUERY_WITH_DIRTY, [options.dirty ? 1 : 0], (err, row) => {
          if (err) { reject(err); }
          else {
            if (row == null) { resolve(""); }
            resolve(row.fortune);
          }
        });
      }
    } else {
      // No options / wrong options specified
      db.get(QUERY_NO_TOPIC, (err, row) => {
        if (err) { reject(err); }
        else {
          if (row == null) { resolve(""); }
          resolve(row.fortune);
        }
      });
    }
  });
  db.close();
  return promise;
}
