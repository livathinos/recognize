jQuery.extend(
  jQuery.expr[ ":" ], 
  { reallyvisible : function (a) { return !(jQuery(a).is(':hidden') || jQuery(a).parents(':hidden').length); }}
);

$(document).ready(function() {
	
	var modify = 0;
	var state;
	
	// By default, we'd like the homepage container
	// to be visible and the preferences container to
	// be invisible
	//
  $("#prefs-container").hide();
  $("#default-container").show();
	
	// User submits his settins
	//
	$("#settings").submit(function() {
	  
	  // Set modify to one, since we want to
	  // insert or update our settings.
	  modify = 1;
	  
	  // Call the database controller.
	  databaseController(modify, state);
	  
	  // Show the user a success/failure message
	  messageController(state);
	  
	  return false;
	});
	
	
	// User presses the 'Scan' button to scan a 
	// QR code.
	//
	$("#scan").live('tap', initCodeScan);
		
		
	// User navigates to the preferences page.
	// 	
	$("#prefs-link").live('tap', function() {

    // Set modify to zero, since we just want the
    // function to select our older settings.
    modify = 0;

    // Call the database controller.
	  databaseController(modify);

    // Toggle the preferences and default containers
    // (ie. switching pages)
    //
    togglePages("prefs");
	});
	
	
	// User navigates to the home page.
	//
	$("#default-link").live('tap',function() {
    togglePages("home");
	});
	
	
});
