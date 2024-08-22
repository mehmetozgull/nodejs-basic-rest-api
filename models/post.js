import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    created_at: {
        type: Date,
        default: () => {
            const date = new Date();
            date.setHours(date.getHours() + 3); // UTC+3'e manuel olarak ayarlıyoruz
            return date;
        },
    },
});

export default mongoose.model("Post", postSchema);