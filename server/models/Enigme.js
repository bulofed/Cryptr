import mongoose from "mongoose";

const enigmeSchema = new mongoose.Schema({
    titre: { type: String, required: true, trim: true },
    description: { type: String },
    niveauDifficulte: { type: Number },
    tempsEstime: { type: Number },
    indices: { type: [String] },
    solution: { type: String },
    categories: { type: [String] },
    statistiques: { 
      tauxReussite: { type: Number },
      nombreTentatives: { type: Number },
      tempsMoyenResolution: { type: Number }
    }
});

const EnigmeModel = mongoose.model('Enigme', enigmeSchema, 'Enigme');

export default EnigmeModel;