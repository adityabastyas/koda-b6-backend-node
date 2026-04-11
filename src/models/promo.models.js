import { db } from "../lib/db.js"

/**
 * Get all promo
 */
export async function GetAllPromo() {
  const sql = `SELECT promo_id, title, description, promo_type, discount_value FROM promo`
  const result = await db().query(sql)
  return result.rows ?? null
}

/**
 * Get promo by id
 */
export async function GetPromoId(id) {
  const sql = `SELECT promo_id, title, description, promo_type, discount_value FROM promo WHERE promo_id = $1`
  const result = await db().query(sql, [id])
  return result.rows ?? null
}

/**
 * Create promo
 */
export async function CreatePromo(data) {
  const { title, description, promo_type, discount_value } = data

  const sql = `
    INSERT INTO promo (title, description, promo_type, discount_value)
    VALUES ($1, $2, $3, $4)
    RETURNING *`

  const result = await db().query(sql, [
    title,
    description,
    promo_type,
    discount_value
  ])

  return result.rows[0]
}

/**
 * Update promo
 */
export async function UpdatePromo(id, data) {
  const { title, description, promo_type, discount_value } = data

  const sql = `
    UPDATE promo
    SET title = $2,
        description = $3,
        promo_type = $4,
        discount_value = $5
    WHERE promo_id = $1
    RETURNING *`

  const result = await db().query(sql, [
    id,
    title,
    description,
    promo_type,
    discount_value
  ])

  return result.rows[0] ?? null
}

/**
 * Delete promo
 */
export async function DeletePromo(id) {
  const sql = `DELETE FROM promo WHERE promo_id = $1 RETURNING *`
  const result = await db().query(sql, [id])
  return result.rows[0] ?? null
}