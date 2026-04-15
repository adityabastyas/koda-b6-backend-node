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

/**
 * CREATE
 */
export async function create(data) {
  const {
    user_id,
    promo_id,
    fullname,
    email,
    address,
    delivery_type,
    subtotal,
    tax,
    total
  } = data

  const sql = `
    INSERT INTO transaction
    (user_id, promo_id, fullname, email, address, delivery_type, subtotal, tax, total)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING transaction_id, user_id, promo_id, fullname, email, address,
              delivery_type, subtotal, tax, total, tanggal
  `

  const result = await pool.query(sql, [
    user_id,
    promo_id,
    fullname,
    email,
    address,
    delivery_type,
    subtotal,
    tax,
    total
  ])

  return result.rows[0]
}

/**
 * DELETE
 */
export async function remove(id) {
  const sql = `DELETE FROM transaction WHERE transaction_id = $1`
  await pool.query(sql, [id])
}