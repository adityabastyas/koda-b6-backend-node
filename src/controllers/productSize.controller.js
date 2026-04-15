import * as pm from "../models/productSize.models.js"
import { constants } from "node:http2"

/**
 * GET BY PRODUCT ID
 */
export async function getByProductId(req, res) {
  try {
    const productId = parseInt(req.params.product_id)

    if (isNaN(productId)) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "product id harus berupa angka"
      })
    }

    const sizes = await pm.getByProductId(productId)

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "success",
      result: sizes
    })
  } catch (err) {
    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    })
  }
}

/**
 * GET BY ID
 */
export async function getById(req, res) {
  try {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "id harus berupa angka"
      })
    }

    const size = await pm.getById(id)

    if (!size) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: "size tidak ditemukan"
      })
    }

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "success",
      result: size
    })
  } catch (err) {
    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    })
  }
}
