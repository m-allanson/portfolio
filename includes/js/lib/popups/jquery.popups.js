jQuery.popups = function() {

	// all links that have a rel attribute starting with external
	$('a[rel^=external]').click(function(){
		window.open($(this).attr('href'));
		return false;
	});

	// all links that have a rel attribute starting with popup
	$('a[rel^=popup]').click(function(){
		var defaultWidth = "300";
		var defaultHeight = "600";

		// we  only want the first rel value, split into an array on |
		var dimensions = this.rel.split(" ");  
		dimensions = dimensions[0].split("|");

		// do we need to open popup to particular dimensions?
		var popupWidth = (dimensions[1]) ? dimensions[1] : defaultWidth;
		var popupHeight = (dimensions[2]) ? dimensions[2] : defaultHeight;

		window.open($(this).attr('href'), 'popup', 'width='+popupWidth+',height='+popupHeight+',scrollbars=yes');
		return false;
	});
};