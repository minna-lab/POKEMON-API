// helper.js
// Fonction utilitaire qui formate toutes les réponses de l'API
// de manière uniforme avec un message et les données associées

exports.success = (message, data) => {
    return { message, data };
};
