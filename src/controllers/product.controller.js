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

/**
 * CREATE PRODUCT
 */
export async function CreateProduct(req, res) {
  const { kategory_id, name, description, price, image_url } = req.body

  if (!kategory_id || !name || !price) {
    return res.json({
      success: false,
      message: "kategory_id, name, price wajib",
      result: null
    })
  }

  const data = await pm.CreateProduct({
    kategory_id,
    name,
    description,
    price,
    image_url
  })

  return res.json({
    success: true,
    message: "berhasil tambah product",
    result: data
  })
}

export async function UpdateProduct(req, res) {
  const { kategory_id, name, description, price, image_url } = req.body

  const data = await pm.UpdateProduct(req.params.id, {
    kategory_id,
    name,
    description,
    price,
    image_url
  })

  if (!data) {
    return res.json({
      success: false,
      message: "gagal update product",
      result: null
    })
  }

  return res.json({
    success: true,
    message: "berhasil update product",
    result: data
  })
}