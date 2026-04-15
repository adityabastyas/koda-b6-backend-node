import pool from "../lib/db.js"

/**
 * @typedef {Object} Kategory
 * @property {number} kategory_id
 * @property {string} name
 */

/**
 * Get all kategory
 * @returns {Promise<Kategory[]>}
 */
export async function getAll() {
  const sql = `SELECT kategory_id, name FROM kategory`
  const result = await pool.query(sql)
  return result.rows
}

/**
 * Get kategory by id
 * @param {number} id
 * @returns {Promise<Kategory|null>}
 */
export async function getById(id) {
  const sql = `SELECT kategory_id, name FROM kategory WHERE kategory_id = $1`
  const result = await pool.query(sql, [id])
  return result.rows[0] || null
}

/**
 * Create kategory
 * @param {string} name
 * @returns {Promise<Kategory>}
 */
export async function create(name) {
  const sql = `INSERT INTO kategory (name) VALUES ($1) RETURNING kategory_id, name`
  const result = await pool.query(sql, [name])
  return result.rows[0]
}

/**
 * Update kategory
 * @param {number} id
 * @param {string} name
 * @returns {Promise<Kategory|null>}
 */
export async function update(id, name) {
  const sql = `UPDATE kategory SET name = $2 WHERE kategory_id = $1 RETURNING kategory_id, name`
  const result = await pool().query(sql, [id, name])
  return result.rows[0] || null
}

/**
 * Delete kategory
 * @param {number} id
 * @returns {Promise<Kategory|null>}
 */
export async function remove(id) {
  const sql = `DELETE FROM kategory WHERE kategory_id = $1 RETURNING kategory_id, name`
  const result = await pool.query(sql, [id])
  return result.rows[0] || null
}