# Utiliser une image officielle Node.js pour builder le frontend
FROM node:16 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Construire l'application
RUN npm run build

# Utiliser une image nginx pour servir les fichiers statiques

FROM nginx:alpine 

COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port pour NGINX
EXPOSE 80

# Lancer NGINX
CMD ["nginx", "-g", "daemon off;"]
