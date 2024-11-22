import UtilisateurModel from "~/server/models/Utilisateur"

export default defineEventHandler(async (event) => {
    try{
        const { id } = event.context.params;
        if (!id){
            return {
                status: 400,
                success: false,
                message: "ID utilisateur manquant."
            };
        }

        const user = await UtilisateurModel.findById(id);
        if (!user){
            return {
                status: 404,
                success: false,
                message: "Utilisateur non trouvé."
            };
        }

        return {
            status: 200,
            success: true,
            message: "Utilisateur récupéré avec succès.",
            data: user
        };
    } catch(err){
        console.error("Erreur lors de la récupération de l'utilisateur :", err);
        return {
            status: 500,
            success: false,
            message: "Une erreur est survenue lors de la récupération de l'utilisateur.",
            error: err.message || "Erreur inconnue"
        };
    }
});