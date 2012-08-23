function messageController(state) 
{
  toast = $(".alert");
  if (state != "error") {
    toast.html("<strong>Success!</strong> Your preferences were successfully saved.");
    delayedFadeInOut(toast);
  } else {
    toast.html("<strong>Error!</strong> There was an error saving your preferences.");
    delayedFadeInOut(toast);
  }
  
}

function delayedFadeInOut(obj)
{
  obj.show();
  obj.delay('1800').fadeOut('slow');
}

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