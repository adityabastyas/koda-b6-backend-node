import * as pm from "../models/promo.models.js"
import { constants } from "node:http2"

/**
 * GET ALL
 */
export async function getAll(req, res) {
  try {
    const promos = await pm.getAll()

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "success",
      result: promos
    })
  } catch (err) {
    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    })
  }
}

/**
 * GET BY ID
 */
export async function getById(req, res) {
  try {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "id harus berupa angka"
      })
    }

    const promo = await pm.getById(id)

    if (!promo) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: "promo tidak ditemukan"
      })
    }

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "success",
      result: promo
    })
  } catch (err) {
    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    })
  }
}

/**
 * CREATE
 */
export async function create(req, res) {
  try {
    const { title, promo_type, discount_value } = req.body

    if (!title) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "title tidak boleh kosong"
      })
    }

    if (!promo_type) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "promo type tidak boleh kosong"
      })
    }

    if (!discount_value || discount_value <= 0) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "discount value tidak valid"
      })
    }

    const promo = await pm.create(req.body)

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "promo berhasil ditambahkan",
      result: promo
    })
  } catch (err) {
    return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: err.message
    })
  }
}

/**
 * UPDATE
 */
export async function update(req, res) {
  try {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "id harus berupa angka"
      })
    }

    const { title, discount_value } = req.body

    if (!title) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "title tidak boleh kosong"
      })
    }

    if (!discount_value || discount_value <= 0) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "discount value tidak valid"
      })
    }

    const updated = await pm.update(id, req.body)

    if (!updated) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: "promo tidak ditemukan"
      })
    }

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "promo berhasil diupdate",
      result: updated
    })
  } catch (err) {
    return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: err.message
    })
  }
}

/**
 * DELETE
 */
export async function remove(req, res) {
  try {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "id harus berupa angka"
      })
    }

    const deleted = await pm.remove(id)

    if (!deleted) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: "promo tidak ditemukan"
      })
    }

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "promo berhasil dihapus",
      result: deleted
    })
  } catch (err) {
    return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: err.message
    })
  }
}