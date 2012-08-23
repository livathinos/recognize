/**
 * Contains all the database manipulation and
 * initialization functions.
 *
 */


// Initializes the DB and creates (if nonexistant) 
// the settings table.
function onDeviceReady()
{
    var mydb = initDB();
    createTables(mydb);
}


// Initialize the database, check for database support and versions.
function initDB() 
{
  var mydb;
  
  try {
    // check if database are supported by the browser.
    if (!window.openDatabase) { 
      console.log("[ERROR] =========> Browser doesn't support databases.");
      return null;
    } else { 
  
      // database options
      var shortName = 'RecognizeDatabase'; 
      var version = '1.0'; 
      var displayName = 'Recognize Database'; 
      var maxSize = 655367; // in bytes 
  
      // Open or create the database
      mydb = window.openDatabase(shortName, version, displayName, maxSize); 
      return mydb;
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
function createTables(mydb) 
{
  try {
    console.log("[DEBUG] =========> Create table");

    mydb.transaction( function(transaction) {
      var sql = 'DROP TABLE IF EXISTS settings;';
      transaction.executeSql(sql, [], nullDataHandler, errorHandler);
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
function databaseController(modify)
{
  
  var mydb = initDB();
  // Check for preexisting records.
  try {
    console.log("[DEBUG] =========> Select preexisting records");
    
    // Check if this is a modification call (ie. the user has pressed the submit button)
    // and route him to the appropriate function.
    if (modify == 1) {
      mydb.transaction( function(transaction) {
        transaction.executeSql('SELECT * FROM settings', [], modifySettings, errorHandler);
      });      
    } else {
      mydb.transaction( function(transaction) {
        transaction.executeSql('SELECT * FROM settings', [], returnSettings, errorHandler);
      });
    }

  } catch(e) {
    console.log("[ERROR] =========> " + e.message);
  }
}

returnSettings = function(transaction, results)
{
  var mydb = initDB();
  var len = results.rows.length;
  var getKey;  
  var updateKey;
  
  console.log("[DEBUG] =========> INSIDE return settings.");
  console.log("[DEBUG] =========> LENGTH " + len);
    
  // If there are records in the result set, populate the
  // form fields with that information.
  if(len != 0) {
    for (var i = 0; i < results.rows.length; i++) {
      document.getElementById("prefs-name").value = results.rows.item(i)['name'];
      document.getElementById("prefs-intensity").value = results.rows.item(i)['intensity'];
    }
  }
  
}

modifySettings = function(transaction, results)
{
  
  var mydb = initDB();
  var len = results.rows.length;
  var getKey;  
  var updateKey = 0;
  var isEdit    = 0;
  var matchkey  = 0;

  // Get the values from the submitted form.
  var name      = document.getElementById("prefs-name").value;
  var intensity = document.getElementById("prefs-intensity").value; 

  if(len != 0) {
    console.log("========> HOW MUCH IS LEN???? " + len);
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
  if(isEdit == 0 && matchkey == 0) {
    try {
      mydb.transaction( function(transaction) {
        transaction.executeSql(insertQuery, [], nullDataHandler, errorHandler); 
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
        transaction.executeSql(updateQuery, [], nullDataHandler, errorHandler); 
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

