import * as km from "../models/kategory.models.js"

/**
 * GET ALL
 */
export async function GetAllKategory(req, res) {
  const data = await km.GetAllKategory()

  if (!data) {
    return res.json({
      success: false,
      message: "gagal ambil kategory",
      result: null
    })
  }

  return res.json({
    success: true,
    message: "berhasil ambil kategory",
    result: data
  })
}

/**
 * GET BY ID
 */
export async function GetKategoryId(req, res) {
  const data = await km.GetKategoryId(req.params.id)

  if (!data || data.length < 1) {
    return res.json({
      success: false,
      message: "kategory tidak ditemukan",
      result: null
    })
  }

  return res.json({
    success: true,
    message: "berhasil ambil kategory",
    result: data
  })
}

/**
 * CREATE
 */
export async function CreateKategory(req, res) {
  const { name } = req.body

  if (!name) {
    return res.json({
      success: false,
      message: "name wajib diisi",
      result: null
    })
  }

  const data = await km.CreateKategory(name)

  return res.json({
    success: true,
    message: "berhasil tambah kategory",
    result: data
  })
}

/**
 * UPDATE
 */
export async function UpdateKategory(req, res) {
  const { name } = req.body

  const data = await km.UpdateKategory(req.params.id, name)

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
export async function DeleteKategory(req, res) {
  const data = await km.DeleteKategory(req.params.id)

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