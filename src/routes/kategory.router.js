import { Router } from "express"
import * as kc from "../controllers/kategory.controller.js"
import auth from "../middlewares/auth.middleware.js"
import rbac from "../middlewares/rbac.middleware.js"

const kategoryRouter = Router()

kategoryRouter.get("/", kc.getAll)
kategoryRouter.get("/:id", kc.getById)

kategoryRouter.post("/", auth, rbac("admin"), kc.create)
kategoryRouter.patch("/:id", auth, rbac("admin"), kc.update)
kategoryRouter.delete("/:id", auth, rbac("admin"), kc.remove)

export default kategoryRouter