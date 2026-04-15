import * as pm from "../models/productImages.models.js"
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

    const images = await pm.getByProductId(productId)

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "success",
      result: images
    })
  } catch (err) {
    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    })
  }
}
