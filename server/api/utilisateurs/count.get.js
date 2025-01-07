import UtilisateurModel from '~/server/models/Utilisateur';

export default defineEventHandler(async () => {
  try {
    const count = await UtilisateurModel.countDocuments();
    return {
      status: 200,
      success: true,
      data: count,
    };
  } catch (err) {
    console.error('Erreur lors de la récupération du nombre d\'utilisateurs :', err);
    return {
      status: 500,
      success: false,
      message: 'Une erreur est survenue lors de la récupération du nombre d\'utilisateurs.',
      error: err.message || 'Erreur inconnue',
    };
  }
});