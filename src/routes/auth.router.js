import { Router } from "express"
import * as ac from "../controllers/auth.controller.js"

const authRouter = Router()

authRouter.post("/register", ac.register)
authRouter.post("/login", ac.login)

authRouter.post("/forgot-password", ac.requestForgotPassword)
authRouter.patch("/forgot-password", ac.resetPassword)

export default authRouter