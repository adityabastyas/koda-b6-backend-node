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

/**
 * Create image
 * @param {Object} data
 * @returns {Promise<ProductImage>}
 */
export async function create(data) {
  const { product_id, path } = data

  const sql = `
    INSERT INTO product_images (product_id, path)
    VALUES ($1, $2)
    RETURNING product_images_id, product_id, path
  `

  const result = await pool.query(sql, [product_id, path])
  return result.rows[0]
}

/**
 * Delete image
 * @param {number} id
 * @returns {Promise<ProductImage|null>}
 */
export async function remove(id) {
  const sql = `
    DELETE FROM product_images
    WHERE product_images_id = $1
    RETURNING product_images_id, product_id, path
  `

  const result = await pool.query(sql, [id])
  return result.rows[0] || null
}