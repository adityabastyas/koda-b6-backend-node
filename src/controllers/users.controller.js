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
export async function getAllUsers(req, res) {
  try {
    const users = await userModel.getAllUsers()
    res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      data: users
    })
  } catch (error) {
    console.error("Get all users error:", error)
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error"
    })
  }
}

/**
 * Get user by ID
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function getUserById(req, res) {
  try {
    const user_id = parseInt(req.params.id)
    const user = await userModel.getUserById(user_id)

    if (!user) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: "User not found"
      })
    }

    res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      data: user
    })
  } catch (error) {
    console.error("Get user by id error:", error)
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error"
    })
  }
}

/**
 * Create new user
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function createUser(req, res) {
  try {
    const { full_name, email, password, address, phone, profile_pic } = req.body

    if (!full_name || !email || !password) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "Full name, email, and password are required"
      })
    }

    const existingUser = await userModel.findUserByEmail(email)
    if (existingUser) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "Email already exists"
      })
    }

    const newUser = await userModel.createUser({
      full_name, email, password, address, phone, profile_pic
    })

    res.status(constants.HTTP_STATUS_CREATED).json({
      success: true,
      message: "User created successfully",
      data: newUser
    })
  } catch (error) {
    console.error("Create user error:", error)
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error"
    })
  }
}

/**
 * Update user
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function updateUser(req, res) {
  try {
    const user_id = parseInt(req.params.id)
    const { full_name, email, password, address, phone, profile_pic } = req.body

    if (email !== undefined) {
      const existingUser = await userModel.findUserByEmail(email)
      if (existingUser && existingUser.user_id !== user_id) {
        return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          success: false,
          message: "Email already exists"
        })
      }
    }

    const updateData = {}
    if (full_name !== undefined) updateData.full_name = full_name
    if (email !== undefined) updateData.email = email
    if (password !== undefined) updateData.password = password
    if (address !== undefined) updateData.address = address
    if (phone !== undefined) updateData.phone = phone
    if (profile_pic !== undefined) updateData.profile_pic = profile_pic

    const updatedUser = await userModel.updateUser(user_id, updateData)

    if (!updatedUser) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: "User not found"
      })
    }

    res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser
    })
  } catch (error) {
    console.error("Update user error:", error)
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error"
    })
  }
}

/**
 * Delete user
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function deleteUser(req, res) {
  try {
    const user_id = parseInt(req.params.id)
    const deletedUser = await userModel.deleteUser(user_id)

    if (!deletedUser) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: "User not found"
      })
    }

    res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser
    })
  } catch (error) {
    console.error("Delete user error:", error)
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error"
    })
  }
}