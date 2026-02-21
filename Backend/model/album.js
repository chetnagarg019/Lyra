import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    musics : [{
        type : mongoose.Schema.Types.ObjectId, //arr of obj id
        ref : "music"
    }],
    artist : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    }
})

const albumModel = mongoose.model("album",albumSchema);

export default albumModel;

