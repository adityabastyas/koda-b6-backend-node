import { constants } from "node:http2"
import * as userModel from "../models/users.models.js"
import { GenerateHash, VerifyHash } from "../lib/hash.js"
import { GenerateToken } from "../lib/jwt.js"

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 * Get all users
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function getAll(req, res) {
  try {
    const users = await userModel.getAll()
    res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message : "success",
      result: users
    })
  } catch (error) {
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error"
    })
  }
}

/**
 * Register user
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function register(req, res) {
  try {
    const { full_name, email, password } = req.body

    if (!email || !password) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "email & password tidak boleh kosong"
      })
    }

    const existingUser = await userModel.findByEmail(email)
    if (existingUser) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "email sudah terdaftar"
      })
    }

    const hashedPassword = await GenerateHash(password)

    await userModel.save({
      full_name,
      email,
      password: hashedPassword
    })

    res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "register success"
    })
  } catch (err) {
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    })
  }
}

/**
 * Login user
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body

    const user = await userModel.findByEmail(email)

    if (!user) {
      return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
        success: false,
        message: "email atau password salah"
      })
    }

    const valid = await VerifyHash(user.password, password)

    if (!valid) {
      return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
        success: false,
        message: "invalid email or password"
      })
    }

    const token = GenerateToken(user.user_id, user.role)

    const { password: _, ...safeUser } = user

    res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "login success",
      result: {
        user: safeUser,
        token
      }
    })
  } catch (err) {
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    })
  }
}

/**
 * Update profile
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function updateProfile(req, res) {
  try {
    const userId = res.locals.id

    await userModel.updateProfile(userId, req.body)

    res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "profile berhasil diupdate"
    })
  } catch (err) {
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: err.message
    })
  }
}

/**
 * Upload user profile picture
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function uploadPhoto(req, res) {
  try {
    if (!req.file) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "file tidak ditemukan"
      })
    }

    const path = "./uploads/" + req.file.filename
    const userId = res.locals.id

    await userModel.updateProfilePic(userId, path)

    res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "upload success",
      result: path
    })
  } catch (err) {
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    })
  }
}