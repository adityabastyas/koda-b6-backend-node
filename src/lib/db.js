import { Pool } from "pg"

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

pool.connect()
  .then(client => {
    console.log("database berhasil terhubung")
    client.release()
  })
  .catch(err => {
    console.error("gagal konek ke database:", err.message)
    process.exit(1)
  })

export default pool