import { Router } from "express";
import * as pc from "../controllers/product.controller.js"
import * as promo from "../controllers/promo.controller.js"
import * as cart from "../controllers/cart.controller.js"


const productRouter = Router()

/**
 * @swagger
 * /product:
 *  get:
 *    summary: ambil semua product
 *    responses:
 *      200:
 *        description: berhasil ambil product
 */
productRouter.get("",pc.GetAllProduct)
productRouter.post("", pc.CreateProduct)
productRouter.patch("/:id", pc.UpdateProduct)
productRouter.delete("/:id", pc.DeleteProduct)

// promo
productRouter.get("/promo", promo.GetAllPromo)
productRouter.get("/promo/:id", promo.GetPromoId)
productRouter.post("/promo", promo.CreatePromo)
productRouter.patch("/promo/:id", promo.UpdatePromo)
productRouter.delete("/promo/:id", promo.DeletePromo)

// cart
productRouter.get("/cart", cart.GetAllCart)
productRouter.get("/cart/user/:user_id", cart.GetCartUserId)
productRouter.get("/cart/:id", cart.GetCartId)
productRouter.post("/cart", cart.CreateCart)
productRouter.delete("/cart/:id", cart.DeleteCart)

productRouter.get("/:id", pc.GetProductId)
productRouter.patch("/:id", pc.UpdateProduct)
productRouter.delete("/:id", pc.DeleteProduct)


export default productRouter