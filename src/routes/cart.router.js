import { Router } from "express"
import * as cc from "../controllers/cart.controller.js"
import auth from "../middlewares/auth.middleware.js"

const cartRouter = Router()

cartRouter.use(auth)

cartRouter.get("/", cc.getMyCart)     
cartRouter.post("/", cc.create)   



export default cartRouter