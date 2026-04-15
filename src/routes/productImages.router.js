import { Router } from "express"
import * as pc from "../controllers/productImages.controller.js"
import auth from "../middlewares/auth.middleware.js"

const router = Router()

router.get("/:product_id", pc.getByProductId)

router.use(auth)

router.post("", pc.create)
router.delete("/:id", pc.remove)

export default router