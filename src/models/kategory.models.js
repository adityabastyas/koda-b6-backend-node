import { db } from "../lib/db.js"

/**
 * Get all kategory
 */
export async function GetAllKategory() {
  const sql = `SELECT kategory_id, name FROM kategory`
  const result = await db().query(sql)
  return result.rows ?? null
}

/**
 * Get kategory by id
 */
export async function GetKategoryId(id) {
  const sql = `SELECT kategory_id, name FROM kategory WHERE kategory_id = $1`
  const result = await db().query(sql, [id])
  return result.rows ?? null
}

/**
 * Create kategory
 */
export async function CreateKategory(name) {
  const sql = `INSERT INTO kategory (name) VALUES ($1) RETURNING *`
  const result = await db().query(sql, [name])
  return result.rows[0]
}

/**
 * Update kategory
 */
export async function UpdateKategory(id, name) {
  const sql = `UPDATE kategory SET name = $2 WHERE kategory_id = $1 RETURNING *`
  const result = await db().query(sql, [id, name])
  return result.rows[0] ?? null
}

/**
 * Delete kategory
 */
export async function DeleteKategory(id) {
  const sql = `DELETE FROM kategory WHERE kategory_id = $1 RETURNING *`
  const result = await db().query(sql, [id])
  return result.rows[0] ?? null
}