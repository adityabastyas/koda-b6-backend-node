import { constants } from "node:http2"
import * as userModel from "../models/users.models.js"


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