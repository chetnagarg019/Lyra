import musicmodel from "../model/music.js";
import jwt from "jsonwebtoken";
import storageServices from "../services/storageServices.js";
import albumModel from "../model/album.js";
// import bcrypt from "bcrypt";

async function createMusic(req, res) {
  const token = req.cookies.token; // user log in hona chaiye kuki login hoga jbhi uske paas token hoga

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res
        .status(403)
        .json({ message: "You don't have access to create an music" });
    }

    const { title } = req.body; // title form-data se aa rha hai 
    const file = req.file; // multer ke through aa rhi hai 

    // const result = await uploadFile(file.buffer.toString('base64'));
    const result = await storageServices.uploadFile(
      file.buffer.toString("base64"),
    );
    //File ka buffer base64 me convert ho raha hai
    //ImageKit pe upload ho raha hai
    //result.url me cloud ka link mil raha hai


    // Step 6: Database me music save karna
    const music = await musicmodel.create({
      uri: result.url,
      title,
      artist: decoded.id,
    });

    res.status(201).json({
      message: "Music created successfully",
      music: {
        id: music._id,
        uri: music.uri,
        title: music.title,
        artist: music.artist,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(401).json({ message: "Unauthorized" });
  }
}

async function createAlbum(req,res) {
    const token = req.cookies.token; // user log in hona chaiye kuki login hoga jbhi uske paas token hoga

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try{

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res
        .status(403)
        .json({ message: "You don't have access to create an album" });
    }

    const { title,musics } = req.body; 

    const album = await albumModel.create({
        title,
        artist : decoded.id,
        musics : musics,
    })

    res.status(201).json({
        message : "Album created successfully",
        album : {
            id : album._id,
            title : album.title,
            artist : album.artist,
            musics : album.musics
        }
    })




  }catch(error){
    console.log(error);
     return res.status(401).json({ message: "Unauthorized" });
    

  }




}

export default { createMusic,createAlbum };
