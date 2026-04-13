import * as cm from "../models/cart.models.js"

/**
 * GET ALL
 */

export async function GetAllCart(req, res) {
  const data = await cm.GetAllCart

  if (!data) {
    return res.json({
      success : false,
      message : "gagal ambil cart",
      result : null
    })
  }

  return res.json({
    success : true,
    message : "berhasil ambil cart",
    result : data
  })
  
}