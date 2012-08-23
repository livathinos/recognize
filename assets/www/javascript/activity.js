/**
 * Contains functions for the main page activity of Recognize, 
 * including the scan, map and preferences screens.
 *
 */

function initCodeScan() {  
  console.log("Inside init code scan");
  barcodeScanner = window.plugins.barcodeScanner;
  console.log("\n =========> BARCODESCANNER: " + barcodeScanner);
  barcodeScanner.scan( function(result) {
      console.log("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      alert("Scanning successful! " + result.text);
      }, function(error) {
          alert("Scanning failed: " + error);
      }
  );
}
