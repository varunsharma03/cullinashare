import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    liked: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "recipes"
        }
    ]
}, {
    timestamps: true
});

export default mongoose.models?.user || mongoose.model("user", userSchema);
