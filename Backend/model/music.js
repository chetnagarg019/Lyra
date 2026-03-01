import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
    uri : {
        type : String,
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    artist :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User", //ref: "User" ka matlab ye User collection se linked hai Har song kisi ek user (artist) se linked hai.
        required : true,
    } ,
    //hash ko esliye use kiya hai kuki bhutt se artist diff titile ya same titile se usi song ko create kr rhe the to ye ek logical error hai jo kam to shi kr rha hai but behave shi nhi kr rha isko shi krne ke liye hi humne hash ka use kiya hai 
    hash: {
  type: String, //Har music file ka digital fingerprint store hoga. 
  required: true,//Database me unique constraint lag gaya → same hash wala file dobara insert nahi hoga.
  unique: true
}

})

const musicmodel = mongoose.model("music",musicSchema);

export default musicmodel;

//step-1 hash ko music.js me 
//step-2 Hash Generate Karna (Controller Me)