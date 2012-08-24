/**
 * Library of general purpose functions. Contains UI,
 * DOM manipulation and messaging functions.
 * 
 */


// Take a DOM element and with a delay of 1800ms, 
// fade it out slowly
//
function delayedFadeInOut(obj)
{
  obj.show();
  obj.delay('1800').fadeOut('slow');
}


// Create a notification message for the user when he
// saves his settings.
//
function messageController(state) 
{
  var toast = $(".alert");
  if (state != "error") {
    toast.html("<strong>Success!</strong> Your preferences were successfully saved.");
    delayedFadeInOut(toast);
  } else {
    toast.html("<strong>Error!</strong> There was an error saving your preferences.");
    delayedFadeInOut(toast);
  }
}


// Hide and show pages according to what tab the user
// has pressed.
//
function togglePages(page)
{
  if (page == 'home') {
    $("#default-container").show();
    $("#prefs-container").hide();    
  } else if (page == 'prefs') {
    $("#prefs-container").show();
    $("#default-container").hide();
  }

}