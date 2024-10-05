const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  id:{type:Number,required:true},
  name: { type: String, required: true,unique: true },
  image: { type: String, required: true },
  category:{type:String,required:true},
  description: { type: String, required: true },
  bgColor: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Album = mongoose.model("Album", albumSchema);
module.exports = Album;
