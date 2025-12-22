// Code Google Apps Script à copier dans votre projet Google Apps Script
// Ce script recevra les données du formulaire et les enregistrera dans Google Sheets

function doPost(e) {
  try {
    // ID de votre Google Sheet
    const SHEET_ID = '1KX6b6y8lmXKi-L_zIEFjB_SbCBJ4z7ibJj8gxUoPgmw';
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    
    // Essayer de récupérer "Sheet1", sinon utiliser la première feuille
    let sheet = spreadsheet.getSheetByName("Sheet1");
    if (!sheet) {
      // Si Sheet1 n'existe pas, utiliser la première feuille disponible
      sheet = spreadsheet.getSheets()[0];
      Logger.log('Sheet1 non trouvé, utilisation de la première feuille: ' + sheet.getName());
    }
    
    // Récupérer les paramètres envoyés
    const params = e.parameter;
    Logger.log('Données reçues: ' + JSON.stringify(params));
    
    // Si la feuille est vide, ajouter les en-têtes
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Prénom', 'Nom', 'Mairie', 'Henné', 'Mariage', 'Date']);
      Logger.log('En-têtes ajoutés');
    }
    
    // Ajouter une nouvelle ligne avec les données
    const newRow = [
      params.prenom || '',
      params.nom || '',
      params.nb_mairie || 0,
      params.nb_henne || 0,
      params.nb_mariage || 0,
      new Date()
    ];
    sheet.appendRow(newRow);
    Logger.log('Données ajoutées dans la feuille: ' + sheet.getName());
    Logger.log('Ligne ajoutée: ' + JSON.stringify(newRow));
    
    // Retourner une réponse de succès
    return ContentService
      .createTextOutput(JSON.stringify({status: "success"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // En cas d'erreur, logger et retourner une erreur
    Logger.log('Erreur: ' + error.toString());
    Logger.log('Stack trace: ' + error.stack);
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Fonction optionnelle pour tester (GET request)
function doGet(e) {
  return ContentService
    .createTextOutput('Le script fonctionne ! Utilisez POST pour envoyer des données.')
    .setMimeType(ContentService.MimeType.TEXT);
}

