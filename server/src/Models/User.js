import { Schema, model, Types } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    rols: {
        type: Types.ObjectId,
        ref: "Rol",
        required: true,
    },
    plans: {
        type: Types.ObjectId,
        ref: "Plan",
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    age: Number,
    photo: {
        path: String,
        name: String,
        size: Number,
    },
    location: {
        latitude: Number,
        longitude: Number,
    },
    favorite_products: [
        {
            type: Types.ObjectId,
            ref: "Product"
        }
    ]
});

userSchema.methods.confirmPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.methods.encryptPassword = (password) => {
    const salt = bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export default model("User", userSchema);
