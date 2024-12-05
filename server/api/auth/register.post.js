import UtilisateurModel from "~/server/models/Utilisateur";
import EnigmeModel from "~/server/models/Enigme";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        if (!body || !body.username || !body.email || !body.motDePasse) {
            return {
                status: 400,
                success: false,
                message: "Les champs 'username', 'email', et 'motDePasse' sont requis."
            };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return {
                status: 400,
                success: false,
                message: "Le format de l'adresse email est invalide."
            };
        }

        const enigma = await EnigmeModel.findById(body.enigmaId);
        if (!enigma) {
            return {
                status: 404,
                success: false,
                message: "Enigma not found."
            };
        }

        const newUser = new UtilisateurModel({
            username: body.username,
            email: body.email,
            motDePasse: await bcrypt.hash(body.motDePasse, 10),
            unlockedEnigmas: [{
              titre: enigma.title,
              niveauDifficulte: enigma.difficultyLevel,
              nombreEssais: 0,
              etat: 'available'
            }],
            equipe: {
              nomEquipe: null,
              membres: [],
              statistiques: {
                enigmesResolues: 0,
                tempsMoyenResolution: 0
              }
            }
          });

          try {
            await newUser.validate();
          } catch (validationError) {
            console.error("Erreurs de validation:", validationError.errors);
            return {
              status: 400,
              success: false,
              message: "Erreur de validation des données",
              errors: validationError.errors
            };
          }
      
        
        newUser.motDePasse = await bcrypt.hash(newUser.motDePasse, 10);

        const result = await newUser.save();
        
        if (result && result._id) {
            console.log("Utilisateur enregistré avec succès :", result);
        } else {
            console.error("Échec de l'enregistrement de l'utilisateur");
        }

        return {
            status: 201,
            success: true,
            message: "Utilisateur créé avec succès.",
            data: result
        };
    } catch (err) {
        console.error("Erreur lors de la création de l'utilisateur :", err);
        return {
            status: 500,
            success: false,
            message: "Une erreur est survenue lors de la création de l'utilisateur.",
            error: err.message || "Erreur inconnue"
        };
    }
});