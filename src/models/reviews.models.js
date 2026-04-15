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

