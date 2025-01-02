# Étape 1 : Utiliser Maven avec JDK 21 pour construire l'application
FROM maven:3.9.4-eclipse-temurin-21 AS build

WORKDIR /app

# Copier les fichiers nécessaires pour Maven
COPY pom.xml .
RUN mvn dependency:go-offline -Dmaven.wagon.http.retryHandler.count=3

# Copier le code source
COPY src ./src

# Compiler le projet
RUN mvn clean package -DskipTests -Dmaven.wagon.http.retryHandler.count=3

# Étape 2 : Utiliser une image légère pour exécuter l'application
FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

# Copier le fichier JAR depuis l'étape précédente
COPY --from=build /app/target/sprintone-0.0.1-SNAPSHOT.jar app.jar

# Exposer le port de l'application
EXPOSE 8082

# Commande de démarrage
ENTRYPOINT ["java", "-jar", "app.jar"]
