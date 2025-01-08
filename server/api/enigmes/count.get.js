import EnigmeModel from '~/server/models/Enigme';

export default defineEventHandler(async () => {
  try {
    const count = await EnigmeModel.countDocuments();
    return {
      status: 200,
      success: true,
      data: count,
    };
  } catch (err) {
    console.error('Erreur lors de la récupération du nombre total d\'énigmes :', err);
    return {
      status: 500,
      success: false,
      message: 'Une erreur est survenue lors de la récupération du nombre total d\'énigmes.',
      error: err.message || 'Erreur inconnue',
    };
  }
});