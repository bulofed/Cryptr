import UtilisateurModel from '~/server/models/Utilisateur'

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params;
    if (!id) {
      return {
        status: 400,
        success: false,
        message: 'Paramètre manquant. Spécifiez un ID ou un username.',
      };
    }

    let user;

    // Vérifie si le paramètre est un ObjectId valide
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    if (isValidObjectId) {
      // Recherche par ID
      user = await UtilisateurModel.findById(id);
    }

    // Si aucun utilisateur n'est trouvé par ID, recherche par username
    if (!user) {
      user = await UtilisateurModel.findOne({ username: { $regex: new RegExp(`^${id}$`, 'i') } });
    }

    // Vérifie si l'utilisateur a été trouvé
    if (!user) {
      return {
        status: 404,
        success: false,
        message: 'Utilisateur non trouvé.',
      };
    }

    return {
      status: 200,
      success: true,
      data: user,
    };
  } catch (err) {
    console.error('Erreur lors de la récupération de l\'utilisateur :', err);
    return {
      status: 500,
      success: false,
      message: 'Une erreur est survenue lors de la récupération de l\'utilisateur.',
      error: err.message || 'Erreur inconnue',
    };
  }
});