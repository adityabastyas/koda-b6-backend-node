import pool from "../lib/db.js"

/**
 * @typedef {Object} Cart
 * @property {number} cart_id
 * @property {number} user_id
 */

/**
 * 
 * Get all cart
 * @returns {Promise<Cart[]>}
 * 
 */
export async function getAll() {
  const sql = `SELECT cart_id, user_id FROM cart`

  const result = await pool.query(sql)
  return result.rows
}

/**
 * get cart by user id
 * @param {number} userId 
 * @returns {Promise<Cart|null>}
 */
export async function getByUserId(userId){
  const sql = `SELECT cart_id, user_id FROM cart WHERE user_id = $1`
  const values = [userId]

  const result = await pool.query(sql, values)
  return result.rows[0] || null
}


/**
 * create cart
 * @param {number} userId 
 * @returns {Promise<Cart>}
 */
export async function create(userId) {
  const sql = `INSERT INTO cart (user_id) VALUES ($1) RETURNING cart_id, user_id`

  const values = [userId]

  const result = await pool.query(sql, values)
  return result.rows[0]
  
}
