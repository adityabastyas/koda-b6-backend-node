import { Router } from "express"
import * as usersController from "../controllers/users.controller.js"

const usersRouter = Router()

usersRouter.get("/users", usersController.getAllUsers)
usersRouter.get("/users/:id", usersController.getUserById)
usersRouter.post("/users", usersController.createUser)
usersRouter.patch("/users/:id", usersController.updateUser)
usersRouter.delete("/users/:id", usersController.deleteUser)

export default usersRouter