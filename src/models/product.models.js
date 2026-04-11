import { db } from "../lib/db.js"

/**
 * @typedef Product 
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

export async function GetAllProduct() {
  const sql = `SELECT product_id, kategory_id, name, description, price, image_url FROM products`

  const result = await db().query(sql)
  return result.rows ?? null
}

/**
 * get product id
 * @param {number} productId 
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

export async function CreateProduct(data) {
  const { kategory_id, name, description, price, image_url } = data

  const sql = `
    INSERT INTO products (kategory_id, name, description, price, image_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`

  const result = await db().query(sql, [
    kategory_id,
    name,
    description,
    price,
    image_url
  ])

  return result.rows[0]
}

export async function UpdateProduct(id, data) {
  const { kategory_id, name, description, price, image_url } = data

  const sql = `
    UPDATE products
    SET kategory_id = $2,
        name = $3,
        description = $4,
        price = $5,
        image_url = $6
    WHERE product_id = $1
    RETURNING *`

  const result = await db().query(sql, [
    id,
    kategory_id,
    name,
    description,
    price,
    image_url
  ])

  return result.rows[0] ?? null
}

export async function DeleteProduct(id) {
  const sql = `DELETE FROM products WHERE product_id = $1 RETURNING *`
  const result = await db().query(sql, [id])
  return result.rows[0] ?? null
}