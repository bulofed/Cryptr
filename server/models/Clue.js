import mongoose from "mongoose";

const clueSchema = new mongoose.Schema({
    desc: { type: [String]},
    imgpath: { type: [String] },
    title: { type: String, required: true, trim: true },
    unlockedBy: { type: String }
});

const ClueModel = mongoose.model("Clue", clueSchema, "Clue");

export default ClueModel;