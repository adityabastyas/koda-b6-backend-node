import { Router } from "express"
import * as pc from "../controllers/promo.controller.js"
import auth from "../middlewares/auth.middleware.js"
import rbac from "../middlewares/rbac.middleware.js"

const promoRouter = Router()

promoRouter.get("", pc.getAll)
promoRouter.get("/:id", pc.getById)

promoRouter.post("", auth, rbac("admin"), pc.create)
promoRouter.patch("/:id", auth, rbac("admin"), pc.update)
promoRouter.delete("/:id", auth, rbac("admin"), pc.remove)

export default promoRouter