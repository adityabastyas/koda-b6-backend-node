import { Router } from "express"
import * as tpc from "../controllers/transactionProduct.controller.js"
import auth from "../middlewares/auth.middleware.js"

const router = Router()

router.use(auth)

router.get("/:transaction_id", tpc.GetByTransactionId)
router.post("/:transaction_id", tpc.Create)
router.delete("/:id", tpc.Delete)

export default router