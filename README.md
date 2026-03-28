# Reservation Database

Uses Node.js and Microsoft SQL Server to connect to a SQL database server set up using `ReservationDatabase.sql`.

If you want to run a query on the database, you can either create a SQL file and use `runSQLfile(*filepath*)`, or use `runSingleQuery(*query*)`. `runSingleQuery` will return recordsets, which is an array of result sets, where each result set is an array of rows, and each is returned as a JSON object. The results can be sent to `script.js` and output to HTML.

TO VIEW HTML: Open the project in VS Code or Codespaces, click "Start" in the Run and Debug options, and open `localhost:3000` in your browser. It might not connect to the database at first. If it doesn't, try starting it again a couple of times. It should connect within 2-3 tries.