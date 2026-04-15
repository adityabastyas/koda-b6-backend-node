import * as forgotModel from "../models/forgotPassword.models.js"
import * as userModel from "../models/users.models.js"
import { constants } from "node:http2"


export async function requestForgotPassword(req, res) {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "email tidak boleh kosong"
      })
    }

    const user = await userModel.findByEmail(email)

    if (!user) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "email tidak ditemukan"
      })
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString()

    console.log("OTP CODE:", code)

    await forgotModel.removeByEmail(email)

    await forgotModel.create(email, code)

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "code berhasil dikirim"
    })
  } catch (err) {
    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    })
  }
}

