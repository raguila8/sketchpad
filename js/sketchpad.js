$(document).ready(function() {
  main();
});

function main() {
	// Initial size of grid.
	var n = 16;
	sketchpad.setSpectrum();
	sketchpad.setContainerSize();
	sketchpad.grid(n);
	sketchpad.helpDialog();
	sketchpad.resize();
	sketchpad.sketch();
	sketchpad.drawingToggle();
	sketchpad.resetTiles();
	sketchpad.downloadSketch();
	sketchpad.erase();
}

var sketchpad = {


	// This is the color that a square will take when mouse hovers over it and
	// the drawing property is set to true. The initial color is black.
	squareColor: "black",
	drawing: false,
	
	// Configures the color picker by setting initial color to black and
	// arranging to change the sketch color when user chooses a color from
	// the color picker. Also changes the color of the sketch container to
	// the color chosen.
	setSpectrum: function() {
		var self = this;
		$("#colors").spectrum({
			color: "#000",
			change: function(color) {
				self.squareColor = color.toHexString();
				$('#container').css("border", "2px solid " + self.squareColor);
			},
			replacerClassName: 'awesome'
		});
	},

	// Sets the size of the sketch to either the window's width or height
	// depending on their sizes. The size is determined by the smaller of the
	// two. It is also responsive to window resizing. 

	setContainerSize: function() {
		$container = $("#container");
		$nav = $('nav');
		navHeight = $nav.height();
		// Need to account for the height of the navbar
		if (($(window).height() - navHeight) >= $(window).width()) {
			$container.css({'width': 'calc(100vw - 5px)'});	
			$container.height($container.width());
		} else {
			$container.css({'height': 'calc(100vh - ' + navHeight + 'px - 50px)'});
			$container.width($container.height());
		}

		$(window).on('resize', function() {
			if (($(window).height() - navHeight) >= $(window).width()) {
				$container.css({'width': 'calc(100vw - 5px)'});	
				$container.height($container.width());
			} else {
				$container.css({'height': 'calc(100vh - ' + navHeight + 'px - 50px)'});
				$container.width($container.height());
			}
		});
	},

	// Makes an n by b grid. The square sizes are relative to the sketch
	// container making the squares responsive to container resizing due to
	// window resizing.
	grid: function(num) {
		$container = $("#container");
		var dim = $container.width() / num;
		for (var i = 0; i < num; i++) {
			for (var j = 0; j < num; j++) {
				$square = $("<div class=\"square\"></div>");
				$square.width('calc(100% / ' + num + ')').height('calc(100% / ' + 
											num + ')');
				$square.appendTo("#container");
			}
		}
	},

	// This uses the jQuery UI dialog widget to open a help box in an interactive 
	// way.
	helpDialog: function() {
		$( function() {
			$( "#dialog" ).dialog({
				autoOpen: false,
				show: {
					effect: "blind",
					duration: 1000
				},
				hide: {
					effect: "explode",
					duration: 1000
				}
			});

			$( "#opener" ).on( "click", function() {
				$( "#dialog" ).dialog( "open" );
			});
		} );
	},

	// Changes squareColor to default background color which is lighygray.
	erase: function() {
		var self = this;
		$("#erase").click(function() {
			$("#colors").spectrum("set", "lightgray");
			self.squareColor = "lightgray";
		});
	},

	// Erases everything
	resetTiles: function() {
		$(".clear").click(function() {
			$(".square").css("background-color", "lightgray");
		});
	},

	// Changes color of square to squareColor when mouse hovers over it
	sketch: function() {
		var self = this;
		$("div").on("mouseenter", '.square', function() {
			if (self.drawing) {
				$(this).css('background-color', self.squareColor);
			}
		});
	},

	// Erases everything and makes a new n x n grid
	resize: function() {
		var self = this;
		$(".sizes li").click(function() {
			$(".square").remove();
			var num = parseInt($(this).attr("id"));
			self.grid(num);
		});
	},

	// Changes between a drawing state and a not drawing state when user clicks
	// mouse. The user can find out which state he is in by the color of the
	// bottom border of the navbar; green means drawing, red means not drawing.
	drawingToggle: function() {
		var self = this;
		$(".main").on("click", function() {
			$nav = $('nav');
			self.drawing = !self.drawing;
			if (self.drawing) {
				$nav.css("border-bottom", "1px solid green");
			} else {
				$nav.css("border-bottom", "1px solid red");
			}
		});
	},

	// This is a helper function that arranges to download the sketch by 
	// simulating a download link click.
	downloadURI: function(uri, name) {
		var link = document.createElement("a");
		link.download = name;
		link.href = uri;
		$("body").append(link);
		link.click();
		link.remove();
	},

	// Downloads the sketch. Uses html2canvas to take a screenshot of the sketch.
	// Images is saved in png format with a default name of yourImage.png.
	downloadSketch: function() {
		var self = this;
		$downloadLink = $("#download");
		$downloadLink.on("click", function() {
			$sketch = $("#container");
			html2canvas($sketch, {
				onrendered: function(canvas) {
					var mySketch = canvas.toDataURL("image/png");
					self.downloadURI("data:" + mySketch, "yourImage.png");
				}
			});
		});
	}
};
