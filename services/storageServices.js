import dotenv from "dotenv";
dotenv.config();
import { ImageKit } from "@imagekit/nodejs";

const ImagekitClient = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});
//ImageKit se connection bana raha hai
//Private key se authentication kar raha hai

//Jaise bank account me login karne ke liye password chahiye
// waise ImageKit me upload karne ke liye private key chahiye 🔐

async function uploadFile(file) {
  //Ye function file lega (base64 format me)
  const result = await ImagekitClient.files.upload({
    file, //Jo base64 string tum bhej rahe ho (req.file.buffer se)
    fileName: "music_" + Date.now(), //Har file ka unique naam ban raha hai using Date.now() Taaki duplicate naam na ho.
    folder: "yt-complete-backend/music",
  });

  return result; // iamge kit ka responce return kr rha h
}

export default { uploadFile };
