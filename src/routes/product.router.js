import { Router } from "express";
import * as pc from "../controllers/product.controller.js"

const productRouter = Router()

productRouter.get("",pc.GetAllProduct)
productRouter.get("/:id", pc.GetProductId)

export default productRouter