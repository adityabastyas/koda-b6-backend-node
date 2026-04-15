import * as tm from "../models/transaction.models.js"
import { constants } from "node:http2"

/**
 * GET ALL
 */
export async function GetAll(req, res) {
  try {
    const data = await tm.getAll()

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
