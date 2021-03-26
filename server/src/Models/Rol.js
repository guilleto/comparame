import { model, Schema } from "mongoose";

const rolSchema = new Schema({
    rolName: {
        type: ["admin", "supermaker", "client"],
        default: "client",
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
    updated_at: {
        type: Date,
        default: null,
    },
});

export default model("Rol", rolSchema);
