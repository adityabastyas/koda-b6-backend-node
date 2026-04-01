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

export async function GatAllProduct() {
  const sql = `SELECT product_id, kategory_id, name, description, price, image_url FROM products`

  const result = await db().query(sql)
  return result.rows ?? null
  
}