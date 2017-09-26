$(document).ready(function() {
  main();
});

function main() {
  //var color = "black";
	//setBorder();
	setSpectrum();
	setContainerHeight();
	//setDrawingLight();
  grid();
	openHelp();
	closeHelp();
  resize();
  hoverEffect();
	registerClick();
  changeColor();
	resetTiles();
	downloadSketch();
	/*$("#colors").spectrum({
    color: "#000",
		change: function(color) {
    	color = color.toHexString(); // #ff0000
		},
		replacerClassName: 'awesome',
		
  });*/
}

var squareColor = "black";
var drawing = false;

function setSpectrum() {
	$("#colors").spectrum({
    color: "#000",
		change: function(color) {
    	squareColor = color.toHexString();
			$('#container').css("border", "2px solid " + squareColor);

		},
		replacerClassName: 'awesome'
  });

}

/*
function setBorder() {
	$border = $("#border");
	viewportWidth = $(window).width();
	viewportHeight = $(window).height();
	$border.height((viewportHeight - $(".container-fluid").height()) / 1.21);
	$border.width(viewportWidth / 2.5);
}
*/
/*
function setDrawingLight() {
	borderHeight = $('#border').height();
	containerHeight = $('#container').height();
	headerHeight = $('#border h3').height();
	bottomBorder = borderHeight - containerHeight - headerHeight;
	$('#drawing').css("bottom", bottomBorder / 2 - 10 + "px");
}
*/


function setContainerHeight() {
	$container = $("#container");
	$container.width(.35 * $(window).width());
	$container.height($container.width());
}

// makes 16 by 16 grid
function grid(num = 16) {
	$container = $("#container");
	var dim = $container.width() / num;
  //var dim = 640 / num;
  for (var i = 0; i < num; i++) {
    for (var j = 0; j < num; j++) {
      $square = $("<div class=\"square\"></div>");
      $square.width(dim).height(dim);
      $square.appendTo("#container");
    }
  }
}

function resetTiles() {
	$(".clear").click(function() {
		$(".square").css("background-color", "lightgray");
	});
}


function hoverEffect() {
  $("div").on("mouseenter", '.square', function() {
		if (drawing) {
    	$(this).css('background-color', squareColor);
		}
  });
}


function resize() {
  $(".sizes li").click(function() {
    $(".square").remove();
    var num = parseInt($(this).attr("id"));
    grid(num);
  });
}
/*
function changeColor() {
  $("#colors").click(function() {
    color = $(this).attr("id");
		color = $('#colors').spectrum("get").toHexString();
		console.log($("#colors").spectrum("get").toHexString());
		$('#container').css("border", "3px solid " + color);
  });
}
*/
function changeColor() {
	$("#colors").on("move", function() {
		console.log("here");
	});
}

function downloadURI(uri, name) {
	var link = document.createElement("a");
	link.download = name;
	link.href = uri;
	$("body").append(link);
	link.click();
	link.remove();
}

function downloadSketch() {
	console.log("1");
	$downloadLink = $("#download");
	$downloadLink.on("click", function() {
		console.log("2");
		$sketch = $("#container");
		html2canvas($sketch, {
			onrendered: function(canvas) {
				var mySketch = canvas.toDataURL("image/png");
				downloadURI("data:" + mySketch, "youImage.png");
			}
		});
	});
}

function registerClick() {
	$("#container").on("click", function() {
		$drawing = $('#drawing');
		drawing = !drawing;
		if (drawing) {
			$drawing.css('background-color', 'green');
		} else {
			$drawing.css('background-color', 'red');
		}
	});
}

function openHelp() {
	$('.help-handle').click(function() {
		$help = $('.help');
		$help.width("250px");
		$('.main').css("margin-left", "250px");
		$('body').css("background-color", "rgba(0,0,0,0.4)");
	});
}

function closeHelp() {
	$(".closebtn").on("click", function() {
		$(".help").width("0");
  	$('.main').css("margin-left", "0");
  	$('body').css("backgroundColor", "#474e5d");
	});
}
