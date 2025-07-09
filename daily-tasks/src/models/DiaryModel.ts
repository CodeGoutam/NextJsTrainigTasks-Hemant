import mongoose from "mongoose";

const DiarySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    images: [{ type: String }],
    location: { type: String, required: true },
    weatherAtTime: { type: mongoose.Schema.Types.Mixed },
    isPublic: { type: Boolean, default: true },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LoginUser",
      required: true,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

export const Diary =
  mongoose.models.Diary || mongoose.model("Diary", DiarySchema);
