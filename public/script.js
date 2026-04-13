const dataTables = [];
const resDateForm = document.getElementById("resDate");
const today = new Date().toISOString().split('T')[0];
resDateForm.min = today;
resDateForm.value = today;

// Wait for CreateResForm to be submitted
document.getElementById("CreateResForm").addEventListener("submit", (e) => {
  e.preventDefault();
  // Put the data from the form into an object that can be converted to JSON
  const newResForm = new FormData(e.target);
  const newResInfo = Object.fromEntries(newResForm.entries());

  // Send form data as a JSON to backend
  fetch("/createRes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newResInfo),
  })
})

function getAllTables() {
  // Get data for all tables
  // The parameters after ? ask for different queries
  // Name of parameters (e.g., req1, req2, etc.) does not matter
  // Name of values (e.g., reservation, table, etc.) does matter
  fetch('/data?req1=reservation&req2=table&req3=waitstaff&req4=user&req0=restaurant')
    // If you want to receive HTML
    /* .then(res => res.text())
    .then(data => {
      document.getElementById('text').insertAdjacentHTML('afterend', data) */

    // Receive JSON
    .then(res => res.json())
    .then(data => {
      // For each table returned in JSON form, convert it into an HTML table
      for (const i in data) {
        dataTables[i] = JSONtoTable(data[i]);
        document.body.appendChild(dataTables[i]);
      }
    });
}
getAllTables();

// Get the JSON forms of SQL query results and convert into an HTML table 
// Return the table
function JSONtoTable(jsonArr) {
  // Make table
  const table = document.createElement('table');
  var resTable;

  // Add row for column names
  const headerRow = table.insertRow(0);
  // Add column names to header row
  for (const i in jsonArr[0]) {
    const headerCell = headerRow.insertCell().innerText = i;
    if (i == 'ReservationID') {
      resTable = true;
    }
  }
  // Add each row to the table
  for (const a in jsonArr) {
    const mRow = table.insertRow();
    // Add each cell to the row
    for (const i in jsonArr[a]) {
      // Make sure ResDate only shows the date
      if (i == 'ResDate') {
        jsonArr[a][i] = jsonArr[a][i].substring(0, 10);
      }
      // Make sure ResTime only shows the time
      if (i == 'ResTime') {
        jsonArr[a][i] = jsonArr[a][i].substring(11, 16);
      }
      const tCell = mRow.insertCell().innerText = jsonArr[a][i];
    }

    // Only add to table of reservations
    if (resTable) {
      // Make button
      const button = document.createElement('button');
      button.innerText = "Cancel Reservation";

      // Make it so when you click the button, it sends the call to delete the row in the database
      button.addEventListener("click", () => {
        fetch(`/deleteres?id=${jsonArr[a]['ReservationID']}`)
        // Get response in plain text form
          .then(res => res.text())
          .then(data => {
            // If the deletion does not give an error, delete the row from the HTML table
            if(data == "Success"){
              mRow.remove();
            } else {
              alert("UNKNOWN ERROR, CHECK LOGS")
            }
          })
      })
      // Add the button to the table
      mRow.insertCell().appendChild(button);
    };

  }
  return table;
}