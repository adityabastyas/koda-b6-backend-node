import * as km from "../models/kategory.models.js"
import { constants } from "node:http2"

/**
 * GET ALL KATEGORY
 */
export async function getAll(req, res) {
  try {
    const data = await km.getAll()

    res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "success",
      result: data
    })
  } catch (err) {
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    })
  }
}

/**
 * GET KATEGORY BY ID
 */
export async function getById(req, res) {
  try {
    const id = parseInt(req.params.id)

    if (isNaN(id) || id <= 0) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "id tidak valid"
      })
    }

    const data = await km.getById(id)

    if (!data) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: "kategory tidak ditemukan"
      })
    }

    res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "success",
      result: data
    })
  } catch (err) {
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    })
  }
}

/**
 * CREATE KATEGORY
 */
export async function create(req, res) {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "name wajib diisi"
      })
    }

    const data = await km.create(name)

    res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "kategory berhasil ditambahkan",
      result: data
    })
  } catch (err) {
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: err.message
    })
  }
}

/**
 * UPDATE KATEGORY
 */
export async function update(req, res) {
  try {
    const id = parseInt(req.params.id)
    const { name } = req.body

    if (isNaN(id) || id <= 0) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "id tidak valid"
      })
    }

    if (!name) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "name wajib diisi"
      })
    }

    const data = await km.update(id, name)

    if (!data) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: "kategory tidak ditemukan"
      })
    }

    res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "kategory berhasil diupdate",
      result: data
    })
  } catch (err) {
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: err.message
    })
  }
}

/**
 * DELETE KATEGORY
 */
export async function remove(req, res) {
  try {
    const id = parseInt(req.params.id)

    if (isNaN(id) || id <= 0) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "id tidak valid"
      })
    }

    const data = await km.remove(id)

    if (!data) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: "kategory tidak ditemukan"
      })
    }

    res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "kategory berhasil dihapus",
      result: data
    })
  } catch (err) {
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: err.message
    })
  }
}