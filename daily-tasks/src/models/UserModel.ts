import mongoose, { Schema, models, model, Model, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  address: string;
  phone_no: number;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String },
  phone_no: { type: Number, required: true },
});

const UserModel: Model<IUser> = models.User || model<IUser>("User", UserSchema);

export default UserModel;
