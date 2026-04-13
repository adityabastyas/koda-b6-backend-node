import * as cm from "../models/cart.models.js"

/**
 * GET ALL
 */
export async function GetAllCart(req, res) {
  const data = await cm.GetAllCart()

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

/**
 * get by id
 */

export async function GetCartId(req, res) {
  const data = await cm.GetCartId(req.params.id)

  if (!data || data.length < 1) {
    return res.json({
      success : false,
      message : "cart tidak ditemukan",
      result : null
    })
  }

  return res.json({
    success : true,
    message : "berhasil ambil cart",
    result : data
  })
  
}

/**
 * get by user id
 */
export async function GetCartUserId(req, res) {
  const data = await cm.GetCartUserId(req.params.user_id)

  if (!data || data.length < 1){
    return res.json({
      success: false, 
      message : "cart user tidak ditemukan",
      result : null
    })
  }

  return res.json({
    success : true, 
    message : "berhasil ambil cart user",
    return : data
  })
  
}

/**
 * Delete
 */
export async function DeleteCart(req, res) {
  const data = await cm.DeleteCart(req.params.id)

  if(!data){
    return res.json({
      success : false,
      message : "gagal delete cart",
      result : null
    })
  }

  return res.json({
    success : true,
    message : "berhasil delete cart",
    result : data
  })
  
}