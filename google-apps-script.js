function doPost(e) {
    try {
      // ID de votre Google Sheet
      const SHEET_ID = '1KX6b6y8lmXKi-L_zIEFjB_SbCBJ4z7ibJj8gxUoPgmw';
      
      // Vérifier que l'ID est présent et valide
      if (!SHEET_ID || SHEET_ID === 'VOTRE_ID_ICI' || SHEET_ID.trim() === '') {
        throw new Error('ID de Google Sheet non configuré. Veuillez remplacer SHEET_ID dans le script.');
      }
      
      // Ouvrir le spreadsheet
      let spreadsheet;
      try {
        spreadsheet = SpreadsheetApp.openById(SHEET_ID);
      } catch (err) {
        throw new Error('Impossible d\'ouvrir le Google Sheet. Vérifiez que l\'ID est correct et que le script a les permissions nécessaires.');
      }
      
      // Essayer de récupérer "Sheet1", sinon utiliser la première feuille
      let sheet = spreadsheet.getSheetByName("S&N");
      if (!sheet) {
        // Si Sheet1 n'existe pas, utiliser la première feuille disponible
        const sheets = spreadsheet.getSheets();
        if (sheets.length === 0) {
          throw new Error('Aucune feuille trouvée dans le Google Sheet.');
        }
        sheet = sheets[0];
        Logger.log('Sheet1 non trouvé, utilisation de la première feuille: ' + sheet.getName());
      }
      
      // Récupérer les paramètres envoyés
      const params = e.parameter;
      Logger.log('Données reçues: ' + JSON.stringify(params));
      
      // Validation des données requises
      if (!params.prenom || !params.nom) {
        throw new Error('Prénom et nom sont requis.');
      }
      
      // Si la feuille est vide, ajouter les en-têtes
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(['Prénom', 'Nom', 'Mairie', 'Henné', 'Mariage', 'Date']);
        Logger.log('En-têtes ajoutés');
      }
      
      // Convertir les valeurs numériques
      const nbMairie = parseInt(params.nb_mairie) || 0;
      const nbHenne = parseInt(params.nb_henne) || 0;
      const nbMariage = parseInt(params.nb_mariage) || 0;
      
      // Ajouter une nouvelle ligne avec les données
      const newRow = [
        params.prenom.trim() || '',
        params.nom.trim() || '',
        nbMairie,
        nbHenne,
        nbMariage,
        new Date()
      ];
      
      sheet.appendRow(newRow);
      Logger.log('Données ajoutées avec succès dans la feuille: ' + sheet.getName());
      Logger.log('Ligne ajoutée: ' + JSON.stringify(newRow));
      
      // Retourner une réponse de succès
      return ContentService
        .createTextOutput(JSON.stringify({
          status: "success",
          message: "Données enregistrées avec succès"
        }))
        .setMimeType(ContentService.MimeType.JSON);
        
    } catch (error) {
      // En cas d'erreur, logger et retourner une erreur
      Logger.log('ERREUR: ' + error.toString());
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
  
  