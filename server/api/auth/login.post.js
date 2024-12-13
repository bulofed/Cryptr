import { defineEventHandler, readBody } from 'h3';
import UtilisateurModel from '~/server/models/Utilisateur';
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
  const { identifier, password, isEmail } = await readBody(event);

  try {
    const user = await UtilisateurModel.findOne(
      isEmail ? { email: identifier } : { username: identifier }
    );

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return {
          status: 200,
          success: true,
          message: 'Utilisateur trouvé et mot de passe valide',
          user: {
            email: user.email,
            username: user.username,
          },
        };
      } else {
        return {
          status: 401,
          success: false,
          message: 'Mot de passe incorrect',
        };
      }
    } else {
      return {
        status: 422,
        success: false,
        message: 'Utilisateur non trouvé',
      };
    }
  } catch (err) {
    console.error('Erreur lors de la vérification de l\'utilisateur :', err);
    return {
      status: 500,
      success: false,
      message: 'Une erreur est survenue lors de la vérification de l\'utilisateur.',
    };
  }
});