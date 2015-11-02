 // Place all the behaviors and hooks related to the matching controller here.
 // All this logic will automatically be available in application.js.

console.log('hello there');

var renderMusicians = function(data) {
	console.log(data);

	// draw orchestra on canvas
	var paper = Raphael('orchestra', 800, 500);

	var c;
	for (i=0; i<5; i++) {
		x = i*50 + 50;
		y=i*50 + 50;

		c = paper.circle(x,y,10).attr({ fill: 'black' });
		c[0].id = 'id-' + i;

		c.mouseover(function() {
			console.log(this.id);
		})
	}
}