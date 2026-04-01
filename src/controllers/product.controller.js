import { db } from "../lib/db.js"
import * as pm from "../models/product.models.js"

/**
 * 
 * @param {import ("express").Request} req 
 * @param {import ("express").Response} res 
 * @returns 
 */
export async function GetAllProduct(req, res) {

  const {name} = req.query
  if (name){
    const product =  await pm.GetProductName(name)
    if (product.length < 1) {
      return res.json({
      "success" : false,
    "message" : "gagal mengambil product",
    "result" : null
    })
    }
    return res.json({
      "success" : true,
    "message" : "berhasil mengambil product",
    "result" : product
    })
  }

  const products = await pm.GetAllProduct()

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

/**
 * 
 * @param {import ("express").Request} req 
 * @param {import ("express").Response} res 
 * @returns 
 */
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

/**
 * 
 * @param {import ("express").Request} req 
 * @param {import ("express").Response} res 
 */
export async function GetProductName(req, res) {
  console.log(req)
  const productName = await pm.GetProductName()

  if (!productName){
    return res.json({
      "succes" : false,
      "message" : "product name tidak ada",
      "result" : null
    })
  }

  return res.json({
    "success" : true,
    "message" : "product name ditemukan",
    "result" : productName
  })

  
}