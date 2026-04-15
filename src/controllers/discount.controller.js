import * as dm from "../models/discount.models.js"
import { constants } from "node:http2"

/**
 * GET ALL
 */
export async function getAll(req, res) {
  try {
    const data = await dm.getAll()

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

    const data = await dm.getById(id)

    if (!data) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: "discount tidak ditemukan"
      })
    }

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
