# Utiliser une image spécifique de Node.js
FROM node:alpine

# Installer Python et autres dépendances nécessaires pour la compilation
RUN apk add --no-cache python3 make g++

# Définir python3 comme la version par défaut de Python
RUN ln -sf python3 /usr/bin/python

WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Reconstruire bcrypt avec les sources
RUN npm rebuild bcrypt --build-from-source

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port 3000
EXPOSE 3003

# Commande pour démarrer l'application
CMD ["npm", "run", "start"]
