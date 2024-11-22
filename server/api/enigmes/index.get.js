import EnigmeModel from "~/server/models/Enigme";

export default defineEventHandler(async () => {
    try{
        const result = await EnigmeModel.find();
        if (!result || result.length === 0){
            return {
                status: 404,
                success: false,
                message: "Aucune énigme trouvée.",
                data: []
            };
        }

        return {
            status: 200,
            success: true,
            message: "Énigmes récupérées avec succès.",
            data: result
        };
    } catch(err){
        console.error("Erreur lors de la récupération des énigmes :", err);
        return {
            status: 500,
            success: false,
            message: "Une erreur est survenue lors de la récupération des énigmes.",
            error: err.message || "Erreur inconnue"
        };
    }
});