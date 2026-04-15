import * as cim from "../models/cartItem.models.js"
import * as cm from "../models/cart.models.js"
import { constants } from "node:http2"

/**
 * GET MY CART ITEMS
 */
export async function getMyItems(req, res) {
  try {
    const userId = res.locals.id

    const cart = await cm.getByUserId(userId)

    if (!cart) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: "cart tidak ditemukan"
      })
    }

    const items = await cim.getByCartId(cart.cart_id)

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "success",
      result: items
    })
  } catch (err) {
    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    })
  }
}

/**
 * ADD ITEM TO CART
 */
export async function create(req, res) {
  try {
    const userId = res.locals.id
    const { product_id, quantity } = req.body

    if (!product_id || product_id <= 0) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "product id tidak valid"
      })
    }

    if (!quantity || quantity <= 0) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "quantity tidak valid"
      })
    }

    const cart = await cm.getByUserId(userId)

    if (!cart) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: "cart tidak ditemukan"
      })
    }

    const item = await cim.create(cart.cart_id, req.body)

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "item berhasil ditambahkan ke cart",
      result: item
    })
  } catch (err) {
    return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: err.message
    })
  }
}
