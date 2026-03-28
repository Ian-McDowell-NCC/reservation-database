import sql from 'mssql';
import fs from 'fs';
import { config } from './config.js';

// Runs a given SQL file
export const runSQLfile = async (sqlPath) => {
  try {
    const pool = await sql.connect(config);

    // Read the SQL file
    const script = fs.readFileSync(sqlPath, 'utf8');

    // Run all statements in the file
    const result = await pool.request().batch(script);

    // Output all query results
    result.recordset.forEach(() => { console.log(result.recordset) })
    await pool.close();

  } catch (err) {
    console.error('Error running SQL file:', err);
  }
};


// Runs a given query and returns the array of results
export const runSingleQuery = async (query) => {
  try {
    // Connect to the database
    const pool = await sql.connect(config);

    // Execute the query
    const result = await pool
      .request()
      .query(query);

    // Return the results
    return result.recordset;

  } catch (err) {
    console.error(err);
  }
}