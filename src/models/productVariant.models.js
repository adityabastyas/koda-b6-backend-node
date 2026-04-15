import pool from "../lib/db.js"

/**
 * @typedef {Object} ProductVariant
 * @property {number} variant_id
 * @property {number} product_id
 * @property {string} temperature
 * @property {number} add_price
 */

/**
 * Get by product id
 */
export async function getByProductId(productId) {
  const sql = `
    SELECT variant_id, product_id, temperature, add_price
    FROM product_variant
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
    SELECT variant_id, product_id, temperature, add_price
    FROM product_variant
    WHERE variant_id = $1
  `

  const result = await pool.query(sql, [id])
  return result.rows[0] || null
}

/**
 * Create
 */
export async function create(data) {
  const { product_id, temperature, add_price } = data

  const sql = `
    INSERT INTO product_variant (product_id, temperature, add_price)
    VALUES ($1, $2, $3)
    RETURNING variant_id, product_id, temperature, add_price
  `

  const result = await pool.query(sql, [
    product_id,
    temperature,
    add_price
  ])

  return result.rows[0]
}
