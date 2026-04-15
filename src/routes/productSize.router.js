import { Router } from "express"
import * as pc from "../controllers/productSize.controller.js"
import auth from "../middlewares/auth.middleware.js"

const router = Router()

router.get("/:product_id", pc.getByProductId)
router.get("/detail/:id", pc.getById)

router.use(auth)

router.post("", pc.create)
router.patch("/:id", pc.update)
router.delete("/:id", pc.remove)

export default router