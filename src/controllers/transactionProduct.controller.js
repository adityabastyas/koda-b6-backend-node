import * as tpm from "../models/transactionProduct.models.js"
import { constants } from "node:http2"

/**
 * GET BY TRANSACTION
 */
export async function GetByTransactionId(req, res) {
  const id = parseInt(req.params.transaction_id)

  const data = await tpm.getByTransactionId(id)

  return res.status(constants.HTTP_STATUS_OK).json({
    success: true,
    message: "success",
    result: data
  })
}

/**
 * CREATE
 */
export async function Create(req, res) {
  const id = parseInt(req.params.transaction_id)

  await tpm.create(id, req.body)

  return res.status(constants.HTTP_STATUS_OK).json({
    success: true,
    message: "product berhasil ditambahkan ke transaksi"
  })
}
