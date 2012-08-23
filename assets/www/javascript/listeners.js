/**
 * Contains listener initialization for the scan, map 
 * and preferences screens. (more to come)
 *
 */

function localInit() {
  window.onload = function() {
    console.log("==========> INSIDE localInit()");
    document.addEventListener("deviceready", initListeners, false);
    document.addEventListener("deviceready", onDeviceReady, false);
  }
}

function initListeners() {
    document.getElementById("scan").addEventListener("touchstart", initCodeScan, false);
    document.getElementById("default-link").addEventListener("touchstart", initDefault, false); 
    document.getElementById("prefs-link").addEventListener("touchstart", initPreferences, false); 
}
