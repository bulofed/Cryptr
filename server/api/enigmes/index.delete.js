import EnigmeModel from "~/server/models/Enigme";

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

        const result = await EnigmeModel.deleteMany(body.filter);
        return {
            status: 200,
            success: true,
            message: `${result.deletedCount} énigme(s) supprimée(s) avec succès.`,
            data: result
        };
    } catch(err){
        console.error("Erreur lors de la suppression des énigmes :", err);
        return {
            status: 500,
            success: false,
            message: "Une erreur est survenue lors de la suppression des énigmes.",
            error: err.message || "Erreur inconnue"
        };
    }
});