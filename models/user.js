import mongoose from "mongoose";

const { Schema, model } = mongoose;
const userSchema = new Schema({
    googleId: String
});

const UsersModel = model("users", userSchema);
export default UsersModel;