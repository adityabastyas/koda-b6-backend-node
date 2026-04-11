import { Router } from "express"
import * as kc from "../controllers/kategory.controller.js"

const kategoryRouter = Router()

kategoryRouter.get("", kc.GetAllKategory)
kategoryRouter.get("/:id", kc.GetKategoryId)
kategoryRouter.post("", kc.CreateKategory)
kategoryRouter.patch("/:id", kc.UpdateKategory)
kategoryRouter.delete("/:id", kc.DeleteKategory)

export default kategoryRouter