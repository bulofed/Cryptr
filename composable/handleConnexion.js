import Cookies from 'js-cookie';
import { handleLogin } from "../server/handlers/loginHandler";
import UtilisateurModel from '../server/models/Utilisateur';

export const handleConnexion = async (router, emailOrUsername, password, rememberMe = 7) => {
    const response = await handleLogin(emailOrUsername, password);

    if (response.status === 200) {
        Cookies.set('session', JSON.stringify(response.user), { expires: rememberMe });

        const user = await UtilisateurModel.findOne({ email: response.user.email });
        const lastEnigma = user.unlockedEnigmas[user.unlockedEnigmas.length - 1];

        router.push(`/enigme/${lastEnigma.id}`);
    } else {
        alert(response.message);
    }
};