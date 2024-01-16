# Utiliser l'image officielle MySQL comme base
FROM mysql:latest

# Définir les variables d'environnement pour MySQL
ENV MYSQL_ROOT_PASSWORD count_of_money
ENV MYSQL_DATABASE count_of_money
ENV MYSQL_USER count_of_money
ENV MYSQL_PASSWORD count_of_money

# Exposer le port 3306
EXPOSE 3306
