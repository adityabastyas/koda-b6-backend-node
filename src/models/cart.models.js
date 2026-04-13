import { db } from "../lib/db.js"

/**
 * @typedef Cart
 * @property {number} cart_id
 * @property {number} user_id
 */

/**
 * 
 * Get all cart
 * @returns {Promise<Cart[]>}
 * 
 */
export async function GetAllCart() {
  const sql = `SELECT cart_id, user_id FROM carts`

  const result = await db().query(sql)
  return result.rows ?? null
}

/**
 * get cart id
 * @param {number} cartId 
 * @returns {Promise<Cart[]>}
 */
export async function GetCartId(cartId){
  const sql = `SELECT cart_id, user_id FROM carts WHERE cart_id = $1`
  const values = [cartId]

  const result = await db().query(sql, values)
  return result.rows ?? null
}

/**
 * get cart by user id
 * @param {number} userId 
 * @returns {Promise<Cart[]>}
 */
export async function GetCartUserId(userId) {
  const sql = `SELECT cart_id, user_id FROM cart WHERE user_id = $`
  const values = [userId]

  const result = await db().query(sql, values)
  return result.rows ?? null
  
}