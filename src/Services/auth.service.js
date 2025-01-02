// auth.service.js

const validEmail = "plateform@gmail.com";
const validPassword = "m2i202567";

// Fonction de connexion
const login = (email, password) => {
    return new Promise((resolve, reject) => {
        if (email === validEmail && password === validPassword) {
            const user = {
                email: validEmail,
                token: "dummy-token",
            };
            localStorage.setItem("user", JSON.stringify(user));
            resolve(user); // Résout la Promise avec l'utilisateur
        } else {
            reject(new Error("Identifiants invalides")); // Rejette la Promise en cas d'erreur
        }
    });
};

const AuthService = {
    login,
};

export default AuthService;
