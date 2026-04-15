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
