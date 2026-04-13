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

/**
 * @swagger
 * /product/cart/user/{user_id}:
 *   get:
 *     summary: ambil cart berdasarkan user id
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: berhasil ambil cart user
 */
productRouter.get("/cart/user/:user_id", cart.GetCartUserId)

/**
 * @swagger
 * /product/cart/{id}:
 *   get:
 *     summary: ambil cart berdasarkan id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: berhasil ambil cart
 */
productRouter.get("/cart/:id", cart.GetCartId)

/**
 * @swagger
 * /product/cart:
 *   post:
 *     summary: buat cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *     responses:
 *       200:
 *         description: berhasil buat cart
 */
productRouter.post("/cart", cart.CreateCart)

/**
 * @swagger
 * /product/cart/{id}:
 *   delete:
 *     summary: delete cart
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: berhasil delete cart
 */
productRouter.delete("/cart/:id", cart.DeleteCart)

productRouter.get("/:id", pc.GetProductId)
productRouter.patch("/:id", pc.UpdateProduct)
productRouter.delete("/:id", pc.DeleteProduct)


export default productRouter