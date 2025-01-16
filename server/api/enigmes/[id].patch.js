import EnigmeModel from "~/server/models/Enigme";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const body = await readBody(event);

  try {
    const user = await EnigmeModel.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!user) {
      return {
        status: 404,
        success: false,
        message: `Aucun utilisateur trouvé avec le nom d'utilisateur : ${username}.`,
      };
    }

    return {
      status: 200,
      success: true,
      message: "Utilisateur mis à jour avec succès.",
      data: user,
    };
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", err);
    return {
      status: 500,
      success: false,
      message:
        "Une erreur est survenue lors de la mise à jour de l'utilisateur.",
      error: err.message || "Erreur inconnue",
    };
  }
});
