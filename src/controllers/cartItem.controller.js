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

