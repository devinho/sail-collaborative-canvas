$(function() {

  // DRAWING CODE

  //Set up some globals
  var pixSize = 8, lastPoint = null, currentColor = "000", mouseDown = 0;

  //Create a reference to the pixel data for our drawing.
  var pixelDataRef = new Firebase("https://cssail-224f6.firebaseio.com/drawing");

  // Set up our canvas
  var myCanvas = document.getElementById("drawing-canvas");
  var myContext = myCanvas.getContext ? myCanvas.getContext("2d") : null;
  if (myContext == null) {
    alert("You must use a browser that supports HTML5 Canvas to run this demo.");
    return;
  }

  // Part 1 /////////////////////////////////////////////////////////////////////////

  // Setup each color palette & add it to the screen

  // var colors = ["fff","000","f00","0f0","00f","88f","f8d","f88","f05","f80","0f8","cf0","08f","408","ff8","8ff"];

    /* TODO
      We need to write a for loop that creates a new html tag and add that to our webpage's
      palette chooser
    */


  //   item.click((function () {
  //     var col = colors[c];
  //     return function () {
  //       currentColor = col;
  //     };
  //   })());

  // Part 1 END ////////////////////////////////////////////////////////////////////////

  // Part 2 /////////////////////////////////////////////////////////////////////////
  /* TODO
    We keep track of when the mouse is being clicked with a variable called "mouseDown". To update
    this variable, we need to fill in these functions that tell us when your mouse is being clicked and
    when it isn't
  */
  myCanvas.onmousedown = function () {

  };
  myCanvas.onmouseout = myCanvas.onmouseup = function () {

    lastPoint = null; // ignore this line!
  };

  // Part 2 END ////////////////////////////////////////////////////////////////////////

  //Draw a line from the mouse's last position to its current position
  var drawLineOnMouseMove = function(e) {
    if (!mouseDown) return;

    // Bresenham's line algorithm. We use this to ensure smooth lines are drawn
    var offset = $("canvas").offset();
    var x1 = Math.floor((e.pageX - offset.left) / pixSize - 1),
      y1 = Math.floor((e.pageY - offset.top) / pixSize - 1);
    var x0 = (lastPoint == null) ? x1 : lastPoint[0];
    var y0 = (lastPoint == null) ? y1 : lastPoint[1];
    var dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
    var sx = (x0 < x1) ? 1 : -1, sy = (y0 < y1) ? 1 : -1, err = dx - dy;
    while (true) {
      //write the pixel into Firebase, or if we are drawing white, remove the pixel
      pixelDataRef.child(x0 + ":" + y0).set(currentColor === "fff" ? null : currentColor);

      if (x0 == x1 && y0 == y1) break;
      var e2 = 2 * err;
      if (e2 > -dy) {
        err = err - dy;
        x0 = x0 + sx;
      }
      if (e2 < dx) {
        err = err + dx;
        y0 = y0 + sy;
      }
    }
    lastPoint = [x1, y1];
  }


  // Part 3 ////////////////////////////////////////////////////////////////////////

  $(myCanvas).mousemove(drawLineOnMouseMove);
  $(myCanvas).mousedown(drawLineOnMouseMove);

  var drawPixel = function(snapshot) {
    var coords = snapshot.key().split(":");
    myContext.fillStyle = "#" + snapshot.val();
    // todo

  }
  var clearPixel = function(snapshot) {
    var coords = snapshot.key().split(":");
    // todo

  }

  // Part 3 END ////////////////////////////////////////////////////////////////////////

  // Get a reference to the root of the chat data.
  var messagesRef = new Firebase("https://cssail-224f6.firebaseio.com/chat");

  // Part 4 ////////////////////////////////////////////////////////////////////////
  function submitChat() {
    // todo
  }

  $("#message-input").keypress(function (e) {
    // todo
  });

  $("#button-input").on("click", function(e) {
    // todo
  });

  // Part 4 END ////////////////////////////////////////////////////////////////////////

  // Add a callback that is triggered for each chat message.
  messagesRef.limitToLast(10).on("child_added", function (snapshot) {
    var message = snapshot.val();
    $("<div/>").text(message.text).prepend($("<em/>")
      .text(message.name + ": ")).appendTo($("#messages-div"));
    $("#messages-div")[0].scrollTop = $("#messages-div")[0].scrollHeight;
  });

});