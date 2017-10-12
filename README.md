# Project Title

A browser implementation of a sketchpad using javascript. Basic dynamic and interactive website with grid of squares where users can "sketch" by hovering their cursor over the squares. Clicking on the various options allow the user to change the grid size of the drawing area. The user is able to change the grid size, change the sketch color, erase, and download the sketch as an image upon completion. User toggles between two modes, sketching and not sketching. By default the user is not sketching. To change mode, user must click anywhere in document. The bottom border color of the navigation bar describes which mode the user is in: green is sketching, red is not sketching.

Buttons:

* Clear: Resets all the squares in grid to their default color.
* Resize: Choose from a selection of sizes to resize grid. This will also clear the grid.
* Download: Downloads the sketch as a png file.
* Erase: Changes to the default background color (lightgray).
* Help: Opens a help box.
* Spectrum Color Picker: Choose any color. The default color is black.

![Sketchpad](/images/sketchpad-ex1.png)

[View Project](http://www.rodrigojaguilar.com/sketchpad/index.html)

## Built With

* [jQuery](https://jquery.com/) - Javascript library
* [Bootstrap](http://getbootstrap.com/docs/3.3/) - Used for a responsive navigation bar
* [Spectrum](https://bgrins.github.io/spectrum/) - jQuery plugin used for colorpicker
* [html2canvas](https://html2canvas.hertzen.com/) - Used to download sketch as a png file

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* This project was created as part of The Odin Project curriculum.

