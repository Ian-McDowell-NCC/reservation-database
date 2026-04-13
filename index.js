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
  // May create duplicate ids; need to change later
  var NewResId = Math.floor(Math.random() * 899999999 + 100000000);
  var NewResCreated = new Date(Date.now()).toISOString();
  var NewResDate = req.body.resDate;
  var NewResTime = req.body.resTime;
  var NewResSize = req.body.partySize;
  var NewResName = req.body.partyName;
  var NewResRestaurant = req.body.restaurant;
  var NewResEmail = req.body.email == undefined ? 'NULL' : req.body.email;
  var NewResPhone = req.body.phone == undefined ? 'NULL' : req.body.phone;
  var NewResOptIns = req.body.optIns == undefined ? 0 : 1;
  var NewResComments = req.body.comments;
  console.log(await runSingleQuery(`INSERT INTO Reservation VALUES (${NewResId}, '${NewResDate}', '${NewResTime}', ${NewResSize}, '${NewResName}', '${NewResPhone}', '${NewResEmail}', ${NewResOptIns}, 'IN FUTURE', '${NewResCreated}',  '${NewResComments}', ${NewResRestaurant}, NULL);`))
  res.send(NewResId);
})

// Delete reservation according to ID
app.get('/deleteres', async (req, res) =>{
  const result = await runSingleQuery(`DELETE FROM Reservation WHERE ReservationID = ${req.query['id']}`);
  if(result == undefined){
    res.send("Success")
  } else {
    res.send("Error")
  }
})

// View res by ID
app.get('/reservation', async (req, res) => {
  // Hold HTML output as string
  var output = '';
  var id = req.query['id'];

  // Make sure an ID was provided
  if (id != undefined) {
    const queryResult = await runSingleQuery(`SELECT * FROM Reservation WHERE ReservationID = ${req.query['id']}`);
    // Make sure there is a result
    if (Object.keys(queryResult).length != 0 && queryResult != undefined) {
      // Get results from query
      var partyName = queryResult[0]['PartyName'];
      var partySize = queryResult[0]['PartySize'];
      var resDate = queryResult[0]['ResDate'].toLocaleDateString();
      var resTime = queryResult[0]['ResTime'].toLocaleTimeString();
      var comments = queryResult[0]['Comments'] != '' ? queryResult[0]['Comments'] : 'None';
      var resPhone = queryResult[0]['ResPhone'] != '' ? queryResult[0]['ResPhone'] : 'Not Provided';
      var resEmail = queryResult[0]['ResEmail'] != '' ? queryResult[0]['ResEmail'] : 'Not Provided';

      // Store value of results in output
      output += `<h2>Viewing Reservation ${id}:</h2>`;
      output += `Party name: ${partyName}<br>`;
      output += `Reservation for ${partySize} on ${resDate} at ${resTime}<br>`;
      output += `Comments: ${comments}<br>`;
      output += `Phone number: ${resPhone}<br>`;
      output += `Email: ${resEmail}<br>`;

      // Add delete button
      output += `<button onclick="fetch('/deleteres?id=${id}').then(res => res.text()).then(data =>{alert('Reservation Cancelled'); history.back();})">Cancel Reservation</button>`
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
      // Hold results in an array
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

  // If sending as HTML
  /* for(const i in results){
    html += JSONtoTableHTML(results[i])
  }
  res.send(html); */

  // If sending as JSON
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
      // Make sure ResTime only shows the time
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