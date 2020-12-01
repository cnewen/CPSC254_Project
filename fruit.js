function Food() {
  this.x;
  this.y;

  // Generate random location for food
  this.pickLocation = function() {
    this.x = (Math.floor(Math.random() *
      cols - 1) + 1) * scale;
    this.y = (Math.floor(Math.random() *
      rows - 1) + 1) * scale;
  }

  // Draw RED FOOD onto screen
  this.draw = function() {
    draw_apple(this.x, this.y, "#FF3333", ctx);
  }
}
