import pool from "../lib/db.js"

/**
 * GET ALL
 */
export async function getAll() {
  const sql = `
    SELECT transaction_id, user_id, promo_id, fullname, email, address,
           delivery_type, subtotal, tax, total, tanggal
    FROM transaction
  `
  const result = await pool.query(sql)
  return result.rows
}

/**
 * GET BY ID
 */
export async function getById(id) {
  const sql = `
    SELECT transaction_id, user_id, promo_id, fullname, email, address,
           delivery_type, subtotal, tax, total, tanggal
    FROM transaction
    WHERE transaction_id = $1
  `
  const result = await pool.query(sql, [id])
  return result.rows[0] || null
}

/**
 * GET BY USER
 */
export async function getByUserId(userId) {
  const sql = `
    SELECT transaction_id, user_id, promo_id, fullname, email, address,
           delivery_type, subtotal, tax, total, tanggal
    FROM transaction
    WHERE user_id = $1
  `
  const result = await pool.query(sql, [userId])
  return result.rows
}
