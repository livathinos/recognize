/**
 * Contains listener initialization for the scan, map 
 * and preferences screens. (more to come)
 *
 */

function initListeners() {
  window.onload = function() {
    document.getElementById("scan").addEventListener("touchstart", initCodeScan, false);
    document.getElementById("map").addEventListener("touchstart", initMap, false);
    document.getElementById("prefs").addEventListener("touchstart", initPreferences, false); 
  }
}