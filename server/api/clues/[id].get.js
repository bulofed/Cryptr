import ClueModel from '~/server/models/Clue';

export default defineEventHandler(async (event) => {
    try {
        const { id } = event.context.params;
        if (!id) {
        return {
            status: 400,
            success: false,
            message: 'ID ou nom de l\'indice manquant.'
        };
        }
    
        let clue;
    
        const decodedId = decodeURIComponent(id);
    
        // Vérifie si le paramètre est un ObjectId valide
        const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(decodedId);
        if (isValidObjectId) {
        // Recherche par ID
        clue = await ClueModel.findById(id);
        } else {
        // Recherche par nom (insensible à la casse)
        clue = await ClueModel.findOne({ title: { $regex: new RegExp(`^${decodedId}$`, 'i') } });
        }
    
        if (!clue) {
        return {
            status: 404,
            success: false,
            message: `Aucun indice trouvé avec l'ID ou le nom : ${decodedId}.`
        };
        }
    
        return {
        status: 200,
        success: true,
        message: 'Indice récupéré avec succès.',
        data: clue
        };
    } catch (err) {
    
        return {
        status: 500,
        success: false,
        message: 'Une erreur est survenue lors de la récupération de l\'indice.',
        error: err.message || 'Erreur inconnue'
        };
    }
    }
);