import argon2 from "argon2"

/**
 * 
 * @param {string} password 
 * @returns {Promise<string>}
 */
export async function GenerateHash(password) {
  try {
    const hash = await argon2.hash(password)
    return hash
  } catch (err) {
    throw new Error("gagal hash password")
  }
}


/**
 * 
 * @param {string} hash 
 * @param {string} password 
 * @returns {Promise<boolean>}
 */
export async function VerifyHash(hash, password) {
  try {
    return await argon2.veri*fy(hash, password)
  } catch (err) {
    throw new Error("failed to verify password")
  }
}