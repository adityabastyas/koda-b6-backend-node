import pool from "../lib/db.js"

/**
 * @typedef {Object} Reviews
 * @property {number} reviews_id
 * @property {number} product_id
 * @property {number} user_id
 * @property {string} message
 * @property {number} rating
 * @property {string} full_name
 * @property {string|null} profile_pic
 */

/**
 * Get all reviews
 */
export async function getAll() {
  const sql = `
    SELECT 
      r.reviews_id,
      r.product_id,
      r.user_id,
      r.message,
      r.rating,
      u.full_name,
      u.profile_pic
    FROM reviews r
    JOIN users u ON r.user_id = u.user_id
    ORDER BY r.reviews_id DESC
    LIMIT 10
  `

  const result = await pool.query(sql)
  return result.rows
}


export async function getByProductId(productId) {
  const sql = `
    SELECT 
      r.reviews_id,
      r.product_id,
      r.user_id,
      r.message,
      r.rating,
      u.full_name,
      u.profile_pic
    FROM reviews r
    JOIN users u ON r.user_id = u.user_id
    ORDER BY r.reviews_id DESC
    LIMIT 10
  `

  const result = await pool.query(sql, [productId])
  return result.rows
}

export async function getByUserId(userId) {
  const sql = `
    SELECT 
      r.reviews_id,
      r.product_id,
      r.user_id,
      r.message,
      r.rating,
      u.full_name,
      u.profile_pic
    FROM reviews r
    JOIN users u ON r.user_id = u.user_id
    ORDER BY r.reviews_id DESC
    LIMIT 10
  `

  const result = await pool.query(sql, [userId])
  return result.rows
}

/**
 * Create review
 */
export async function create(userId, data) {
  const { product_id, message, rating } = data

  const sql = `
    INSERT INTO reviews (product_id, user_id, message, rating)
    VALUES ($1, $2, $3, $4)
  `

  await pool.query(sql, [product_id, userId, message, rating])
}

/**
 * Delete review
 */
export async function remove(id) {
  const sql = `DELETE FROM reviews WHERE reviews_id = $1`
  await pool.query(sql, [id])
}