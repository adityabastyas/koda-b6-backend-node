import * as pm from "../models/productVariant.models.js"
import { constants } from "node:http2"

/**
 * GET BY PRODUCT ID
 */
export async function getByProductId(req, res) {
  try {
    const productId = parseInt(req.params.product_id)

    if (isNaN(productId)) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "product id harus berupa angka"
      })
    }

    const variants = await pm.getByProductId(productId)

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "success",
      result: variants
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

    const variant = await pm.getById(id)

    if (!variant) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: "variant tidak ditemukan"
      })
    }

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "success",
      result: variant
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
      temperature,
      add_price
    } = req.body || {}

    if (!product_id || product_id <= 0) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "product id tidak valid"
      })
    }

    if (!temperature) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "temperature tidak boleh kosong"
      })
    }

    await pm.create(req.body)

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "variant berhasil ditambahkan"
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

    const { temperature } = req.body || {}

    if (!temperature) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "temperature tidak boleh kosong"
      })
    }

    const updated = await pm.update(id, req.body)

    if (!updated) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: "variant tidak ditemukan"
      })
    }

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "variant berhasil diupdate"
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
        message: "variant tidak ditemukan"
      })
    }

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "variant berhasil dihapus"
    })
  } catch (err) {
    return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: err.message
    })
  }
}