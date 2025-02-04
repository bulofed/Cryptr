import EnigmeModel from '~/server/models/Enigme'

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params

    if (!id) {
      return {
        status: 400,
        success: false,
        message: 'ID de l\'énigme manquant.'
      }
    }

    const result = await EnigmeModel.findByIdAndDelete(id)
    if (!result) {
      return {
        status: 404,
        success: false,
        message: `Aucune énigme trouvée avec l'ID : ${id}.`
      }
    }

    return {
      status: 200,
      success: true,
      message: 'Énigme supprimée avec succès.',
      data: result
    }
  } catch (err) {
    console.error('Erreur lors de la suppression de l\'énigme :', err)
    return {
      status: 500,
      success: false,
      message: 'Une erreur est survenue lors de la suppression de l\'énigme.',
      error: err.message || 'Erreur inconnue'
    }
  }
})
