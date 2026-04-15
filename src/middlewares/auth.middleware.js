import { VerifyToken } from "../lib/jwt.js"
import { constants } from "node:http2"

/**
 * Auth middleware (JWT)
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export default function auth(req, res, next) {
  const authHeader = req.headers.authorization
  const prefix = "Bearer "

  const isBearer = authHeader?.startsWith(prefix)

  if (!isBearer) {
    return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized"
    })
  }

  const token = authHeader.slice(prefix.length)

  try {
    const payload = VerifyToken(token)

    res.locals.id = payload.user_id
    res.locals.role = payload.role

    next()
  } catch {
    return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
      success: false,
      message: "token tidak valid"
    })
  }
}