import UtilisateurModel from "~/server/models/Utilisateur";
import EnigmeModel from "~/server/models/Enigme";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        console.log("Body : " , body);
        if (!body || !body.username || !body.email || !body.password) {
            return {
                status: 400,
                success: false,
                message: "Les champs 'username', 'email', et 'password' sont requis."
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
            password: body.password,
            unlockedEnigmas: [{
                title: enigma.title,
                difficultyLevel: enigma.difficultyLevel,
                numberOfTry: 0,
                state: 'available'
              }],
        });


        newUser.password = await bcrypt.hash(newUser.password, 10);

        const result = await newUser.save();
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