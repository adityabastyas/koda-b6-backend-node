import * as cm from "../models/cart.models.js"
import { constants } from "node:http2"

/**
 * GET ALL CART (ADMIN ONLY OPTIONAL)
 */
export async function getAll(req, res) {
  try {
    const carts = await cm.getAll()

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "success",
      result: carts
    })
  } catch (err) {
    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    })
  }
}

/**
 * GET MY CART (USER LOGIN)
 */
export async function getMyCart(req, res) {
  try {
    const userId = res.locals.id

    if (!userId) {
      return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
        success: false,
        message: "unauthorized"
      })
    }

    const cart = await cm.getByUserId(userId)

    if (!cart) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: "cart tidak ditemukan"
      })
    }

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "success",
      result: cart
    })
  } catch (err) {
    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    })
  }
}

/**
 * CREATE CART
 */
export async function create(req, res) {
  try {
    const userId = res.locals.id

    if (!userId) {
      return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
        success: false,
        message: "unauthorized"
      })
    }

    const existing = await cm.getByUserId(userId)

    if (existing) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "cart sudah ada"
      })
    }

    const cart = await cm.create(userId)

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "cart berhasil dibuat",
      result: cart
    })
  } catch (err) {
    return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: err.message
    })
  }
}