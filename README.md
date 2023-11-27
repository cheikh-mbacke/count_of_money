notes :
création utilisateur mysql :
mysql -u root -p
CREATE USER 'count_of_money'@'localhost' IDENTIFIED BY 'count_of_money';
GRANT ALL PRIVILEGES ON count_of_money.* TO 'count_of_money'@'localhost';
FLUSH PRIVILEGES;



