import pool from "../lib/db.js"

/**
 * @typedef {Object} CartItem
 * @property {number} cart_item_id
 * @property {number} cart_id
 * @property {number} product_id
 * @property {number} variant_id
 * @property {number} product_size_id
 * @property {number} quantity
 */

/**
 * Get cart items by cart id
 * @param {number} cartId
 * @returns {Promise<CartItem[]>}
 */
export async function getByCartId(cartId) {
  const result = await pool.query(
    `SELECT cart_item_id, cart_id, product_id, variant_id, product_size_id, quantity 
     FROM cart_item WHERE cart_id = $1`,
    [cartId]
  )

  return result.rows
}

/**
 * Create cart item
 */
export async function create(cartId, data) {
  const { product_id, variant_id, product_size_id, quantity } = data

  const result = await pool.query(
    `INSERT INTO cart_item (cart_id, product_id, variant_id, product_size_id, quantity)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [cartId, product_id, variant_id, product_size_id, quantity]
  )

  return result.rows[0]
}

/**
 * Update quantity
 */
export async function update(cartItemId, quantity) {
  const result = await pool.query(
    `UPDATE cart_item SET quantity = $1 WHERE cart_item_id = $2 RETURNING *`,
    [quantity, cartItemId]
  )

  return result.rows[0] || null
}

/**
 * Delete item
 */
export async function remove(cartItemId) {
  const result = await pool.query(
    `DELETE FROM cart_item WHERE cart_item_id = $1 RETURNING *`,
    [cartItemId]
  )

  return result.rows[0] || null
}