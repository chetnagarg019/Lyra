import express from "express";
const router = express.Router();
import musicController from "../controllers/musicController.js"
import multer from "multer";
//👉 Multer file upload handle karta hai.

//multer use
const upload = multer({
    storage : multer.memoryStorage()
})

// File server ke RAM me temporarily store hogi
// 👉 Direct disk pe save nahi hogi
// 👉 Hum isko baad me cloud (ImageKit) pe upload karenge

router.post("/create",upload.single("music"), musicController.createMusic)
router.post("/album",musicController.createAlbum)
//upload.single("music") =>  Multer file handle karega Form-data me "music" naam ki file expect karega File ko req.file me daal dega

export default router;

//musicRoutes ek esi api hai jisme sirf artist hi music ko create kr ske koi bhi nirmal user aake usme music create na kre vo sirf
