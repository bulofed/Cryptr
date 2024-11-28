import UtilisateurModel from "~/server/models/Utilisateur";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
    try{
        const body = await readBody(event);
        if (!body || !body.username || !body.email || !body.motDePasse){
            return {
                status: 400,
                success: false,
                message: "Les champs 'username', 'email', et 'motDePasse' sont requis."
            };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)){
            return {
                status: 400,
                success: false,
                message: "Le format de l'adresse email est invalide."
            };
        }

        const newUser = new UtilisateurModel({
            username: body.username,
            email: body.email,
            motDePasse: body.motDePasse
        });
        
        newUser.motDePasse = await bcrypt.hash(newUser.motDePasse, 10);

        const result = await newUser.save();
        return {
            status: 201,
            success: true,
            message: "Utilisateur créé avec succès.",
            data: result
        };
    } catch(err){
        console.error("Erreur lors de la création de l'utilisateur :", err);
        return {
            status: 500,
            success: false,
            message: "Une erreur est survenue lors de la création de l'utilisateur.",
            error: err.message || "Erreur inconnue"
        };
    }
});