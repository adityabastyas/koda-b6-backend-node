import { Router } from "express"
import * as pc from "../controllers/promo.controller.js"

const promoRouter = Router()

promoRouter.get("", pc.GetAllPromo)
promoRouter.get("/:id", pc.GetPromoId)
promoRouter.post("", pc.CreatePromo)
promoRouter.patch("/:id", pc.UpdatePromo)
promoRouter.delete("/:id", pc.DeletePromo)

export default promoRouter