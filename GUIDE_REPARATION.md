# 🔧 Guide de Réparation du Formulaire - Étape par Étape

## 📋 Vue d'ensemble

Ce guide vous aidera à diagnostiquer et réparer les problèmes de connexion entre votre formulaire web et Google Sheets via Google Apps Script.

---

## 🔍 ÉTAPE 1 : Vérifier que le script Google Apps Script est déployé

### 1.1 Accéder à Google Apps Script

1. Allez sur [https://script.google.com](https://script.google.com)
2. Connectez-vous avec votre compte Google
3. Trouvez votre projet (ou créez-en un nouveau)

### 1.2 Vérifier le code du script

1. Ouvrez votre projet Google Apps Script
2. Copiez-collez le contenu du fichier `google-apps-script.js` dans l'éditeur
3. **IMPORTANT** : Remplacez `SHEET_ID` par l'ID de votre Google Sheet (ligne 7)
   - Pour trouver l'ID : Ouvrez votre Google Sheet, l'ID est dans l'URL
   - Exemple : `https://docs.google.com/spreadsheets/d/1KX6b6y8lmXKi-L_zIEFjB_SbCBJ4z7ibJj8gxUoPgmw/edit`
   - L'ID est : `1KX6b6y8lmXKi-L_zIEFjB_SbCBJ4z7ibJj8gxUoPgmw`
4. Cliquez sur **Enregistrer** (💾)

### 1.3 Déployer le script

1. Cliquez sur **Déployer** → **Nouvelle version**
2. Configurez les paramètres :
   - **Type** : Application Web
   - **Description** : "Formulaire mariage - Version publique"
   - **Exécuter en tant que** : Moi
   - **Qui a accès** : **Tous** ⚠️ (OBLIGATOIRE - sinon ça ne fonctionnera pas !)
3. Cliquez sur **Déployer**
4. **Copiez l'URL de déploiement** qui s'affiche (vous en aurez besoin à l'étape 2)

---

## 🔍 ÉTAPE 2 : Mettre à jour l'URL dans le formulaire HTML

### 2.1 Trouver l'URL de déploiement

L'URL ressemble à :
```
https://script.google.com/macros/s/AKfycbxTsDV80MebyQBUZLiAXJU5rUTQtfcMes2rCfmbdvxYhc7ldIpuUSrzdH6Fn6FI2-jKkQ/exec
```

### 2.2 Modifier index.html

1. Ouvrez le fichier `index.html`
2. Trouvez la ligne 164 (environ) qui contient :
   ```javascript
   const scriptUrl = 'https://script.google.com/macros/s/...';
   ```
3. Remplacez l'URL par votre nouvelle URL de déploiement
4. Enregistrez le fichier

---

## 🔍 ÉTAPE 3 : Tester l'URL du script

### 3.1 Test GET (simple)

1. Ouvrez l'URL de déploiement dans votre navigateur
2. Vous devriez voir : **"Le script fonctionne ! Utilisez POST pour envoyer des données."**
3. Si vous voyez une erreur ou une page de connexion → **Problème de déploiement** (retour à l'étape 1)

### 3.2 Vérifier les permissions

Si vous voyez une page de connexion :
1. Cliquez sur **Autoriser l'accès**
2. Choisissez votre compte Google
3. Cliquez sur **Avancé** si nécessaire
4. Cliquez sur **Aller à [nom du projet] (non sécurisé)**
5. Cliquez sur **Autoriser**

---

## 🔍 ÉTAPE 4 : Vérifier les permissions du Google Sheet

### 4.1 Accès au Google Sheet

1. Ouvrez votre Google Sheet
2. Cliquez sur **Partager** (en haut à droite)
3. Vérifiez que le script peut y accéder :
   - Le script s'exécute "en tant que vous", donc vous devez avoir accès au Sheet
   - Si le Sheet est privé, assurez-vous d'être connecté avec le bon compte

### 4.2 Vérifier le nom de la feuille

1. Dans votre Google Sheet, vérifiez le nom de la première feuille
2. Par défaut, c'est "Sheet1"
3. Si vous avez renommé la feuille, modifiez le script Google Apps Script ligne 11 :
   ```javascript
   let sheet = spreadsheet.getSheetByName("VOTRE_NOM_DE_FEUILLE");
   ```

---

## 🔍 ÉTAPE 5 : Tester le formulaire

### 5.1 Test local

1. Ouvrez `index.html` dans votre navigateur
2. Remplissez le formulaire avec des données de test
3. Cliquez sur **Envoyer**
4. Vérifiez :
   - ✅ Un message de succès s'affiche
   - ✅ Les données apparaissent dans votre Google Sheet

### 5.2 Si ça ne fonctionne pas

1. Ouvrez la **Console du navigateur** (F12 → Console)
2. Regardez s'il y a des erreurs
3. Notez les messages d'erreur

---

## 🔍 ÉTAPE 6 : Vérifier les logs Google Apps Script

### 6.1 Accéder aux logs

1. Retournez sur [https://script.google.com](https://script.google.com)
2. Ouvrez votre projet
3. Cliquez sur **Exécutions** (menu de gauche)
4. Vous verrez l'historique des exécutions

### 6.2 Analyser les logs

1. Cliquez sur une exécution récente
2. Regardez les logs :
   - ✅ Si vous voyez "Données ajoutées avec succès" → Le script fonctionne
   - ❌ Si vous voyez "ERREUR" → Lisez le message d'erreur

### 6.3 Erreurs courantes dans les logs

- **"Impossible d'ouvrir le Google Sheet"** → Vérifiez l'ID du Sheet (étape 1.2)
- **"Aucune feuille trouvée"** → Vérifiez que votre Sheet a au moins une feuille
- **"Prénom et nom sont requis"** → Le formulaire n'envoie pas les données correctement

---

## 🔍 ÉTAPE 7 : Vérifier la configuration CORS

### 7.1 Comprendre CORS

Google Apps Script nécessite le mode `no-cors` pour les requêtes publiques. C'est normal et déjà configuré dans le code.

### 7.2 Si vous voyez des erreurs CORS

1. Vérifiez que l'URL dans `index.html` est correcte
2. Vérifiez que le déploiement est bien en mode "Tous" (étape 1.3)

---

## ✅ Checklist de vérification finale

Cochez chaque point :

- [ ] Le script Google Apps Script est sauvegardé
- [ ] L'ID du Google Sheet est correct dans le script
- [ ] Le script est déployé comme "Application Web"
- [ ] "Qui a accès" est réglé sur **"Tous"**
- [ ] L'accès au script a été autorisé
- [ ] L'URL de déploiement est correcte dans `index.html`
- [ ] Le test GET fonctionne (étape 3.1)
- [ ] Le Google Sheet est accessible
- [ ] Le formulaire envoie les données
- [ ] Les données apparaissent dans le Google Sheet

---

## 🆘 Problèmes courants et solutions

### Problème : "Impossible de se connecter au serveur"

**Solutions :**
1. Vérifiez que le script est déployé (étape 1)
2. Vérifiez que "Qui a accès" = "Tous" (étape 1.3)
3. Vérifiez l'URL dans `index.html` (étape 2)
4. Testez l'URL directement (étape 3)

### Problème : Les données ne s'enregistrent pas dans le Sheet

**Solutions :**
1. Vérifiez les logs Google Apps Script (étape 6)
2. Vérifiez l'ID du Sheet (étape 1.2)
3. Vérifiez les permissions du Sheet (étape 4)

### Problème : Erreur 401 (Unauthorized)

**Solution :**
- "Qui a accès" n'est pas "Tous" → Modifiez le déploiement (étape 1.3)

### Problème : Erreur 405 (Method Not Allowed)

**Solution :**
- L'URL n'est pas correcte → Vérifiez l'URL dans `index.html` (étape 2)

---

## 📞 Besoin d'aide supplémentaire ?

Si après avoir suivi toutes ces étapes le problème persiste :

1. Notez les messages d'erreur exacts (console navigateur + logs Google Apps Script)
2. Vérifiez que vous avez bien suivi chaque étape
3. Vérifiez que votre Google Sheet existe et est accessible

---

## 🎉 Une fois que ça fonctionne

1. Testez avec plusieurs soumissions
2. Vérifiez que toutes les données s'enregistrent correctement dans le Sheet
3. Vérifiez que les en-têtes sont bien présents (Prénom, Nom, Mairie, Henné, Mariage, Date)

**Félicitations ! Votre formulaire est maintenant opérationnel ! 🎊**

