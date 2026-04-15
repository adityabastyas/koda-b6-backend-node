import pool from "../lib/db.js"

/**
 * @typedef {Object} Promo
 * @property {number} promo_id
 * @property {string} title
 * @property {string} description
 * @property {string} promo_type
 * @property {number} discount_value
 */

/**
 * Get all promo
 * @returns {Promise<Promo[]>}
 */
export async function getAll() {
  const sql = `SELECT promo_id, title, description, promo_type, discount_value FROM promo`
  const result = await pool.query(sql)
  return result.rows
}

/**
 * Get promo by id
 * @param {number} id
 * @returns {Promise<Promo|null>}
 */
export async function getById(id) {
  const sql = `SELECT promo_id, title, description, promo_type, discount_value FROM promo WHERE promo_id = $1`
  const result = await pool.query(sql, [id])
  return result.rows[0] || null
}

/**
 * Create promo
 * @param {Object} data
 * @returns {Promise<Promo>}
 */
export async function create(data) {
  const { title, description, promo_type, discount_value } = data

  const sql = `
    INSERT INTO promo (title, description, promo_type, discount_value)
    VALUES ($1, $2, $3, $4)
    RETURNING promo_id, title, description, promo_type, discount_value`

  const result = await pool.query(sql, [
    title,
    description,
    promo_type,
    discount_value
  ])

  return result.rows[0]
}

/**
 * Update promo
 * @param {number} id
 * @param {Object} data
 * @returns {Promise<Promo|null>}
 */
export async function update(id, data) {
  const { title, description, promo_type, discount_value } = data

  const sql = `
    UPDATE promo
    SET title = $2,
        description = $3,
        promo_type = $4,
        discount_value = $5
    WHERE promo_id = $1
    RETURNING promo_id, title, description, promo_type, discount_value`

  const result = await pool.query(sql, [
    id,
    title,
    description,
    promo_type,
    discount_value
  ])

  return result.rows[0] || null
}

/**
 * Delete promo
 * @param {number} id
 * @returns {Promise<Promo|null>}
 */
export async function remove(id) {
  const sql = `DELETE FROM promo WHERE promo_id = $1 RETURNING promo_id, title, description, promo_type, discount_value`
  const result = await pool.query(sql, [id])
  return result.rows[0] || null
}