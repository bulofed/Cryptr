import UtilisateurModel from "~/server/models/Utilisateur"

export default defineEventHandler(async (event) => {
    try{
        const { id } = event.context.params;
        const body = await readBody(event);

        if (!id){
            return {
                status: 400,
                success: false,
                message: "ID utilisateur manquant."
            };
        }

        if (!body){
            return {
                status: 400,
                success: false,
                message: "Les données de mise à jour sont manquantes."
            };
        }

        const result = await UtilisateurModel.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!result){
            return {
                status: 404,
                success: false,
                message: `Aucun utilisateur trouvé avec l'ID : ${id}.`
            }
        }

        return {
            status: 200,
            success: true,
            message: "Utilisateur mis à jour avec succès.",
            data: result
        };
    } catch(err){
        console.error("Erreur lors de la mise à jour de l'utilisateur :", err);
        return {
            status: 500,
            success: false,
            message: "Une erreur est survenue lors de la mise à jour de l'utilisateur.",
            error: err.message || "Erreur inconnue"
        };
    }
});