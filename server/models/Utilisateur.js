import mongoose from "mongoose";

const utilisateurSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  unlockedEnigmas: [
    {
      title: { type: String, required: true },
      difficultyLevel: { type: Number, required: true },
      numberOfTry: { type: Number, default: 0 },
      state: { type: String },
      completionTime: { type: Number, default: 0 },
      dateCompletion: { type: Date },
    },
  ],
  unlockedClues: [
    {
      title: { type: String, required: true },
      Imgpath: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
  team: {
    teamName: { type: String },
    members: [String],
    statistics: {
      resolvedClue: { type: Number, default: 0 },
      averageTimeResolution: { type: Number, default: 0 },
    },
  },
  pointsEarned: { type: Number, default: 0 },
});

const UtilisateurModel = mongoose.model(
  "Utilisateur",
  utilisateurSchema,
  "Utilisateur"
);

export default UtilisateurModel;
