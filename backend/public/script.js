document.addEventListener("DOMContentLoaded", () => {
  const authButton = document.getElementById("authButton");

  authButton.addEventListener("click", () => {
    // Remplacez cette URL par l'URL d'autorisation OAuth2 de votre application
    const authUrl = "URL_D_AUTHORIZATION_OAUTH2";

    // Ouvrez une nouvelle fenêtre ou un nouvel onglet pour l'autorisation
    const newWindow = window.open(authUrl, "_blank", "width=600,height=600");

    // Attendez le retour d'autorisation de l'utilisateur (ou définissez un gestionnaire d'événement pour gérer la réponse)
    window.addEventListener("message", (event) => {
      if (event.origin === window.location.origin) {
        const authCode = event.data;
        if (authCode) {
          // Vous avez obtenu le code d'autorisation, envoyez-le à votre serveur pour obtenir le jeton d'accès
          console.log("Code d'autorisation reçu :", authCode);

          // Fermez la fenêtre d'autorisation
          newWindow.close();
        } else {
          console.error("Échec de l'autorisation.");
        }
      }
    });
  });
});
