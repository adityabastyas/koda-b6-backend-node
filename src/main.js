import express from "express"
import usersRouter from "./routes/users.router.js"
import productRouter from "./routes/product.router.js"
import kategoryRouter from "./routes/kategory.router.js"

const app = express()
const PORT = process.env.PORT || 8888

app.use(express.json())
app.use("/", usersRouter)
app.use("/product", productRouter)
app.use("/kategory", kategoryRouter)

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`)
})