/**
  Team Members: Hunter Blachly, Calvin Nguyen
  CPSC 254 -- Snake Game Project
  Apple Object
*/

function Apple() {
  this.x;
  this.y;

  // Generate random location for food
  // Using random() to generate random (float) number between 0-1
  // Using floor() to round down for integer
  this.pickLocation = function() {
    this.x = (Math.floor(Math.random() *
      cols - 1) + 1) * scale;
    this.y = (Math.floor(Math.random() *
      rows - 1) + 1) * scale;
  }

  // Draw YELLOW APPLE onto screen
  this.draw = function() {
    draw_apple(this.x, this.y, "#FFFF33", ctx);
  }
}
