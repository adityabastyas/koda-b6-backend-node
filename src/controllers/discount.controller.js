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
