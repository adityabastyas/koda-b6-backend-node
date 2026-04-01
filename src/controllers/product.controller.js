import * as pm from "../models/product.models.js"

/**
 * 
 * @param {import ("express").Request} req 
 * @param {import ("express").Response} res 
 * @returns 
 */
export async function GetAllProduct(req, res) {
  const products = await pm.GatAllProduct()

  if (!products) {
    return res.json({
    "success" : false,
    "message" : "gagal mengambil semua product",
    "result" : null
  })
  }

  return res.json({
    "success" : true,
    "message" : "berhasil mengambil semua product",
    "result" : products
  })
}

export async function GetProductId(req, res) {
  const productId = await pm.GetProductId(req.params.id)

  if (!productId){
    return res.json({
      "succes" : false,
      "message" : "product id tidak ditemukan",
      "result" : null
    })
  }

  return res.json({
    "success" : true,
    "message" : "berhasil mendapatkan id",
    "result" : productId
  })
  
}