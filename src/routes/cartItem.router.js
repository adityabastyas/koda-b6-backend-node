import { Router } from "express"
import * as cic from "../controllers/cartItem.controller.js"
import auth from "../middlewares/auth.middleware.js"

const cartItemRouter = Router()

cartItemRouter.use(auth)

cartItemRouter.get("/", cic.getMyItems)
cartItemRouter.post("/", cic.create)
cartItemRouter.patch("/:id", cic.update)
cartItemRouter.delete("/:id", cic.remove)

export default cartItemRouter