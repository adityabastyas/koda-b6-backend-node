import pool from "../lib/db.js"

/**
 * GET BY TRANSACTION ID
 */
export async function getByTransactionId(transactionId) {
  const sql = `
    SELECT transaction_product_id, transaction_id, product_id,
           variant_id, product_size_id, quantity, price_at_purchase
    FROM transaction_product
    WHERE transaction_id = $1
  `
  const result = await pool.query(sql, [transactionId])
  return result.rows
}

/**
 * CREATE
 */
export async function create(transactionId, data) {
  const {
    product_id,
    variant_id,
    product_size_id,
    quantity,
    price_at_purchase
  } = data

  const sql = `
    INSERT INTO transaction_product
    (transaction_id, product_id, variant_id, product_size_id, quantity, price_at_purchase)
    VALUES ($1,$2,$3,$4,$5,$6)
  `

  await pool.query(sql, [
    transactionId,
    product_id,
    variant_id,
    product_size_id,
    quantity,
    price_at_purchase
  ])
}

/**
 * DELETE
 */
export async function remove(id) {
  const sql = `DELETE FROM transaction_product WHERE transaction_product_id = $1`
  await pool.query(sql, [id])
}