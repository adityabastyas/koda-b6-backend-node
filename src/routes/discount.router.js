import { Router } from "express"
import * as dc from "../controllers/discount.controller.js"
import auth from "../middlewares/auth.middleware.js"

const router = Router()

router.get("", dc.getAll)
router.get("/:id", dc.getById)

router.use(auth)

router.post("", dc.create)
router.patch("/:id", dc.update)
router.delete("/:id", dc.remove)

export default router