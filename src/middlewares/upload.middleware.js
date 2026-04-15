import multer from "multer"
import { customAlphabet } from "nanoid"

const nanoid = customAlphabet(
  "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  10
)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads")
  },

  filename: (req, file, cb) => {
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf(".")
    )

    const fileName = `${nanoid()}${ext}`

    cb(null, fileName)
  }
})

const upload = multer({ storage })

export default upload