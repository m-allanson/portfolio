/**
 * Includes js files and runs DOM ready code
 */

 LibMan = {
	// String : The path to libman.js
	path: null,

	/**
	 * Calculates and sets the relative path to libman.js
	 *
	 * @return void  
	 */
	calculatePath: function() {
		// condition : is object var already set?
		if (this.path == null) {
			// get path from LibraryManager javascript include string
			var libman = document.getElementById("libman");
			if (!libman) return false;
			
			// remove the filename before setting the path 
			this.path = libman.src.replace(/libman\.js(\?.*)?$/,'');
		}
	},


	/**
	 * Wrapper for requireFile, allows single filename or array
	 * of filenames to be passed in
	 * 
	 * @param mixed libFiles string or array of paths to files 
	 * to include, absolute or relative to libman.js
	 *
	 * @return void  
	 */
	requireFiles: function(libFiles) {
		if (typeof(libFiles) == "string") { // single file to include (called from php)
			LibMan.requireFile(libFiles);
		} else { // array of files to include (called from libman.js)
			for (var i=0; i < libFiles.length; i++) {
				LibMan.requireFile(libFiles[i]);
			};
		}
	},
	
	
	/**
	 * Includes a js file
	 * 
	 * @param string libFile path to file to include, 
	 * absolute or relative to libman.js
	 *
	 * @return void  
	 */
	requireFile: function(libFile){
		// match strings starting with 'http://'
		var pattern = /^http:\/\//;
		
		// if libFile matches pattern, path is absolute, otherwise it's relative
		libFile = (pattern.test(libFile)) ? libFile : this.path + libFile;
		document.write('<script type="text/javascript" src="'+ libFile +'"></script>');
	}
} 

/*
 * site-specific file includes
 */
var requiredFiles = [
	'lib/popups/jquery.popups.js'
	,'site/projectsort.js'
];
	
LibMan.calculatePath();
LibMan.requireFiles(requiredFiles);

// on DOM ready
$(document).ready(function() {
	// allows css styles depending if js is enabled
	$('html').addClass('hasJs');

	// grid overlay script
	// $.gridOverlay('../resources/templates/', {imgExt: "jpg"});            

	// arrange projects on page
	projectSort.init();

	// open external links in new tabs
	$.popups();
});

// on window resize
$(window).resize(function(){ projectSort.sort(); });