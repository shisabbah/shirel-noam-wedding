/**
 * GOOGLE APPS SCRIPT - À copier dans Google Apps Script
 * 
 * Instructions :
 * 1. Allez sur https://script.google.com
 * 2. Créez un nouveau projet
 * 3. Copiez ce code dans l'éditeur
 * 4. Remplacez 'ID_DE_VOTRE_FEUILLE' par l'ID de votre Google Sheet
 * 5. Déployez comme application web (Déployer > Nouvelle version)
 * 6. Autorisez l'accès à votre Google Sheet
 * 7. Copiez l'URL de déploiement et utilisez-la dans index.html
 */

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

