import mongoose from "mongoose";

const enigmeSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String },
  difficultyLevel: { type: Number },
  estimatedTime: { type: Number },
  clues: { type: [String] },
  solution: { type: String },
  categories: { type: [String] },
  statistics: {
    successRate: { type: Number },
    tries: { type: Number },
    averageResolutionTime: { type: Number },
  },
  unlocksClues: { type: [String] },
  imgPath: { type: String },
  textInspect: { type: String },
  unlocksEnigmas: { type: [String] },
  completionMessage: { type: String },
});

const EnigmeModel = mongoose.model("Enigme", enigmeSchema, "Enigme");

export default EnigmeModel;
