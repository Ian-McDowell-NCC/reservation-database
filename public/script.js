const dataTables = [];
const resDateForm = document.getElementById("resDate");
const today = new Date().toISOString().split('T')[0];
resDateForm.min = today;
resDateForm.value = today;

function getAllTables() {
  //get data for all tables
  //the parameters after ? ask for different queries
  //name of parameters (req1, req2 etc.) doesn't matter
  //values do (reservation, table, etc.)
  fetch('/data?req1=reservation&req2=table&req3=waitstaff&req4=user&req0=restaurant')
    //receive HTML
    /* .then(res => res.text())
    .then(data => {
      document.getElementById('text').insertAdjacentHTML('afterend', data) */
    //receive JSON
    .then(res => res.json())
    .then(data => {
      //for each table returned in json form, convert it into an html table
      for (const i in data) {
        dataTables[i] = JSONtoTable(data[i]);
        document.body.appendChild(dataTables[i]);
      }
    });
}
getAllTables();

//gets the json forms of sql query results and converts into an html table 
//returns the table
function JSONtoTable(jsonArr) {
  //make table
  const table = document.createElement('table');

  //add row for column names
  const headerRow = table.insertRow(0);
  //add column names to header row
  for (const i in jsonArr[0]) {
    const headerCell = headerRow.insertCell().innerText = i;
  }

  //add each row to the table
  for (const a in jsonArr) {
    const mRow = table.insertRow();
    //add each cell to the row
    for (const i in jsonArr[a]) {
      //make sure ResDate just shows the date
      if (i == 'ResDate') {
        jsonArr[a][i] = jsonArr[a][i].substring(0, 10);
      }
      //make sure ResTime just shows the time
      if (i == 'ResTime') {
        jsonArr[a][i] = jsonArr[a][i].substring(11, 16);
      }
      const tCell = mRow.insertCell().innerText = jsonArr[a][i];
    }
  }
  return table;
}