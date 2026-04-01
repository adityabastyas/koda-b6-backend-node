import { Router } from "express";
import * as pc from "../controllers/product.controller.js"

const productRouter = Router()

productRouter.get("",pc.GetAllProduct)

export default productRouter