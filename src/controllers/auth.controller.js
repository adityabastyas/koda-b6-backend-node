import * as forgotModel from "../models/forgotPassword.models.js"
import * as userModel from "../models/users.models.js"
import { constants } from "node:http2"
import { GenerateHash } from "../lib/hash.js"

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


export async function resetPassword(req, res) {
  try {
    const { code, new_password } = req.body
    const email = req.query.email

    if (!email) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "email tidak boleh kosong"
      })
    }

    if (!code || !new_password || new_password.length < 6) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "password minimal 6 karakter"
      })
    }

    const data = await forgotModel.getByEmailAndCode(email, code)

    if (!data) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "code tidak valid atau sudah expired"
      })
    }

    if (Date.now() - new Date(data.created_at) > 5 * 60 * 1000) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
       success: false,
       message: "OTP expired"
     })
    }

    const hashed = await GenerateHash(new_password)

    await userModel.updatePassword(email, hashed)

    await forgotModel.removeByCode(code)

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "password berhasil direset"
    })
  } catch (err) {
    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    })
  }
}

