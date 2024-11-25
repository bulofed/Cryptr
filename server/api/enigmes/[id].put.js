import EnigmeModel from '~/server/models/Enigme'

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params
    const body = await readBody(event)

    if (!id) {
      return {
        status: 400,
        success: false,
        message: 'ID de l\'énigme manquant.'
      }
    }

    if (!body) {
      return {
        status: 400,
        success: false,
        message: 'Les données de mise à jour sont manquantes.'
      }
    }

    const result = await EnigmeModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    })
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
      message: 'Énigme mise à jour avec succès.',
      data: result
    }
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'énigme :', err)
    return {
      status: 500,
      success: false,
      message: 'Une erreur est survenue lors de la mise à jour de l\'énigme.',
      error: err.message || 'Erreur inconnue'
    }
  }
})
