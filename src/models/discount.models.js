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

/**
 * Create
 */
export async function create(data) {
  const { product_id, flash_sale, description, discount_rate } = data

  const sql = `
    INSERT INTO discount (product_id, flash_sale, description, discount_rate)
    VALUES ($1, $2, $3, $4)
    RETURNING discount_id, product_id, flash_sale, description, discount_rate
  `

  const result = await pool.query(sql, [
    product_id,
    flash_sale,
    description,
    discount_rate
  ])

  return result.rows[0]
}

/**
 * Update
 */
export async function update(id, data) {
  const { product_id, flash_sale, description, discount_rate } = data

  const sql = `
    UPDATE discount
    SET product_id = $2,
        flash_sale = $3,
        description = $4,
        discount_rate = $5
    WHERE discount_id = $1
    RETURNING discount_id, product_id, flash_sale, description, discount_rate
  `

  const result = await pool.query(sql, [
    id,
    product_id,
    flash_sale,
    description,
    discount_rate
  ])

  return result.rows[0] || null
}

/**
 * Delete
 */
export async function remove(id) {
  const sql = `
    DELETE FROM discount
    WHERE discount_id = $1
    RETURNING discount_id, product_id, flash_sale, description, discount_rate
  `

  const result = await pool.query(sql, [id])
  return result.rows[0] || null
}