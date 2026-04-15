import pool from "../lib/db.js"

/**
 * @typedef {Object} Product 
 * @property {number} product_id
 * @property {number} kategory_id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {string} image_url
 */


/**
 * Get all product
 * @returns {Promise<Product[]>}
 */

export async function getAll() {
  const sql = `SELECT product_id, kategory_id, name, description, price, image_url FROM products`

  const result = await pool.query(sql)
  return result.rows
}

/**
 * get product id
 * @param {number} productId 
 * @returns {Promise<Product|null>}
 */
export async function getById(productId) {
  const sql = `SELECT product_id, kategory_id, name, description, price, image_url FROM products WHERE product_id = $1`
  const values = [productId]
  const result = await pool.query(sql, values)
  return result.rows[0] || null
}


/**
 * Create product
 * @param {Object} data
 * @returns {Promise<Product>}
 */
export async function create(data) {
  const { kategory_id, name, description, price, image_url } = data

  const sql = `
    INSERT INTO products (kategory_id, name, description, price, image_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING product_id, kategory_id, name, description, price, image_url`

  const result = await pool.query(sql, [
    kategory_id,
    name,
    description,
    price,
    image_url
  ])

  return result.rows[0]
}

/**
 * Update product
 * @param {number} id
 * @param {Object} data
 * @returns {Promise<Product|null>}
 */
export async function update(id, data) {
  const { kategory_id, name, description, price, image_url } = data

  const sql = `
    UPDATE products
    SET kategory_id = $2,
        name = $3,
        description = $4,
        price = $5,
        image_url = $6
    WHERE product_id = $1
    RETURNING product_id, kategory_id, name, description, price, image_url`

  const result = await pool.query(sql, [
    id,
    kategory_id,
    name,
    description,
    price,
    image_url
  ])

  return result.rows[0] || null
}

/**
 * Delete product
 * @param {number} id
 * @returns {Promise<Product|null>}
 */
export async function remove(id) {
  const sql = `DELETE FROM products WHERE product_id = $1 RETURNING product_id, kategory_id, name, description, price, image_url`
  const result = await pool.query(sql, [id])
  return result.rows[0] || null
}