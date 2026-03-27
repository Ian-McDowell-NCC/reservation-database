import sql from 'mssql';
import { config } from './config.js';

export const findReservationById = async (id) => {
  try {
    // Connect to the database
    const pool = await sql.connect(config);

    // Execute the query
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query(`SELECT * FROM Reservation WHERE ReservationID = @id`);

    // return the result
    return result.recordset.length > 0 ? result.recordset[0] : null;
  } catch (err) {
    console.error(err);
  }
};