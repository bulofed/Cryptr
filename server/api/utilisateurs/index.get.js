import UtilisateurModel from "~/server/models/Utilisateur";

export default defineEventHandler(async () => {
    try{
        const result = await UtilisateurModel.find();
        if (!result || result.length === 0){
            return {
                status: 404,
                success: false,
                message: "Aucun utilisateur trouvé.",
                data: []
            };
        }

        return {
            status: 200,
            success: true,
            message: "Utilisateurs récupérés avec succès.",
            data: result
        };
    } catch(err){
        console.error("Erreur lors de la récupération des utilisateurs :", err);
        return {
            status: 500,
            success: false,
            message: "Une erreur est survenue lors de la récupération des utilisateurs.",
            error: err.message || "Erreur inconnue"
        };
    }
});