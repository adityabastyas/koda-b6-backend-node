import { Router } from "express";
import * as pc from "../controllers/product.controller.js"
import * as promo from "../controllers/promo.controller.js"


const productRouter = Router()

productRouter.get("",pc.GetAllProduct)
productRouter.post("", pc.CreateProduct)
productRouter.patch("/:id", pc.UpdateProduct)
productRouter.delete("/:id", pc.DeleteProduct)

productRouter.get("/promo", promo.GetAllPromo)
productRouter.get("/promo/:id", promo.GetPromoId)
productRouter.post("/promo", promo.CreatePromo)
productRouter.patch("/promo/:id", promo.UpdatePromo)
productRouter.delete("/promo/:id", promo.DeletePromo)

productRouter.get("/:id", pc.GetProductId)

export default productRouter