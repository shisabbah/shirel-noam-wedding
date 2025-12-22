// Code Google Apps Script à copier dans votre projet Google Apps Script
// Ce script recevra les données du formulaire et les enregistrera dans Google Sheets

function doPost(e) {
  try {
    // Récupérer la feuille Google Sheets
    // Option 1 : Si le script est lié à une feuille (créé depuis Google Sheets)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    
    // Option 2 : Si vous préférez utiliser un ID spécifique, décommentez ces lignes :
    // const SHEET_ID = 'VOTRE_ID_DE_FEUILLE'; // Remplacez par l'ID de votre Google Sheet
    // const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName("Sheet1");
    
    // Récupérer les paramètres envoyés
    const params = e.parameter;
    
    // Si la feuille est vide, ajouter les en-têtes
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Prénom', 'Nom', 'Mairie', 'Henné', 'Mariage', 'Date']);
    }
    
    // Ajouter une nouvelle ligne avec les données
    sheet.appendRow([
      params.prenom || '',
      params.nom || '',
      params.nb_mairie || 0,
      params.nb_henne || 0,
      params.nb_mariage || 0,
      new Date()
    ]);
    
    // Retourner une réponse de succès
    return ContentService.createTextOutput(JSON.stringify({status: "success"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // En cas d'erreur, logger et retourner une erreur
    Logger.log('Erreur: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

// Fonction optionnelle pour tester (GET request)
function doGet(e) {
  return ContentService.createTextOutput('Le script fonctionne ! Utilisez POST pour envoyer des données.')
    .setMimeType(ContentService.MimeType.TEXT);
}

