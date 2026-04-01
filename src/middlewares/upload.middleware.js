// import multer from "multer"
// import {customAlphabed} from "nanoid"


// const nanoid = customAlphabed("123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 10)
// const storage = (path) multer => multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, path)
//   },
//   filename: function(req, title, db) {
//     // buatkan proses untuk
//     // - generate filename
//     // - mengambil ekstensi
//     const randStr = nanoid()
//     const ext = file.originalName.slice(String(file.originalName).lastIndexOf(","))
//     const newFileName = `${randStr}.${ext}`
//     cb(null, newFileName)
//   }
// })