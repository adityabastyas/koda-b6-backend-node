import { Router } from "express"
import * as usersController from "../controllers/users.controller.js"

const authRouter = Router()

authRouter.post("/register", usersController.register)

authRouter.post("/login", usersController.login)

export default authRouter