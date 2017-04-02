/**
 * Arranges projects on the home page.  
 * 
 * Based on window size projects are sorted into columns, 
 * each project being put into the shortest column
 * before moving onto the next project.
 *
 * @requires jQuery (tested on 1.3 and above)
 * @author Mike Allanson
 */
var projectSort = function () {

	var config = {
		projectWidth: 400,
		projectPadding: 45 // padding below each project
	};

	var projects = {};  // holds project elements
	var colHeights = [];  // holds height of each column
	var projectWidth, contentWidth, colCount, currentCol, container;

	/*
	 * Assigns a jQuery object containing all elements with the class 'projectClass'
	 *
	 * @param projectClass string The class of the elements we want to collect
	 */
	function getProjects(projectClass) {
		projects = $('.'+projectClass);
	}

	/*
	 * Assigns information based on the size of the browser window
	 */
	function getWindowInfo() {
		projectWidth = config.projectWidth;
		contentWidth = $('#content').width();
		colCount = Math.floor(contentWidth / projectWidth);
	}

	/*
	 * Deals with positioning each project on the page
	 *
	 * @param projects object A jQuery object containing all the elements that need to be arranged on the page
	 */
	function positionProjects(projects){
		colHeights = []; // reset array
		currentCol = colCount > 0 ? colCount - 1 : colCount; // always start with last column - ensures 'about' block appears at top right

		projects.each(function(i){
			// set project x coordinate
			$(this).css('left', currentCol * projectWidth);

			// if no colHeight exists, assume it's 0
			colHeights[currentCol] |= 0;

			// set project y coordinate to bottom of current col
			$(this).css('top', colHeights[currentCol]);

			// update height of current col
			colHeights[currentCol] += $(this).height() + config.projectPadding; // add a little padding below each project

			// update height of parent element, maintains normal document flow for content further down the page
			if ($(this).parent().height() < colHeights[currentCol]) {
				$(this).parent().css('height', colHeights[currentCol]+'px');
			}

			// what column next?  
			currentCol = getLowestValue(colHeights);
		});

		// once everything is positioned, check container height matches that of tallest column
		maxHeight = Math.max.apply(Math, colHeights);
		$(projects[0]).parent().css('height', maxHeight+'px');
	}
	
	/*
	 * Gets the index of the lowest value in an array.  Does not sort the array.
	 *
	 * @param colArray array An array of numerical values
	 *
	 * @return minId int The array index pointing to the lowest value in the array
	 */
	function getLowestValue (colArray) {
		var minNum = colArray[0] | 0;  // set lowest value to height of first col, or 0 if undefined 
		var minId = 0;
		var i = 0;

		for (i; i < colArray.length; i++){
			// use the first empty column
			if (colArray[i] < 1 || colArray[i] === undefined) {
				return i;
			}

			// update current lowest number
			if (colArray[i] <= minNum) {
				minNum = colArray[i];
				minId = i;
			}
		}

		return minId;
	}

	// public methods
	return {
		/*
		 * Gets and sorts the projects on the page
		 */
		init: function () {
			var self = this;  // assign reference to current object to "self"
			getProjects('project');
			self.sort();
		},

		/*
		 * Sorts projects on the page, used on document load and window resize
		 */
		sort: function () {
			getWindowInfo();
			positionProjects(projects);
		}
	};
}();