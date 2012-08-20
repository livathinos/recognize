/**
 * Contains functions for the main page activity of Recognize, 
 * including the scan, map and preferences screens.
 *
 */

function initCodeScan() {  
  window.plugins.barcodeScanner.scan( function(result) {
      console.log("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      }, function(error) {
          alert("Scanning failed: " + error);
      }
  );
}

function initDefault() {
  $("#prefs-container").hide();
  $("#default-container").show();
}

function initPreferences() {
  $("#default-container").hide();
  $("#prefs-container").show();
}
