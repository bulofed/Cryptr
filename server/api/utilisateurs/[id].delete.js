import UtilisateurModel from "~/server/models/Utilisateur";

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

        const result = await UtilisateurModel.findByIdAndDelete(id);
        if (!result){
            return {
                status: 404,
                success: false,
                message: `Aucun utilisateur trouvé avec l'ID : ${id}.`
            };
        }

        return {
            status: 200,
            success: true,
            message: "Utilisateur supprimé avec succès.",
            data: result
        };
    } catch(err){
        console.error("Erreur lors de la suppression de l'utilisateur :", err);
        return {
            status: 500,
            success: false,
            message: "Une erreur est survenue lors de la suppression de l'utilisateur.",
            error: err.message || "Erreur inconnue"
        };
    }
});