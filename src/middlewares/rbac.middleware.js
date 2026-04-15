import { constants } from "node:http2"

/**
 * RBAC middleware
 * @param  {...string} allowedRoles
 * @returns {import("express").RequestHandler}
 */
export default function rbac(...allowedRoles) {
  return (req, res, next) => {
    const role = res.locals.role

    if (!role) {
      return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
        success: false,
        message: "unauthorized"
      })
    }

    const isAllowed = allowedRoles.includes(role)

    if (!isAllowed) {
      return res.status(constants.HTTP_STATUS_FORBIDDEN).json({
        success: false,
        message: "forbidden"
      })
    }

    next()
  }
}