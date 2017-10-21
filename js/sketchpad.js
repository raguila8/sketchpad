$(document).ready(function() {
  main();
});

function main() {
	setSpectrum();
	setContainerSize();
  grid();
	helpDialog();
  resize();
  hoverEffect();
	registerClick();
  //changeColor();
	resetTiles();
	downloadSketch();
	erase();
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

function erase() {
	$("#erase").click(function() {
    $("#colors").spectrum("set", "lightgray");
		squareColor = "lightgray";
	});
}

function setContainerSize() {
	$container = $("#container");
	$nav = $('nav');
	navHeight = $nav.height();
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
}

// makes 16 by 16 grid
function grid(num = 16) {
	$container = $("#container");
	var dim = $container.width() / num;
  for (var i = 0; i < num; i++) {
    for (var j = 0; j < num; j++) {
      $square = $("<div class=\"square\"></div>");
			$square.width('calc(100% / ' + num + ')').height('calc(100% / ' + num + ')');
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
	$("body").on("click", function() {
		$nav = $('nav');
		drawing = !drawing;
		if (drawing) {
			$nav.css("border-bottom", "1px solid green");
		} else {
			$nav.css("border-bottom", "1px solid red");
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

function helpDialog() {
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
}
