import musicmodel from "../model/music.js";
import jwt from "jsonwebtoken";
import  storageServices  from "../services/storageServices.js"
// import bcrypt from "bcrypt";

async function createMusic(req ,res) {

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({ message : "Unauthorized" })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(decoded.role !== 'artist'){
             return res.status(403).json({ message : "You don't have access to create an music" });


        }

   

    const {title} = req.body;
    const file = req.file;

    // const result = await uploadFile(file.buffer.toString('base64'));
    const result = await storageServices.uploadFile(
    file.buffer.toString("base64")
);


    const music = await musicmodel.create({
        uri : result.url,
        title,
        artist : decoded.id,
    })

    res.status(201).json({
        message : "Music created successfully",
        music : {
            id : music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist,
        }
    })

    }catch(error){
        console.log(error);
        
        return res.status(401).json({ message : "Unauthorized"})

    }



}

export default { createMusic }