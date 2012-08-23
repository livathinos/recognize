/**
 * Contains all the database manipulation and
 * initialization functions.
 *
 */


// Initializes the DB and creates (if nonexistant) 
// the settings table.
function onDeviceReady()
{
    initDB();
    createTables();
}


// Initialize the database, check for database support and versions.
function initDB() 
{
  try {
    // check if database are supported by the browser.
    if (!window.openDatabase) { 
      console.log("[ERROR] =========> Browser doesn't support databases.");
    } else { 
  
      // database options
      var shortName = 'RecognizeDatabase'; 
      var version = '1.0'; 
      var displayName = 'Recognize Database'; 
      var maxSize = 655367; // in bytes 
  
      // Open or create the database
      mydb = openDatabase(shortName, version, displayName, maxSize); 
    }
  } catch(e) { 
    // Error handling code goes here. 
    if (e == INVALID_STATE_ERR) { 
        // Version number mismatch. 
        console.log("[ERROR] =========> Invalid database version.");
    } else {
        console.log("[ERROR] =========> " + e);
    }
    return;
  } 
}

// Create the settings table if it does not exist.
function createTables() 
{
  try {
    console.log("[DEBUG] =========> Create table");

    mydb.transaction( function(transaction) {
      var sqlC = 'CREATE TABLE IF NOT EXISTS settings (id INTEGER NOT NULL PRIMARY KEY, name TEXT, intensity TEXT);';
      transaction.executeSql(sqlC, [], nullDataHandler, errorHandler); 
    });
  } catch(e) {
    console.log("[ERROR] =========> " + e.message);
    return;
  }
}

// Select preexisting records and feed them into the insert/update 
// function.
function insertIntoDataBase()
{
  // Check for preexisting records.
  try {
    console.log("[DEBUG] =========> Select preexisting records");

    mydb.transaction( function(transaction) {
      transaction.executeSql('SELECT * FROM settings', [], InsertValues, errorHandler);
    });

  } catch(e) {
    console.log("[ERROR] =========> " + e.message);
  }
}


InsertValues = function(transaction, results)
{
  var len = results.rows.length;
  var getKey;  
  var updateKey = 0;
  var isEdit    = 0;
  var matchkey  = 0;

  // Get the values from the submitted form.
  var name      = document.getElementById("prefs-name").value;
  var intensity = document.getElementById("prefs-intensity").value; 

  if(len != 0) {
    for (var i = 0; i < results.rows.length; i++) {
      getKey = results.rows.item(i).key;
      if(getKey == name) {
          matchkey  = 1;
          isEdit    = 1;
          updateKey = results.rows.item(i).id;
          console.log("[DEBUG] =========> Update key: " + updateKey);
          console.log("[DEBUG] =========> Get Key: " + getKey);
      }
    }
  }

  // Form the insert and update queries.
  var insertQuery = "INSERT INTO settings (name,intensity) VALUES('"
                  + name
                  + "','"
                  + intensity 
                  + "')";

  var updateQuery = 'UPDATE settings SET name="' 
                  + name 
                  + '",intensity="' 
                  + intensity 
                  + '" WHERE id="' 
                  + updateKey 
                  + '"';

  // Check if we're inserting or updating a record.
  // INSERTING
  if(isEdit != 0 && matchkey != 0) {
    try {
      mydb.transaction( function(transaction) {
        transaction.executeSql(sqlI, [], nullDataHandler, errorHandler); 
      });
    } catch(e) {
        console.log("[ERROR] =========> " + e.message);
        return;
    }
    
    console.log("[DEBUG] =========> Insert successful.");

  // UPDATING
  } else {
    try {
      mydb.transaction( function(transaction) {
        transaction.executeSql(sqlU, [], nullDataHandler, errorHandler); 
      });
    } catch(e) {
      console.log("[DEBUG] =========> " + e.message);
      return;
    }
    
    console.log("[DEBUG] =========> Update successful");
    matchkey = 0;
  }
}

errorHandler = function (transaction, error) { 
  // returns true to rollback the transaction
  return true;  
} 

// null db data handler
nullDataHandler = function (transaction, results) { } 

