# Démarrage du Backend

## Dépendances
Pour utiliser ce projet, assurez-vous d'avoir installé :
- Node.js
- Mysql ou mariadb

## Installation
1. Clonez le dépôt depuis GitHub :
   ```
   git clone https://github.com/cheikh-mbacke/count_of_money.git
   ```
2. Accédez au dossier backend et installez les dépendances :
   ```
   cd backend
   npm install
   ```

## Configuration
1. Créez un fichier `.env` dans le répertoire backend avec le contenu suivant :
   ```
   JWT_SECRET=votre_chaine_secrete
   ```
   Vous pouvez générer une chaine de caractères sécurisée en exécutant :
   ```
   node generateKey.js
   ```
2. Créez une base de données
   ```sql
   CREATE DATABASE count_of_money;
   ```
2. Créez un utilisateur et un mot de passe en exécutant dans MySQL :
    ```sql
    CREATE USER 'count_of_money'@'localhost' IDENTIFIED BY 'count_of_money';
    GRANT ALL PRIVILEGES ON count_of_money.* TO 'count_of_money'@'localhost';
    FLUSH PRIVILEGES;
    ```
    N'oubliez pas d'adapter les paramètres du fichier `config/db.js`

## Utilisation
Pour démarrer l application :
1. Lancez le serveur avec Nodemon :
   ```
   npm start 
   ```
2. Accédez à l'application via :
    ```
    Interface principale : http://localhost:3000/
    Documentation de l'API : http://localhost:3000/api-docs
    ```
