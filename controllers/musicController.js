import musicmodel from "../model/music.js";
import jwt from "jsonwebtoken";
import storageServices from "../services/storageServices.js";
import albumModel from "../model/album.js";


async function createMusic(req, res) {
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
    artist: req.user.id,
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
}

async function createAlbum(req, res) {
  const { title, musics } = req.body;

  const album = await albumModel.create({
    title,
    artist: req.user.id,
    musics: musics,
  });

  res.status(201).json({
    message: "Album created successfully",
    album: {
      id: album._id,
      title: album.title,
      artist: album.artist,
      musics: album.musics,
    },
  });
}

//all music in database
async function getAllMusic(req,res) {

  const music = await musicmodel.find().limit(2).populate("artist","name email")


  res.status(200).json({
    message : "Music fetched successfully",
    musics : music
  })
}

async function getAllAlbums(req,res) {

  const album = await albumModel.find().select("title artist").populate("artist","name email")

  res.status(200).json({
    message : "Albums fetched successfully",
    albums : album
  })
}

//get all music of in album  ablum me jitte bhi musics hai unko fetch
async function getAlbumById(req,res) {
  const albumId = req.params.albumId;

  const album = await albumModel.findById(albumId).populate("artist","username email").populate("musics")

  return res.status(200).json({
    message : "Album music fetched succefully",
    album : album
  })
}



export default { createMusic, createAlbum, getAllMusic, getAllAlbums, getAlbumById };

