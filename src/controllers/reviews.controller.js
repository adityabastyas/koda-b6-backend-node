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

/**
 * CREATE
 */
export async function Create(req, res) {
  const userId = parseInt(req.params.user_id)
  const { product_id, message, rating } = req.body

  if (isNaN(userId)) {
    return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: "user id harus berupa angka"
    })
  }

  if (!product_id || product_id <= 0) {
    return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: "product id tidak valid"
    })
  }

  if (!message) {
    return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: "message tidak boleh kosong"
    })
  }

  if (rating < 1 || rating > 5) {
    return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: "rating harus antara 1-5"
    })
  }

  await rm.create(userId, req.body)

  return res.status(constants.HTTP_STATUS_OK).json({
    success: true,
    message: "review berhasil ditambahkan"
  })
}
