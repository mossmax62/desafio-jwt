import { pool } from "../database/connection.js";
import { getDatabaseError } from "../lib/errors/database.error.js";

const findOneEmail = async (email) => {
  const query = "SELECT * FROM usuarios WHERE email = $1";
  try {
    const { rows } = await pool.query(query, [email]);
    console.log(rows[0]);
    return rows[0];
  } catch (error) {
    reportDatabaseError(error.code);
    return { message: 'Error al crear el usuario', error: error.message };
  }

};

const create = async ({ email, password, rol, lenguage }) => {
  const query =
    "INSERT INTO usuarios (email, password, rol, lenguage ) VALUES ($1, $2, $3, $4) RETURNING *";
  try {
    const { rows } = await pool.query(query, [email, password, rol, lenguage]);
    return rows[0];
  } catch (error) {
    reportDatabaseError(error.code);
    return { message: 'Error al crear el usuario', error: error.message };
  }

};

export const userModel = {
  findOneEmail,
  create,
};
