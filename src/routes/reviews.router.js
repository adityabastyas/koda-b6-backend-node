import { Router } from "express"
import * as rc from "../controllers/reviews.controller.js"
import auth from "../middlewares/auth.middleware.js"

const reviewsRouter = Router()

reviewsRouter.get("", rc.GetAll)
reviewsRouter.get("/product/:product_id", rc.GetByProductId)

reviewsRouter.use(auth)

reviewsRouter.get("/user/:user_id", rc.GetByUserId)
reviewsRouter.post("/:user_id", rc.Create)
reviewsRouter.delete("/:id", rc.Delete)

export default reviewsRouter