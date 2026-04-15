import * as rm from "../models/reviews.models.js"
import { constants } from "node:http2"

/**
 * GET ALL
 */
export async function GetAll(req, res) {
  try {
    const data = await rm.getAll()

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "success",
      result: data
    })
  } catch (err) {
    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    })
  }
}

/**
 * GET BY PRODUCT ID
 */
export async function GetByProductId(req, res) {
  const id = parseInt(req.params.product_id)

  if (isNaN(id)) {
    return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: "product id harus berupa angka"
    })
  }

  const data = await rm.getByProductId(id)

  return res.status(constants.HTTP_STATUS_OK).json({
    success: true,
    message: "success",
    result: data
  })
}

/**
 * GET BY USER ID
 */
export async function GetByUserId(req, res) {
  const id = parseInt(req.params.user_id)

  if (isNaN(id)) {
    return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: "user id harus berupa angka"
    })
  }

  const data = await rm.getByUserId(id)

  return res.status(constants.HTTP_STATUS_OK).json({
    success: true,
    message: "success",
    result: data
  })
}
