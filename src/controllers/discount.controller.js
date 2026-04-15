import * as dm from "../models/discount.models.js"
import { constants } from "node:http2"

/**
 * GET ALL
 */
export async function getAll(req, res) {
  try {
    const data = await dm.getAll()

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "success",
      result: data
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

    const data = await dm.getById(id)

    if (!data) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: "discount tidak ditemukan"
      })
    }

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "success",
      result: data
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
    const {
      product_id,
      discount_rate
    } = req.body || {}

    if (!product_id || product_id <= 0) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "product id tidak valid"
      })
    }

    if (!discount_rate || discount_rate <= 0) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "discount rate tidak valid"
      })
    }

    await dm.create(req.body)

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "discount berhasil ditambahkan"
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

    const {
      product_id,
      discount_rate
    } = req.body || {}

    if (!product_id || product_id <= 0) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "product id tidak valid"
      })
    }

    if (!discount_rate || discount_rate <= 0) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "discount rate tidak valid"
      })
    }

    const updated = await dm.update(id, req.body)

    if (!updated) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: "discount tidak ditemukan"
      })
    }

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "discount berhasil diupdate"
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

    const deleted = await dm.remove(id)

    if (!deleted) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: "discount tidak ditemukan"
      })
    }

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "discount berhasil dihapus"
    })
  } catch (err) {
    return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: err.message
    })
  }
}