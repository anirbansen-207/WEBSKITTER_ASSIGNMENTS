import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: String,

    content: String,

    image: String,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blog", blogSchema);