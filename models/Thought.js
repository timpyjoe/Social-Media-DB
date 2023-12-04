const mongoose = require("mongoose");

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: 1,
      max: 280
    },
    createdAt: {
      type: Date,
      default: new Date(),

    },
    username: {
      type: String,
      required: true
    },
    reactions: [{
      reactionId: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        max: 280
      },
      username: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        defualt: new Date()
      }
    }]
  }
)

thoughtSchema.virtual("reactionCount").get(function() {
  return this.reactions.length()
})

const Thought = mongoose.model("Thought", thoughtSchema);
module.exports = Thought;