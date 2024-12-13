import EnigmeModel from '~/server/models/Enigme'

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params
    if (!id) {
      return {
        status: 400,
        success: false,
        message: 'ID ou nom de l\'énigme manquant.'
      }
    }

    let enigma;

    const decodedId = decodeURIComponent(id);

    // Vérifie si le paramètre est un ObjectId valide
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(decodedId);
    if (isValidObjectId) {
      // Recherche par ID
      enigma = await EnigmeModel.findById(id);
    } else {
      // Recherche par nom (insensible à la casse)
      enigma = await EnigmeModel.findOne({ title: { $regex: new RegExp(`^${decodedId}$`, 'i') } });
    }

    if (!enigma) {
      return {
        status: 404,
        success: false,
        message: `Aucune énigme trouvée avec l'ID ou le nom : ${decodedId}.`
      }
    }

    return {
      status: 200,
      success: true,
      message: 'Énigme récupérée avec succès.',
      data: enigma
    }
  } catch (err) {

    return {
      status: 500,
      success: false,
      message: 'Une erreur est survenue lors de la récupération de l\'énigme.',
      error: err.message || 'Erreur inconnue'
    }
  }
})