import pool from "../lib/db.js"

/**
 * @typedef {Object} Discount
 * @property {number} discount_id
 * @property {number} product_id
 * @property {boolean} flash_sale
 * @property {string} description
 * @property {number} discount_rate
 */

/**
 * Get all
 */
export async function getAll() {
  const sql = `
    SELECT discount_id, product_id, flash_sale, description, discount_rate
    FROM discount
  `
  const result = await pool.query(sql)
  return result.rows
}

/**
 * Get by id
 */
export async function getById(id) {
  const sql = `
    SELECT discount_id, product_id, flash_sale, description, discount_rate
    FROM discount
    WHERE discount_id = $1
  `
  const result = await pool.query(sql, [id])
  return result.rows[0] || null
}
