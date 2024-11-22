import mongoose from "mongoose";

const utilisateurSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    motDePasse: { type: String, required: true },
    progresEnigmes: [{
        titre: { type: String, required: true },
        niveauDifficulte: { type: Number, required: true }
    }],
    
    equipe: {
      nomEquipe: {type: String},
      membres: [Number],
      statistiques: {
        enigmesResolues: { type: Number, default: 0 },
        tempsMoyenResolution: { type: Number, default: 0 }
      }
    }
});

const UtilisateurModel = mongoose.model('Utilisateur', utilisateurSchema, 'Utilisateur');

export default UtilisateurModel;