import { Router } from "express"
import * as tc from "../controllers/transaction.controller.js"
import auth from "../middlewares/auth.middleware.js"

const router = Router()

router.use(auth)

router.get("", tc.GetAll)
router.get("/:id", tc.GetById)
router.get("/user/:user_id", tc.GetByUserId)
router.post("", tc.Create)
router.delete("/:id", tc.Delete)

export default router