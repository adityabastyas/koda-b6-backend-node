import pool from "../lib/db.js"

/**
 * Get data by email + code
 */
export async function getByEmailAndCode(email, code) {
  const sql = `
    SELECT id, email, code, updated_at, deleted_at
    FROM forgot_password
    WHERE email = $1 AND code = $2
  `
  const result = await pool.query(sql, [email, code])
  return result.rows[0] || null
}

/**
 * Create request
 */
export async function create(email, code) {
  const sql = `
    INSERT INTO forgot_password (email, code)
    VALUES ($1, $2)
  `
  await pool.query(sql, [email, code])
}

/**
 * Delete by code
 */
export async function removeByCode(code) {
  const sql = `DELETE FROM forgot_password WHERE code = $1`
  await pool.query(sql, [code])
}

export async function removeByEmail(email) {
  const sql = `DELETE FROM forgot_password WHERE email = $1`
  await pool.query(sql, [email])
}