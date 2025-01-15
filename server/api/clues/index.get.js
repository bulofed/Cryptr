import ClueModel from "~/server/models/Clue";

export default defineEventHandler(async () => {
    try {
        const result = await ClueModel.find();
        if (!result || result.length === 0) {
            return {
                status: 404,
                success: false,
                message: "Aucun indice trouvé.",
                data: [],
            };
        }

        return {
            status: 200,
            success: true,
            message: "Indices récupérés avec succès.",
            data: result,
        };
    } catch (err) {
        console.error("Erreur lors de la récupération des indices :", err);
        return {
            status: 500,
            success: false,
            message: "Une erreur est survenue lors de la récupération des indices.",
            error: err.message || "Erreur inconnue",
        };
    }
});