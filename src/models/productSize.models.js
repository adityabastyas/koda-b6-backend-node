import pool from "../lib/db.js"

/**
 * @typedef {Object} ProductSize
 * @property {number} product_size_id
 * @property {number} product_id
 * @property {string} name
 * @property {number} add_price
 */

/**
 * Get by product id
 */
export async function getByProductId(productId) {
  const sql = `
    SELECT product_size_id, product_id, name, add_price
    FROM product_size
    WHERE product_id = $1
  `

  const result = await pool.query(sql, [productId])
  return result.rows
}

/**
 * Get by id
 */
export async function getById(id) {
  const sql = `
    SELECT product_size_id, product_id, name, add_price
    FROM product_size
    WHERE product_size_id = $1
  `

  const result = await pool.query(sql, [id])
  return result.rows[0] || null
}
