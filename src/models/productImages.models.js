import pool from "../lib/db.js"

/**
 * @typedef {Object} ProductImage
 * @property {number} product_images_id
 * @property {number} product_id
 * @property {string} path
 */

/**
 * Get images by product id
 * @param {number} productId
 * @returns {Promise<ProductImage[]>}
 */
export async function getByProductId(productId) {
  const sql = `
    SELECT product_images_id, product_id, path
    FROM product_images
    WHERE product_id = $1
  `

  const result = await pool.query(sql, [productId])
  return result.rows
}
