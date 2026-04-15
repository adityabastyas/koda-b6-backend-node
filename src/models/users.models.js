import { db } from "../lib/db.js"

/**
 * @typedef {Object} User
 * @property {number} user_id
 * @property {string} full_name
 * @property {string} email
 * @property {string} password
 * @property {string|null} address
 * @property {string|null} phone
 * @property {string|null} profile_pic
 * @property {Date} created_at
 */

/**
 * Get all users
 * @returns {Promise<User[]>}
 */
export async function getAllUsers() {
  const result = await db.query(
    `SELECT user_id, full_name, email, address, phone, profile_pic, created_at, role
     FROM users
     ORDER BY user_id ASC`
  )
  return result.rows
}

/**
 * Get user by id
 * @param {number} user_id
 * @returns {Promise<User|null>}
 */
export async function getUserById(user_id) {
  const result = await pool.query(
    `SELECT user_id, full_name, email, address, phone, profile_pic, created_at
     FROM users
     WHERE user_id = $1`,
    [user_id]
  )
  return result.rows[0] || null
}

/**
 * Find user by email
 * @param {string} email
 * @returns {Promise<User|null>}
 */
export async function findUserByEmail(email) {
  const result = await pool.query(
    `SELECT user_id, full_name, email, password, address, phone, profile_pic, created_at, role
     FROM users
     WHERE email = $1`,
    [email]
  )
  return result.rows[0] || null
}

/**
 * Create new user
 * @param {Object} data
 * @returns {Promise<User>}
 */
export async function createUser(data) {
  const {
    full_name,
    email,
    password,
    address = null,
    phone = null,
    profile_pic = null
  } = data

  const result = await pool.query(
    `INSERT INTO users (full_name, email, password, address, phone, profile_pic)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING user_id, full_name, email, address, phone, profile_pic, created_at`,
    [full_name, email, password, address, phone, profile_pic]
  )
  return result.rows[0]
}

/**
 * Update user by id
 * @param {number} user_id
 * @param {Object} data
 * @returns {Promise<User|null>}
 */
export async function updateUser(user_id, data) {
  const fields = []
  const values = [user_id]
  let paramCount = 2

  const allowedFields = ["full_name", "email", "password", "address", "phone", "profile_pic"]

  for (const key of allowedFields) {
    if (data[key] !== undefined) {
      fields.push(`${key} = $${paramCount}`)
      values.push(data[key])
      paramCount++
    }
  }

  if (fields.length === 0) {
    return getUserById(user_id)
  }

  const query = `
    UPDATE users SET ${fields.join(", ")}
    WHERE user_id = $1
    RETURNING user_id, full_name, email, address, phone, profile_pic, created_at`

  const result = await pool.query(query, values)
  return result.rows[0] || null
}

/**
 * Delete user by id
 * @param {number} user_id
 * @returns {Promise<User|null>}
 */
export async function deleteUser(user_id) {
  const result = await pool.query(
    `DELETE FROM users
     WHERE user_id = $1
     RETURNING user_id, full_name, email, address, phone, profile_pic, created_at`,
    [user_id]
  )
  return result.rows[0] || null
}