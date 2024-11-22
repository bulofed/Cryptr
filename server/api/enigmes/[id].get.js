import EnigmeModel from "~/server/models/Enigme";

export default defineEventHandler(async (event) => {
    try{
        const { id } = event.context.params;
        if (!id){
            return {
                status: 400,
                success: false,
                message: "ID de l'énigme manquant."
            };
        }

        const enigme = await EnigmeModel.findById(id);
        if (!enigme){
            return {
                status: 404,
                success: false,
                message: `Aucune énigme trouvée avec l'ID : ${id}.`
            };
        }

        return {
            status: 200,
            success: true,
            message: "Énigme récupérée avec succès.",
            data: enigme
        };
    } catch(err){
        console.error("Erreur lors de la récupération de l'énigme :", err);
        return {
            status: 500,
            success: false,
            message: "Une erreur est survenue lors de la récupération de l'énigme.",
            error: err.message || "Erreur inconnue"
        };
    }
});