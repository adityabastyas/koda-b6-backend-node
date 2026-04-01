import { db } from "../lib/db.js"

/**
 * @typedef Product 
 * @property {int} product_id
 * @property {int} kategory_id
 * @property {string} name
 * @property {string} description
 * @property {int} price
 * @property {string} image_url
 */


/**
 * Get all product
 * @returns {Promise<Product>}
 */

export async function GetAllProduct() {
  const sql = `SELECT product_id, kategory_id, name, description, price, image_url FROM products`

  const result = await db().query(sql)
  return result.rows ?? null
}

/**
 * get product id
 * @param {int} productId 
 * @returns {Promise<Product[]>}
 */
export async function GetProductId(productId) {
  const sql = `SELECT product_id, kategory_id, name, description, price, image_url FROM products WHERE product_id = $1`
  const values = [productId]
  const result = await db().query(sql, values)
  return result.rows ?? null
}

/**
 * seacrh product by name
 * @param {string} productName 
 * @returns {Promise<Product[]>}
 */
export async function GetProductName(productName) {
  const sql = `SELECT product_id, kategory_id, name, description, price, image_url FROM products WHERE name ILIKE $1`
  const values = [`%${productName}%`]
  const result = await db().query(sql, values)
  return result.rows ?? null
}