import { Router } from "express"
import * as usersController from "../controllers/users.controller.js"
import auth from "../middlewares/auth.middleware.js"
import upload from "../middlewares/upload.middleware.js"

const usersRouter = Router()

usersRouter.use(auth)

usersRouter.get("/", usersController.getAll)

usersRouter.post("/upload", upload.single("file"), usersController.uploadPhoto)

usersRouter.patch("/profile", usersController.updateProfile)


export default usersRouter