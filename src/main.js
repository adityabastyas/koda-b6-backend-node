import "dotenv/config"
import express from "express"
import usersRouter from "./routes/users.router.js"
import productRouter from "./routes/product.router.js"
import kategoryRouter from "./routes/kategory.router.js"
import docsRouter from "./routes/docs.js"
import corsMiddleware from "./lib/cors.js"
import authRouter from "./routes/auth.router.js"
import productImagesRouter from "./routes/productImages.router.js"

const app = express()
const PORT = process.env.PORT || 8888


app.use(express.json())
app.use(corsMiddleware)

app.use("/uploads", express.static("uploads"))

app.use("/auth", authRouter)
app.use("/users", usersRouter)
app.use("/products", productRouter)
app.use("/kategorys", kategoryRouter)
app.use("/docs", docsRouter)
app.use("/product-images", productImagesRouter)

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`)
})