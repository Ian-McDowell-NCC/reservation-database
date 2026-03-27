// Tutorial for sql parts: https://www.sqlservertutorial.net/nodejs-sql-server/nodejs-sql-server-connect/
//Tutorial for express (server) parts: https://expressjs.com/en/starter/hello-world.html
//Node.js docs: https://nodejs.org/api/
import express from 'express'
import sql from 'mssql';
import { config } from './config.js';
import { findReservationById } from './select.js';


const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/api/hello', (req, res) => {
  res.json({'hello': 'Hello World!'})
})


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})


const connect = async () => {
  try {
    await sql.connect(config);
    console.log('Connected to the database!');
  } catch (err) {
    console.error(err);
  }
};

connect();


app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Node.js!' });
});
const author = await findReservationById(324293838);
console.log(author);