// Tutorial for SQL Parts: https://www.sqlservertutorial.net/nodejs-sql-server/nodejs-sql-server-connect/
// Tutorial for Express (Server) Parts: https://expressjs.com/en/starter/hello-world.html
// Node.js Documentation: https://nodejs.org/api/
import express from 'express'
import sql from 'mssql';
import { config } from './config.js';
import { runSQLfile, runSingleQuery } from './query.js';
import 'dotenv/config';

// Set up localhost for frontend
const app = express()
const port = 3000
app.use(express.static('public'))

// Output port to log
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

// Verify connection to database
const connect = async () => {
  try {
    await sql.connect(config);
    console.log('Connected to the database!');
  } catch (err) {
    console.error(err);
  }
};

connect();

// runSQLfile('./queries.sql');

// console.log(result[0])
// Send data to frontend as JSON

app.get('/api/data', async (req, res) => {
  const results = [];
  for (const q in req.query) {
    switch (req.query[q]) {
      // Perform whatever SQL queries the GET request is sent from the URL parameters
      // Holds results in an array
      case "reservation":
        results[results.length] = await runSingleQuery(`SELECT * FROM Reservation`);
        break;
      case "table":
        results[results.length] = await runSingleQuery(`SELECT * FROM RestaurantTable`);
        break;
      case "waitstaff":
        results[results.length] = await runSingleQuery(`SELECT * FROM WaitStaff`);
        break;
      case "user":
        results[results.length] = await runSingleQuery(`SELECT * FROM SystemUser`);
        break;
      case "restaurant":
        results[results.length] = await runSingleQuery(`SELECT * FROM Restaurant`);
        break;
      default:
        if (results.length == 0) {
          results[0] = "error";
        }
    }
  }
  console.log(req.query);
  res.json(results);
})