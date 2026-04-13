import { db } from "../lib/db.js"

/**
 * 
 * ambil semua cart
 */
export async function GetAllCart() {
  const sql = `SELECT cart_id, user_id FROM carts`
  const result = await db().query(sql)
  return result.rows ?? null
}