import express from "express";
const router = express.Router();
import musicController from "../controllers/musicController.js"
import multer from "multer";
import authMiddleware from "../middleware/authMiddleware.js";
// Multer file upload handle karta hai.

//multer use
const upload = multer({
    storage : multer.memoryStorage()
})

// File server ke RAM me temporarily store hogi
//  Direct disk pe save nahi hogi
//  Hum isko baad me cloud (ImageKit) pe upload karenge

router.post("/create", authMiddleware.middleware_1, upload.single("music"), musicController.createMusic) //done
router.post("/album", authMiddleware.middleware_1, musicController.createAlbum) //done
router.get("/", musicController.getAllMusic) //done
router.get("/my-songs", authMiddleware.middleware_1, musicController.getMySongs); // new route  //done
router.get("/albums",musicController.getAllAlbums)//done ...
router.get("/search",musicController.getAllSearch);
router.get("/albums/:albumId",musicController.getAlbumById) // done
//ek esi api bnani hai normal user ke liye jo ki sare songs sun skte hai 

//upload.single("music") =>  Multer file handle karega Form-data me "music" naam ki file expect karega File ko req.file me daal dega

export default router;

//musicRoutes ek esi api hai jisme sirf artist hi music ko create kr ske koi bhi nirmal user aake usme music create na kre vo sirf
