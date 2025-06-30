import mongoose, { Schema, models } from "mongoose";

const socialLinkSchema = new Schema(
  {
    name: String,
    link: String,
  },
  { _id: false }
);

const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  isEmailVerified: { type: Boolean, default: false },
  mobileNumber: { type: String, required: true, unique: true },
  isMobileVerified: { type: Boolean, default: false },
  passwordHash: { type: String, required: true },
  authProvider: { type: String, default: "local" }, // 'local' | 'google' | ...
  providerId: { type: String, default: "" },
  bio: { type: String, default: "" },
  profileImage: { type: String, default: "" },
  location: { type: String, default: "" },
  socialLinks: { type: [socialLinkSchema], default: [] },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  isActive: { type: Boolean, default: true },
  lastLoginAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

UserSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const LoginUser =
  models.LoginUser || mongoose.model("LoginUser", UserSchema);
