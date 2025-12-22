# Instructions pour configurer Google Sheets avec le formulaire

## Étape 1 : Créer un Google Sheet

1. Allez sur [Google Sheets](https://sheets.google.com)
2. Créez une nouvelle feuille de calcul
3. Notez l'ID de votre feuille dans l'URL :
   - L'URL ressemble à : `https://docs.google.com/spreadsheets/d/ID_DE_VOTRE_FEUILLE/edit`
   - Copiez la partie `ID_DE_VOTRE_FEUILLE`

## Étape 2 : Créer le script Google Apps Script

1. Allez sur [Google Apps Script](https://script.google.com)
2. Cliquez sur "Nouveau projet"
3. Supprimez le code par défaut
4. Copiez le contenu du fichier `google-apps-script.js` dans l'éditeur
5. Remplacez `'ID_DE_VOTRE_FEUILLE'` par l'ID que vous avez copié à l'étape 1
6. Enregistrez le projet (donnez-lui un nom, par exemple "Wedding Form Handler")

## Étape 3 : Déployer le script

1. Cliquez sur "Déployer" > "Nouvelle version"
2. Choisissez le type : "Application Web"
3. Configurez :
   - **Description** : "Version 1" (ou autre)
   - **Exécuter en tant que** : Moi
   - **Qui a accès** : Tous (important pour que le formulaire fonctionne)
4. Cliquez sur "Déployer"
5. **Autorisez l'accès** : Cliquez sur "Autoriser l'accès" et acceptez les permissions
6. **Copiez l'URL de déploiement** qui s'affiche (elle ressemble à : `https://script.google.com/macros/s/...`)

## Étape 4 : Configurer le formulaire HTML

1. Ouvrez le fichier `index.html`
2. Trouvez la ligne avec `const SCRIPT_URL = 'VOTRE_URL_GOOGLE_APPS_SCRIPT';`
3. Remplacez `'VOTRE_URL_GOOGLE_APPS_SCRIPT'` par l'URL que vous avez copiée à l'étape 3

## Étape 5 : Tester

1. Ouvrez votre site web
2. Remplissez le formulaire
3. Soumettez-le
4. Vérifiez dans votre Google Sheet que les données apparaissent bien

## Structure des données dans Google Sheets

Les colonnes seront automatiquement créées :
- **Date** : Date et heure de la soumission
- **Prénom** : Prénom de la personne
- **Nom** : Nom de la personne
- **Mairie** : Nombre de personnes pour la mairie
- **Henné** : Nombre de personnes pour le henné
- **Mariage** : Nombre de personnes pour le mariage

## Dépannage

### Les données n'apparaissent pas dans Google Sheets
- Vérifiez que l'ID de la feuille est correct dans le script
- Vérifiez que l'URL du script est correcte dans index.html
- Vérifiez que le script est déployé avec "Qui a accès : Tous"

### Erreur d'autorisation
- Allez dans Google Apps Script
- Cliquez sur "Déployer" > "Gérer les déploiements"
- Cliquez sur l'icône de modification (crayon)
- Vérifiez que "Qui a accès" est bien "Tous"

### Le formulaire ne fonctionne pas
- Ouvrez la console du navigateur (F12) pour voir les erreurs
- Vérifiez que l'URL du script est accessible
- Testez l'URL du script directement dans votre navigateur (elle devrait afficher "Le script fonctionne !")

