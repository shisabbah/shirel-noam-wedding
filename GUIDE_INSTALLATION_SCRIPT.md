# Guide d'installation du script dans Google Sheets

## Étape 1 : Ouvrir votre Google Sheet

1. Allez sur [Google Sheets](https://sheets.google.com)
2. Ouvrez votre Google Sheet (ou créez-en un nouveau)
3. Notez l'**ID de votre feuille** dans l'URL :
   - L'URL ressemble à : `https://docs.google.com/spreadsheets/d/ID_ICI/edit`
   - Copiez la partie entre `/d/` et `/edit`

## Étape 2 : Ouvrir l'éditeur de script

1. Dans votre Google Sheet, cliquez sur **Extensions** (dans le menu en haut)
2. Cliquez sur **Apps Script**
3. Une nouvelle fenêtre s'ouvre avec l'éditeur de script

## Étape 3 : Copier le code

1. Dans l'éditeur Google Apps Script, supprimez tout le code par défaut (le code `function myFunction()`)
2. Copiez le code suivant depuis le fichier `google-apps-script.js` :

```javascript
function doPost(e) {
  try {
    // Parse les données reçues
    const data = JSON.parse(e.postData.contents);
    
    // ID de votre Google Sheet (à remplacer)
    const SHEET_ID = 'ID_DE_VOTRE_FEUILLE';
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Si la feuille est vide, ajouter les en-têtes
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Date', 'Prénom', 'Nom', 'Mairie', 'Henné', 'Mariage']);
    }
    
    // Ajouter une nouvelle ligne avec les données
    const timestamp = new Date();
    sheet.appendRow([
      timestamp,
      data.prenom || '',
      data.nom || '',
      data.nb_mairie || 0,
      data.nb_henne || 0,
      data.nb_mariage || 0
    ]);
    
    // Retourner une réponse de succès
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Données enregistrées avec succès'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Retourner une réponse d'erreur
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Fonction pour tester (optionnelle)
function doGet(e) {
  return ContentService
    .createTextOutput('Le script fonctionne ! Utilisez POST pour envoyer des données.')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

## Étape 4 : Remplacer l'ID de la feuille

1. Dans le code, trouvez la ligne : `const SHEET_ID = 'ID_DE_VOTRE_FEUILLE';`
2. Remplacez `'ID_DE_VOTRE_FEUILLE'` par l'ID que vous avez copié à l'étape 1
   - Par exemple : `const SHEET_ID = '1a2b3c4d5e6f7g8h9i0j';`
   - **IMPORTANT** : Gardez les guillemets autour de l'ID

## Étape 5 : Enregistrer le projet

1. Cliquez sur **Enregistrer** (icône disquette) ou appuyez sur `Ctrl+S` (ou `Cmd+S` sur Mac)
2. Donnez un nom à votre projet (par exemple : "Wedding Form Handler")

## Étape 6 : Déployer le script

1. Cliquez sur **Déployer** (en haut à droite)
2. Cliquez sur **Nouvelle version**
3. Configurez les paramètres :
   - **Description** : "Version 1" (ou autre description)
   - **Exécuter en tant que** : Moi (votre compte)
   - **Qui a accès** : **Tous** (très important !)
4. Cliquez sur **Déployer**

## Étape 7 : Autoriser l'accès

1. Une fenêtre d'autorisation s'ouvre
2. Cliquez sur **Autoriser l'accès**
3. Choisissez votre compte Google
4. Cliquez sur **Avancé** si nécessaire
5. Cliquez sur **Aller à [nom du projet] (non sécurisé)**
6. Cliquez sur **Autoriser**

## Étape 8 : Copier l'URL de déploiement

1. Après le déploiement, une fenêtre s'affiche avec l'URL
2. **Copiez cette URL** (elle ressemble à : `https://script.google.com/macros/s/.../exec`)
3. Cette URL est déjà configurée dans votre `index.html` !

## Étape 9 : Tester

1. Ouvrez votre site web avec le formulaire
2. Remplissez le formulaire avec des données de test
3. Soumettez le formulaire
4. Retournez dans votre Google Sheet
5. Vérifiez que les données apparaissent dans les colonnes :
   - Date
   - Prénom
   - Nom
   - Mairie
   - Henné
   - Mariage

## Dépannage

### Les données n'apparaissent pas
- Vérifiez que l'ID de la feuille est correct dans le script
- Vérifiez que le script est bien déployé avec "Qui a accès : Tous"
- Ouvrez la console du navigateur (F12) pour voir les erreurs

### Erreur d'autorisation
- Allez dans **Déployer** > **Gérer les déploiements**
- Cliquez sur l'icône de modification (crayon)
- Vérifiez que "Qui a accès" est bien "Tous"

### Le script ne fonctionne pas
- Vérifiez que vous avez bien enregistré le projet
- Vérifiez que vous avez bien déployé une nouvelle version
- Testez l'URL du script directement dans votre navigateur (elle devrait afficher "Le script fonctionne !")

