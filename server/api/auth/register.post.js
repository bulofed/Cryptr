import UtilisateurModel from "~/server/models/Utilisateur";
import EnigmeModel from "~/server/models/Enigme";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        if (!body || !body.username || !body.email || !body.password) {
            return {
                status: 400,
                success: false,
                message: "Les champs 'username', 'email', et 'password' sont requis."
            };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return {
                status: 400,
                success: false,
                message: "Le format de l'adresse email est invalide."
            };
        }

        const recaptchaVerificationResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                secret: process.env.RECAPTCHA_SECRET,
                response: body.recaptchaResponse,
            }),
        });

        const recaptchaData = await recaptchaVerificationResponse.json();
        if (!recaptchaData.success) {
            return {
                status: 400,
                success: false,
                message: 'Échec de la validation ReCaptcha.',
            };
        }

        const enigma = await EnigmeModel.findById(body.enigmaId);
        if (!enigma) {
            return {
                status: 404,
                success: false,
                message: "Enigma not found."
            };
        }


        const newUser = new UtilisateurModel({
            username: body.username,
            email: body.email,
            password: body.password,
            unlockedEnigmas: [{
                title: enigma.title,
                difficultyLevel: enigma.difficultyLevel,
                numberOfTry: 0,
                state: 'available'
              }],
        });


        newUser.password = await bcrypt.hash(newUser.password, 10);

        const result = await newUser.save();
        return {
            status: 201,
            success: true,
            message: "Utilisateur créé avec succès.",
            data: result
        };
    } catch (err) {
        console.error("Erreur lors de la création de l'utilisateur :", err);
        return {
            status: 500,
            success: false,
            message: "Une erreur est survenue lors de la création de l'utilisateur.",
            error: err.message || "Erreur inconnue"
        };
    }
});