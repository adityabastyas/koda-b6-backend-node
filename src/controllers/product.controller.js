import * as pm from "../models/product.models.js"
import { constants } from "node:http2"
import redis from "../lib/redis.js"

/**
 * 
 * @param {import ("express").Request} req 
 * @param {import ("express").Response} res 
 * @returns 
 */
export async function getAll(req, res) {
  try {
    const cached = await redis.get("products")

    if (cached) {
      console.log("ambil dari redis")

      return res.status(constants.HTTP_STATUS_OK).json({
        success: true,
        message: "success (cache)",
        result: JSON.parse(cached)
      })
    }
    
    const products = await pm.getAll()

    await redis.set("products", JSON.stringify(products), {
      EX: 300
    })

    console.log("ambil dari DB + simpan redis")

    res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "success",
      result: products
    })
  } catch (err) {
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "terjadi kesalahan pada server"
    })
  }
}

/**
 * 
 * @param {import ("express").Request} req 
 * @param {import ("express").Response} res 
 * @returns 
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

    const key = `product:${id}`

    const cached = await redis.get(key)

    if (cached) {
      console.log("ambil product dari redis")

      return res.status(constants.HTTP_STATUS_OK).json({
        success: true,
        message: "success (cache)",
        result: JSON.parse(cached)
      })
    }

    const product = await pm.getById(id)

    if (!product) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: "product tidak ditemukan"
      })
    }

    await redis.set(key, JSON.stringify(product), { EX: 300 })

    console.log("ambil dari DB + simpan redis")

    res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "success",
      result: product
    })
  } catch (err) {
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    })
  }
}

/**
 * CREATE PRODUCT
 */
export async function create(req, res) {
  try {
    const { name, price } = req.body

    if (!name) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "nama product tidak boleh kosong"
      })
    }

    if (!price || isNaN(price) || price <= 0) {
       return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
      message: "harga product tidak valid"
    })
   }

    await pm.create(req.body)

    await redis.del("products")

    res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "product berhasil ditambahkan"
    })
  } catch (err) {
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: "gagal menambahkan product"
    })
  }
}

export async function update(req, res) {
  try {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "id harus berupa angka"
      })
    }

    const { name, price } = req.body

    if (!name) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "nama product tidak boleh kosong"
      })
    }

    if (!price || isNaN(price) || price <= 0) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
       success: false,
       message: "harga product tidak valid"
     })
    }

    const updated = await pm.update(id, req.body)

    if (!updated) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
       success: false,
       message: "product tidak ditemukan"
    })
    }

    await redis.del("products")
    await redis.del(`product:${id}`)

    res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "product berhasil diupdate"
    })
  } catch (err) {
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: "gagal update product"
    })
  }
}

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
        message: "product tidak ditemukan"
      })
    }

    await redis.del("products")
    await redis.del(`product:${id}`)

    res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "product berhasil dihapus"
    })
  } catch (err) {
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: "gagal menghapus product"
    })
  }
}