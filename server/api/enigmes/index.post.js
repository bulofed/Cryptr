import EnigmeModel from '~/server/models/Enigme'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    if (!body || !body.titre) {
      return {
        status: 400,
        success: false,
        message: 'Le titre de l\'énigme est requis.'
      }
    }

    const newEnigme = new EnigmeModel({
      titre: body.titre
    })

    const result = await newEnigme.save()
    return {
      status: 201,
      success: true,
      message: 'Énigme créée avec succès.',
      data: result
    }
  } catch (err) {
    console.error('Erreur lors de la création de l\'énigme :', err)

    return {
      status: 500,
      success: false,
      message: 'Une erreur est survenue lors de la création de l\'énigme.',
      error: err.message || 'Erreur inconnue'
    }
  }
})
