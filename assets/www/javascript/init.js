$(document).ready(function() {
	
	var modify = 0;
	
	// User submits his settins
	//
	$("#settings").submit(function() {
	  
	  // Set modify to one, since we want to
	  // insert or update our settings.
	  modify = 1;
	  
	  // Call the database controller.
	  databaseController(modify);
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

    $("#prefs-container").toggle();
    $("#default-container").toggle();
	});
	
	
	// User navigates to the home page.
	//
	$("#default-link").live('tap',function() {
    $("#default-container").toggle();
    $("#prefs-container").toggle();
	});
	
	
});
