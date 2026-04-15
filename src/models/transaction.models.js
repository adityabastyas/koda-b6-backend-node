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
