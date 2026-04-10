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
app.use(express.json());

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

//runSQLfile('./queries.sql');

//update PartyName
//runSingleQuery("UPDATE Reservation SET PartyName = 'Alfred Schmidt' WHERE ReservationID = 324293838;")

app.post('/createRes', async (req, res) => {
  console.log(req.body);
  res.send('lorem ipsum');
})

//view res by id
app.get('/reservation', async (req, res) => {
  //holds html output as string
  //can't be the best way but idk what else to do
  var output = '';
  var id = req.query['id'];

  //make sure an id was provided
  if (id != undefined) {
    const queryResult = await runSingleQuery(`SELECT * FROM Reservation WHERE ReservationID = ${req.query['id']}`);
    //make sure there is a result
    if (Object.keys(queryResult).length != 0 && queryResult != undefined) {
      //get results from query
      var partyName = queryResult[0]['PartyName'];
      var resDate = queryResult[0]['ResDate'].toLocaleDateString();
      var resTime = queryResult[0]['ResTime'].toLocaleTimeString();
      var partyName = queryResult[0]['PartyName'];
      var comments = queryResult[0]['Comments'] != null ? queryResult[0]['Comments'] : 'None';
      var resPhone = queryResult[0]['ResPhone'] != null ? queryResult[0]['ResPhone'] : 'Not Provided';
      var resEmail = queryResult[0]['ResEmail'] != null ? queryResult[0]['ResEmail'] : 'Not Provided';

      //store vale of results in output
      output += `<h2>Viewing Reservation ${id}:</h2>`;
      output += `Party name: ${partyName}<br>`;
      output += `Reservation for ${resDate} at  ${resTime}<br>`;
      output += `Party name: ${partyName}<br>`;
      output += `Comments: ${comments}<br>`;
      output += `Phone number: ${resPhone}<br>`;
      output += `Email: ${resEmail}<br>`;
      res.send(output)
    } else {
      res.send("ERROR: There is no reservation with that id");
    }
  } else {
    res.send("ERROR: Please enter id")
  }
})
// console.log(result[0])
// Send data to frontend as JSON
app.get('/data', async (req, res) => {
  const results = [];
  let html = '';
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

  //If sending as HTML
  /* for(const i in results){
    html += JSONtoTableHTML(results[i])
  }
  res.send(html); */

  //if sending as JSON
  res.json(results)
})


function JSONtoTableHTML(jsonArr) {
  let tablehtml = '<table style="border: 2px solid black; border-collapse: collapse;">';

  for (const i in jsonArr[0]) {
    tablehtml += `<th style="border: 1px solid gray">${i}</th>`;
  }

  for (const i in jsonArr) {
    tablehtml += "<tr>";
    for (const j in jsonArr[i]) {
      if (j == 'ResDate') {
        jsonArr[i][j] = jsonArr[i][j].toDateString();
      }
      //make sure ResTime just shows the time
      if (j == 'ResTime') {
        jsonArr[i][j] = jsonArr[i][j].toLocaleTimeString();
      }
      if (jsonArr[i][j] == null) {
        tablehtml += `<td style="border: 1px solid gray"></td>`;
      } else {
        tablehtml += `<td style="border: 1px solid gray">${jsonArr[i][j]}</td>`;
      }

    }
    tablehtml += "</tr>";
  }
  tablehtml += "</table>";
  return tablehtml;
};