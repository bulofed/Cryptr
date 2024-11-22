import UtilisateurModel from "~/server/models/Utilisateur";

export default defineEventHandler(async (event) => {
    try{
        const body = await readBody(event);
        if (!body || !body.filter){
            return {
                status: 400,
                success: false,
                message: "Les critères de suppression sont requis."
            };
        }

        const result = await UtilisateurModel.deleteMany(body.filter);
        return {
            status: 200,
            success: true,
            message: `${result.deletedCount} utilisateur(s) supprimé(s) avec succès.`,
            data: result
        };
    } catch(err){
        console.error("Erreur lors de la suppression des utilisateurs :", err);
        return {
            status: 500,
            success: false,
            message: "Une erreur est survenue lors de la suppression des utilisateurs.",
            error: err.message || "Erreur inconnue"
        };
    }
});