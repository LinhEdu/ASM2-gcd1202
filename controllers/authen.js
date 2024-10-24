const pool = require('../models/pg_connector')
async function authenticator(username, password) {
    // Define the query string
    const query_string = {
        text: 'SELECT * FROM users WHERE uname = $1 AND pword = $2',
        values: [username, password],
    }
    // query to DB and get the result
    result = await pool.query(query_string)
    //console.log(result);
    return result
  }
  module.exports = authenticator;