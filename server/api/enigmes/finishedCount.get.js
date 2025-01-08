import UtilisateurModel from '~/server/models/Utilisateur';

export default defineEventHandler(async () => {
  try {
    const utilisateurs = await UtilisateurModel.find({}, 'unlockedEnigmas');
    let totalFinishedEnigmas = 0;

    utilisateurs.forEach(utilisateur => {
      if (utilisateur.unlockedEnigmas && utilisateur.unlockedEnigmas.length > 1) {
        totalFinishedEnigmas += utilisateur.unlockedEnigmas.length - 1;
      }
    });

    return {
      status: 200,
      success: true,
      data: totalFinishedEnigmas,
    };
  } catch (err) {
    console.error('Erreur lors de la récupération du nombre d\'énigmes terminées :', err);
    return {
      status: 500,
      success: false,
      message: 'Une erreur est survenue lors de la récupération du nombre d\'énigmes terminées.',
      error: err.message || 'Erreur inconnue',
    };
  }
});