function Apple() {
  this.x;
  this.y;

  // Generate random location for food
  this.pickLocation = function() {
    this.x = (Math.floor(Math.random() *
      cols - 1) + 1) * scale;
    this.y = (Math.floor(Math.random() *
      rows - 1) + 1) * scale;
  }

  // Draw YELLOW APPLE onto screen
  this.draw = function() {
    ctx.fillStyle = "#FFFF33";
    ctx.fillRect(this.x, this.y, scale, scale)
  }
}
