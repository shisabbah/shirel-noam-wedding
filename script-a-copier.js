// Code Google Apps Script à copier dans votre projet Google Apps Script

// Ce script recevra les données du formulaire et les enregistrera dans Google Sheets

// L'ID de votre Google Sheet (récupérez-le dans l'URL de votre feuille)
const SHEET_ID = '1eN0J2swJg10KcbbFIrr9qsejWe-tykI1Y4ggHOWzSrM';

const SHEET_NAME = 'Réponses Mariage';

// Fonction principale qui reçoit les données POST
function doPost(e) {
  try {
    // Vérifier que les données sont présentes
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService
        .createTextOutput(JSON.stringify({ 'result': 'error', 'error': 'Aucune donnée reçue' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Récupérer les données envoyées
    const data = JSON.parse(e.postData.contents);
    
    // Ouvrir la feuille Google Sheets
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // Si la feuille n'existe pas, la créer avec les en-têtes
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Date/Heure',
        'Prénom',
        'Nom',
        'Mairie',
        'Henné',
        'Mariage'
      ]);
      
      // Formater la ligne d'en-tête
      const headerRange = sheet.getRange(1, 1, 1, 6);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#6b8e6f');
      headerRange.setFontColor('#ffffff');
    }
    
    // Ajouter les données dans une nouvelle ligne
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString('fr-FR'),
      data.prenom || '',
      data.nom || '',
      data.nb_mairie || 0,
      data.nb_henne || 0,
      data.nb_mariage || 0
    ]);
    
    // Retourner une réponse de succès
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'data': data }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // En cas d'erreur, la logger et retourner une erreur
    Logger.log('Erreur: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Fonction pour tester le script (GET request)
function doGet(e) {
  return ContentService.createTextOutput('Le script RSVP Mariage fonctionne correctement!');
}

// Fonction de test pour vérifier la connexion à Google Sheets
// Vous pouvez exécuter cette fonction directement dans l'éditeur pour tester
function testConnection() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      Logger.log('La feuille "' + SHEET_NAME + '" n\'existe pas encore. Elle sera créée lors de la première soumission.');
      return 'La feuille sera créée automatiquement lors de la première soumission.';
    } else {
      Logger.log('Connexion réussie ! La feuille "' + SHEET_NAME + '" existe.');
      return 'Connexion réussie ! La feuille existe déjà.';
    }
  } catch (error) {
    Logger.log('Erreur de connexion: ' + error.toString());
    return 'Erreur: ' + error.toString();
  }
}

