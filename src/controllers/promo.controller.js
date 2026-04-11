import * as pm from "../models/promo.models.js"

/**
 * GET ALL
 */
export async function GetAllPromo(req, res) {
  const data = await pm.GetAllPromo()

  if (!data) {
    return res.json({
      success: false,
      message: "gagal ambil promo",
      result: null
    })
  }

  return res.json({
    success: true,
    message: "berhasil ambil promo",
    result: data
  })
}

/**
 * GET BY ID
 */
export async function GetPromoId(req, res) {
  const data = await pm.GetPromoId(req.params.id)

  if (!data || data.length < 1) {
    return res.json({
      success: false,
      message: "promo tidak ditemukan",
      result: null
    })
  }

  return res.json({
    success: true,
    message: "berhasil ambil promo",
    result: data
  })
}

/**
 * CREATE
 */
export async function CreatePromo(req, res) {
  const { title, description, promo_type, discount_value } = req.body

  if (!title) {
    return res.json({
      success: false,
      message: "title wajib diisi",
      result: null
    })
  }

  const data = await pm.CreatePromo({
    title,
    description,
    promo_type,
    discount_value
  })

  return res.json({
    success: true,
    message: "berhasil tambah promo",
    result: data
  })
}

/**
 * UPDATE
 */
export async function UpdatePromo(req, res) {
  const { title, description, promo_type, discount_value } = req.body

  const data = await pm.UpdatePromo(req.params.id, {
    title,
    description,
    promo_type,
    discount_value
  })

  if (!data) {
    return res.json({
      success: false,
      message: "gagal update",
      result: null
    })
  }

  return res.json({
    success: true,
    message: "berhasil update",
    result: data
  })
}

/**
 * DELETE
 */
export async function DeletePromo(req, res) {
  const data = await pm.DeletePromo(req.params.id)

  if (!data) {
    return res.json({
      success: false,
      message: "gagal delete",
      result: null
    })
  }

  return res.json({
    success: true,
    message: "berhasil delete",
    result: data
  })
}