import express from "express";
const router = express.Router();
import musicController from "../controllers/musicController.js"
import multer from "multer";

//multer use
const upload = multer({
    storage : multer.memoryStorage()
})

router.post("/create",upload.single("music"), musicController.createMusic)

export default router;

//musicRoutes ek esi api hai jisme sirf artist hi music ko create kr ske koi bhi nirmal user aake usme music create na kre vo sirf
