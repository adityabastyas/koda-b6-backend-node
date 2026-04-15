import cors from "cors"

const corsMiddleware = cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
})

export default corsMiddleware