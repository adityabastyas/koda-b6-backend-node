import { createClient } from "redis"

const redis = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },
  password: process.env.REDIS_PASSWORD
})

redis.on("error", (err) => {
  console.error("Redis error:", err)
})

await redis.connect()

console.log("Redis connected")

export default redis