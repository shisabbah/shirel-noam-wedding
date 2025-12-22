# Comment vérifier les résultats dans Google Sheets

## Où trouver les données

1. **Ouvrez votre Google Sheet** :
   - Allez sur : https://docs.google.com/spreadsheets/d/1KX6b6y8lmXKi-L_zIEFjB_SbCBJ4z7ibJj8gxUoPgmw/edit

2. **Vérifiez les onglets** :
   - Le script cherche d'abord un onglet nommé **"Sheet1"**
   - Si "Sheet1" n'existe pas, il utilise la **première feuille disponible**
   - Regardez tous les onglets en bas de la page

3. **Vérifiez les colonnes** :
   - Les données devraient apparaître dans cet ordre :
     - **Prénom**
     - **Nom**
     - **Mairie**
     - **Henné**
     - **Mariage**
     - **Date**

## Si vous ne voyez pas les données

### Vérification 1 : Nom de la feuille

1. Regardez les onglets en bas de votre Google Sheet
2. Si vous n'avez pas d'onglet "Sheet1", le script utilise la première feuille
3. Vérifiez toutes les feuilles pour trouver vos données

### Vérification 2 : Logs d'exécution

1. Allez sur [Google Apps Script](https://script.google.com)
2. Ouvrez votre projet
3. Cliquez sur **Exécutions** (menu de gauche)
4. Regardez les exécutions récentes
5. Cliquez sur une exécution pour voir les logs
6. Vous devriez voir :
   - "Données reçues: ..."
   - "Données ajoutées dans la feuille: ..."
   - "Ligne ajoutée: ..."

### Vérification 3 : Permissions

1. Vérifiez que le script a bien accès à votre Google Sheet
2. Dans Google Apps Script, lors de l'exécution, vous devriez avoir autorisé l'accès
3. Si nécessaire, réautorisez l'accès

### Vérification 4 : Test manuel

1. Remplissez le formulaire avec des données de test
2. Soumettez-le
3. Attendez quelques secondes
4. Actualisez votre Google Sheet (F5)
5. Vérifiez toutes les feuilles

## Solution : Forcer l'utilisation d'une feuille spécifique

Si vous voulez que les données soient toujours dans une feuille spécifique, modifiez le script :

```javascript
// Pour utiliser une feuille nommée "Réponses"
let sheet = spreadsheet.getSheetByName("Réponses");
if (!sheet) {
  sheet = spreadsheet.insertSheet("Réponses");
}
```

Ou pour toujours utiliser la première feuille :

```javascript
// Toujours utiliser la première feuille
let sheet = spreadsheet.getSheets()[0];
```

## Colonnes attendues

Les données sont enregistrées dans cet ordre :
1. **Prénom** (colonne A)
2. **Nom** (colonne B)
3. **Mairie** (colonne C)
4. **Henné** (colonne D)
5. **Mariage** (colonne E)
6. **Date** (colonne F)

## Dépannage

Si vous ne voyez toujours pas les données :
1. Vérifiez les logs d'exécution dans Google Apps Script
2. Vérifiez que l'ID du Google Sheet est correct dans le script
3. Testez avec des données simples
4. Vérifiez que le script est bien déployé

