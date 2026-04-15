import jwt from "jsonwebtoken"

const secretKey = process.env.JWT_SECRET

/**
 * @typedef {Object} JWTPayload
 * @property {number} user_id
 * @property {string} role
 * @property {number} iat
 * @property {number} exp
 */

/**
 * Generate JWT token
 * @param {number} user_id
 * @param {string} role
 * @returns {string}
 */

export function GenerateToken(user_id, role) {
  return jwt.sign(
    {
      user_id,
      role
    },
    secretKey,
    {
      expiresIn: "10m"
    }
  )
}

/**
 * Verify JWT token
 * @param {string} token
 * @returns {JWTPayload}
 * @throws {Error} if token invalid
 */
export function VerifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey)
    return decoded
  } catch {
    throw new Error("token tidak valid")
  }
}