$(document).ready(function() {
  main();
});

function main() {
  //var color = "black";
  grid();
  resize();
  hoverEffect();
  changeColor();
	resetTiles();
	downloadSketch();
}

var color = "black";

// makes 16 by 16 grid
function grid(num = 16) { 
  var dim = 640 / num;
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
    $(this).css('background-color', color);
  });
}


function resize() {
  $(".sizes li").click(function() {
    $(".square").remove();
    var num = parseInt($(this).attr("id"));
    grid(num);
  });
}

function changeColor() {
  $(".colors li").click(function() {
    color = $(this).attr("id");
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
