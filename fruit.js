/**
  Team Members: Hunter Blachly, Calvin Nguyen
  CPSC 254 -- Snake Game Project
  Food Object
*/

function Food() {
  this.x;
  this.y;

  // Generate random location for food
  // Using random() to generate random (float) number between 0-1
  // Using floor() to round down for integer
  this.pickLocation = function() {
    this.x = (Math.floor(Math.random() * cols - 1) + 1) * scale;
    this.y = (Math.floor(Math.random() * rows - 1) + 1) * scale;
  }

  // Draw RED FOOD onto screen
  this.draw = function() {
    draw_apple(this.x, this.y, "#FF3333", ctx);
  }
}
