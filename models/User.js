const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true
  },
    email: {
      type: String,
      required: true,
      unique: true,
      match: "^[A-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Z0-9.-]+$"
    },
    thoughts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thought"
    }],
    friends: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }]
}
)

userSchema.virtual("friendCount").get(function() {
  return this.friends.length();
})



const User = mongoose.model("User", userSchema);
module.exports = User;