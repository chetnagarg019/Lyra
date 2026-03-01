import musicmodel from "../model/music.js";
import jwt from "jsonwebtoken";
import storageServices from "../services/storageServices.js";
import albumModel from "../model/album.js";
import crypto from "crypto";

async function createMusic(req, res) {
  try {
    const { title } = req.body;
    const file = req.file; //file → uploaded file (multer middleware se aata hai)

    //  Step 1: File validation
    if (!file) {
      return res.status(400).json({
        message: "Music file is required",
      });
    }

    //  Step 2: Generate hash from file buffer
    const hash = crypto
      .createHash("sha256") //cryptographic hash generate karta hai Same file ka hash hammesha same hoga
      .update(file.buffer) //file ka binary data
      .digest("hex"); //readable string format me convert Ye digital fingerprint hai

    // Step 3: Check duplicate file in DB 
    const existingMusic = await musicmodel.findOne({ hash }); //Agar database me same hash exist karta hai → upload reject ho jayega

    if (existingMusic) {
      return res.status(400).json({
        message: "This music file already exists in system",
      });
    }

    //  Step 4: Upload to cloud
    const result = await storageServices.uploadFile( //File ko base64 me convert karke cloud service ko bheja. Cloudinary / S3 type service ho sakti hai.
      file.buffer.toString("base64"),
    );

    //  Step 5: Save to database including hash
    const music = await musicmodel.create({
      uri: result.url, //cloud link       
      title,
      artist: req.user.id,
      hash: hash, //Database me hash bhi store ho gaya Future me system easily duplicate detect kar lega
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
    res.status(500).json({
      message: "Error creating music",
      error: error.message,
    });
  }
}

//create album

// async function createAlbum(req, res) {
//   const { title, musics } = req.body;

//   const album = await albumModel.create({
//     title,
//     artist: req.user.id,
//     musics: musics,
//   });

//   res.status(201).json({
//     message: "Album created successfully",
//     album: {
//       id: album._id,
//       title: album.title,
//       artist: album.artist,
//       musics: album.musics,
//     },
//   });
// }

async function createAlbum(req, res) {
  try {
    //  Only artist can create album
    if (req.user.role !== "artist") {
      return res
        .status(403)
        .json({ message: "Only artists can create albums" });
    }

    const { title, musics } = req.body;

    // 2 Validate musics (only artist’s own songs)
    const allowedMusics = await musicmodel.find({
      _id: { $in: musics }, //Find all songs jinka ID musics array me hai.
      artist: req.user.id, //Aur wo songs isi artist ke hone chahiye.
    });

    if (allowedMusics.length !== musics.length) {
      return res
        .status(400)
        .json({ message: "You can only add your own music to album" });
    }

    // 3️ Create album
    const album = await albumModel.create({
      title,
      artist: req.user.id, //artist reference store ho raha hai
      musics: allowedMusics.map((m) => m._id), //musics array me sirf validated IDs store ho rahe hain
    });

    res.status(201).json({
      message: "Album created successfully",
      album,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating album",
      error: error.message,
    });
  }
}
//ye hau new route jo artist ki id ke hisabh se usi ke song dega jo jo usne create kr krhe honge
async function getMySongs(req, res) {
  try {
    const songs = await musicmodel.find({ artist: req.user.id });

    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching your songs",
      error: error.message,
    });
  }
}

//all music in database
// async function getAllMusic(req,res) {

//   const music = await musicmodel.find().limit(3).populate("artist","name email")

//   res.status(200).json({
//     message : "Music fetched successfully",
//     musics : music
//   })
// }

async function getAllMusic(req, res) {
  try {
    const music = await musicmodel.find().populate("artist", "name email");

    res.status(200).json({
      message: "Music fetched successfully",
      musics: music,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching music",
      error: error.message,
    });
  }
}

// sari albums

// async function getAllAlbums(req,res) {

//   const album = await albumModel.find()
//   .select("title artist")
//   .populate("artist","name email")
//   .populate("musics");  //  y

//   res.status(200).json({
//     message : "Albums fetched successfully",
//     albums : album
//   })
// }

async function getAllAlbums(req, res) {
  try {
    const albums = await albumModel
      .find()
      .populate("artist", "name email")
      .populate("musics"); //  Har music ID ki jagah pura music object aa jayega.

    res.status(200).json({
      message: "Albums fetched successfully",
      albums,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching albums",
      error: error.message,
    });
  }
}
//get all music of in album  ablum me jitte bhi musics hai unko fetch
async function getAlbumById(req, res) {
  const albumId = req.params.albumId; 

  const album = await albumModel
    .findById(albumId)
    .populate("artist", "name email")
    .populate("musics");

  return res.status(200).json({
    message: "Album music fetched succefully",
    album: album,
  });
}

async function getAllSearch(req, res) {
  try {

    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const songs = await musicmodel.find({
      title: { $regex: query, $options: "i" }, // case insensitive search
    }).populate("artist", "name email");

    res.status(200).json({
      message: "Search results",
      songs,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error searching music",
      error: error.message,
    });
  }
}

export default {
  createMusic,
  createAlbum,
  getAllMusic,
  getAllAlbums,
  getAlbumById,
  getMySongs,
  getAllSearch,
};
