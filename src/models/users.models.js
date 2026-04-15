import pool from "../lib/db.js"

/**
 * @typedef {Object} User
 * @property {number} user_id
 * @property {string} full_name
 * @property {string} email
 * @property {string|undefined} password
 * @property {string|null} address
 * @property {string|null} phone
 * @property {string|null} profile_pic
 * @property {Date} created_at
 * @property {string} role
 */

/**
 * Get all users
 * @returns {Promise<User[]>}
 */
export async function getAll() {
  const result = await pool.query(
    `SELECT user_id, full_name, email, address, phone, profile_pic, created_at, role
     FROM users
     ORDER BY user_id ASC`
  )
  return result.rows
}


/**
 * Find user by email
 * @param {string} email
 * @returns {Promise<User|null>}
 */
export async function findByEmail(email) {
  const result = await pool.query(
    `SELECT user_id, full_name, email, password, address, phone, profile_pic, created_at, role
     FROM users
     WHERE email = $1`,
    [email]
  )
  return result.rows[0] || null
}

/**
 * @param {Object} data
 * @returns {Promise<Pick<User, "user_id" | "full_name" | "email" | "role">>}
 */
export async function save(data) {
  const {
    full_name,
    email,
    password,
  } = data

  const result = await pool.query(
    `INSERT INTO users (full_name, email, password)
     VALUES ($1, $2, $3)
     RETURNING user_id, full_name, email, role`,
    [full_name, email, password]
  )
  return result.rows[0]
}

/**
 * Update profile
 * @param {number} user_id
 * @param {Object} data
 * @returns {Promise<void>}
 */
export async function updateProfile(user_id, data) {
  const { full_name, email, phone, address } = data

  await pool.query(`
    UPDATE users
    SET full_name = $1,
        email = $2,
        phone = $3,
        address = $4
    WHERE user_id = $5
  `, [full_name, email, phone, address, user_id])
}

/**
 * Update profile picture
 * @param {number} user_id
 * @param {string} path
 * @returns {Promise<void>}
 */
export async function updateProfilePic(user_id, path) {
  await pool.query(`
    UPDATE users
    SET profile_pic = $1
    WHERE user_id = $2
  `, [path, user_id])
}

/**
 * Update password
 * @param {string} email
 * @param {string} newPassword
 * @returns {Promise<void>}
 */
export async function updatePassword(email, newPassword) {
  await pool.query(`
    UPDATE users
    SET password = $1
    WHERE email = $2
  `, [newPassword, email])
}