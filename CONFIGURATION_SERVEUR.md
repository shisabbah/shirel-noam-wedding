# Guide de configuration du serveur Google Apps Script

## Problème : Impossible de se connecter au serveur

### Solution 1 : Vérifier le déploiement

1. Allez sur [Google Apps Script](https://script.google.com)
2. Ouvrez votre projet
3. Cliquez sur **Déployer** → **Gérer les déploiements**
4. Vérifiez que :
   - Le statut est **"Actif"**
   - **"Qui a accès"** est réglé sur **"Tous"** ⚠️ (TRÈS IMPORTANT !)
5. Si ce n'est pas "Tous", modifiez le déploiement :
   - Cliquez sur l'icône de modification (crayon)
   - Changez "Qui a accès" en **"Tous"**
   - Cliquez sur **Déployer**

### Solution 2 : Créer un nouveau déploiement

Si vous ne pouvez pas modifier le déploiement existant :

1. Dans Google Apps Script, cliquez sur **Déployer** → **Nouvelle version**
2. Configurez :
   - **Type** : Application Web
   - **Description** : "Version publique"
   - **Exécuter en tant que** : Moi
   - **Qui a accès** : **Tous** ⚠️ (OBLIGATOIRE)
3. Cliquez sur **Déployer**
4. **Autorisez l'accès** si demandé
5. **Copiez la nouvelle URL de déploiement**
6. Remplacez l'URL dans `index.html` ligne 152

### Solution 3 : Autoriser l'accès au script

1. Lors du déploiement, une fenêtre d'autorisation s'ouvre
2. Cliquez sur **Autoriser l'accès**
3. Choisissez votre compte Google
4. Cliquez sur **Avancé** si nécessaire
5. Cliquez sur **Aller à [nom du projet] (non sécurisé)**
6. Cliquez sur **Autoriser**

### Solution 4 : Vérifier que le script est lié à Google Sheets

Si vous utilisez `getActiveSpreadsheet()` :

1. Le script doit être créé depuis Google Sheets :
   - Ouvrez votre Google Sheet
   - Allez dans **Extensions** → **Apps Script**
   - Collez le code du script
   - Enregistrez et déployez

OU

2. Modifiez le script pour utiliser un ID spécifique :

```javascript
function doPost(e) {
  try {
    // Remplacez par l'ID de votre Google Sheet
    const SHEET_ID = 'VOTRE_ID_ICI';
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName("Sheet1");
    
    const params = e.parameter;
    
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Prénom', 'Nom', 'Mairie', 'Henné', 'Mariage', 'Date']);
    }
    
    sheet.appendRow([
      params.prenom || '',
      params.nom || '',
      params.nb_mairie || 0,
      params.nb_henne || 0,
      params.nb_mariage || 0,
      new Date()
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({status: "success"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Erreur: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Solution 5 : Tester l'URL directement

1. Ouvrez l'URL de déploiement dans votre navigateur :
   ```
   https://script.google.com/macros/s/AKfycbxTsDV80MebyQBUZLiAXJU5rUTQtfcMes2rCfmbdvxYhc7ldIpuUSrzdH6Fn6FI2-jKkQ/exec
   ```
2. Vous devriez voir : "Le script fonctionne ! Utilisez POST pour envoyer des données."
3. Si vous voyez une erreur ou une page de connexion, le problème vient du déploiement

### Solution 6 : Vérifier les logs d'exécution

1. Dans Google Apps Script, allez dans **Exécutions** (menu de gauche)
2. Testez votre formulaire
3. Regardez les exécutions récentes
4. Si vous voyez des erreurs, notez-les et corrigez le script

## Erreurs courantes

### Erreur 401 (Unauthorized)
- **Cause** : "Qui a accès" n'est pas "Tous"
- **Solution** : Modifiez le déploiement pour mettre "Qui a accès : Tous"

### Erreur 405 (Method Not Allowed)
- **Cause** : L'URL n'est pas correcte
- **Solution** : Utilisez l'URL de déploiement depuis "Gérer les déploiements"

### "Impossible de se connecter au serveur"
- **Cause** : Le script n'est pas déployé ou les permissions sont incorrectes
- **Solution** : Vérifiez le déploiement et les permissions

## Checklist de configuration

- [ ] Le script est sauvegardé dans Google Apps Script
- [ ] Le script est déployé comme "Application Web"
- [ ] "Qui a accès" est réglé sur "Tous"
- [ ] L'accès a été autorisé
- [ ] L'URL de déploiement est correcte dans index.html
- [ ] Le script peut accéder à Google Sheets (lié ou avec ID)
- [ ] L'URL fonctionne quand on l'ouvre dans le navigateur

