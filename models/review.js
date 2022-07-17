const moongose = require("mongoose");
const Schema = moongose.Schema;

const reviewSchema = new Schema({
  body: String,
  rating: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = moongose.model("Review", reviewSchema);
