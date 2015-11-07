 // Place all the behaviors and hooks related to the matching controller here.
 // All this logic will automatically be available in application.js.

var launchPayments = function(data, id) {
	var index = parseInt( id.replace('seat-','') );

	if (data[index].status == false) {
	    $('#checkout').show();

	    // block interaction on the rest of the screen
	    $('#lightbox').show();
	    $('html, body').css('overflow', 'hidden');

	    // add id to form so that we can update the correct musician in the database 
	    $('#id-field').val(index);
	}

}

var renderMusicians = function(data) {
	// draw orchestra on canvas
	var paper = Raphael('orchestra', 800, 500);

	// initialize basic variables
	// c, x, y are for SVG elements
	var c, x, y;
	for (i=0; i < seatingchart.length; i++) {

		x = seatingchart[i][0];
		y= seatingchart[i][1];

		// create new SVG element (circle) for each seat in the orchestra
		if (data[i]) {
			// if the seat is not sponsored, highlight it so that it can be sponsored
			if (data[i].status == false) {
				c = paper.circle(x,y,10).attr({ fill: 'green', stroke: 'none' });

				// bind a unique identifier to each SVG element
				// this avoids issues with closures
				c[0].id = 'seat-' + (i+1);

				// if a student can be sponsored, launch payments modal when element is clicked
				c.onClick(function() {
					console.log('clicked');
					launchPayments(data, this[0].id);
				});
			} else {
				c = paper.circle(x,y,10).attr({ fill: 'black', stroke: 'none' });
				c[0].id = 'seat-' + (i+1);
			}

			// bind hover functionality to each SVG element
			// on hover, enlarge the SVG element and display a popup
			c.hover(function() {
				this.attr({ r: 20 });
				showMusiciansPopup(data, this[0].id);
			});

			// when hover ends, restore the original size and hide the popup
			c.mouseout(function() {
				this.attr({ r: 10 });
				hideMusiciansPopup();
			});
		} else {
			c = paper.circle(x,y,10).attr({ fill: 'black', stroke: 'none' });
		}
		

	}
}

var showMusiciansPopup = function(data, id) {
	var svg = $('svg');
	var popup = $('#orchestra .popup');

	// look up index based on element id
	// rails indexes at 1, so we have to offset by 1
	var index = parseInt( id.replace('seat-','') ) - 1;

	var instrument = data[index].instrument;
	var status = data[index].status;
	var sponsor = data[index].sponsor;

	var string = '<h3>' + instrument + '</h3>';

	// generate text explaining the sponsorship status of the musician
	if (status == true) {
		if (sponsor) {
			string += ('sponsored by ' + sponsor);
		} else {
			string += 'sponsored by an anonymous donor';
		}
	} else {
		string += 'click to sponsor';
	}

	popup.append(string);

	var element = document.getElementById(id);
	var height = popup.height();

	// find the absolute coordinates of the hovered element
	// then offset by half the width to center horizontally
	// and the entire height to display above the hovered element
	// then shift by the height of the element plus a little padding
	var x = svg.offset().left + element.cx.animVal.value - 50;
	var y = svg.offset().top + element.cy.animVal.value - height - 45;

	// move the popup into view
	popup.css({'left': x, 'top': y});
}

var hideMusiciansPopup = function(id) {
	$('#orchestra .popup').empty();
	$('#orchestra .popup').css({ top: '0px', left: '-200px' });
}