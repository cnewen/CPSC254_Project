/**
  Team Members: Hunter Blachly, Calvin Nguyen
  CPSC 254 -- Snake Game Project
  Snake Object
*/

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xSpeed = scale * 1;
  this.ySpeed = 0;
  this.total = 0;
  this.body = [];

  // Draws body of snake onto screen and keep track of score
  this.draw = function() {
    var headDirection = 0, tailDirection = 0;

    if (this.ySpeed < 0) headDirection = 0;
    else if (this.ySpeed > 0) headDirection = 1;
    else if (this.xSpeed < 0) headDirection = 2;
    else headDirection = 3;

    if (this.total < 2) tailDirection = headDirection;
    else if (this.body[0].x == this.body[1].x) tailDirection = this.body[0].y > this.body[1].y ? 0 : 1;
    else tailDirection = this.body[0].x > this.body[1].x ? 2 : 3;

    if (this.total == 0) draw_snake(this.x, this.y, this.x, this.y, headDirection, tailDirection, get_color());
    else draw_snake(this.x, this.y, this.body[0].x, this.body[0].y, headDirection, tailDirection, get_color());

    for (let i=0; i<this.body.length; i++) {
      ctx.fillRect(this.body[i].x,
        this.body[i].y, scale, scale);
    }

    score_board(this.total);
  }

  // Updates frame of game
  this.update = function() {
    for (let i=0; i<this.body.length - 1; i++) {
      this.body[i] = this.body[i+1];
    }

    // Body of snake
    this.body[this.total - 1] =
      { x: this.x, y: this.y };

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // Allow snake to travel accross map
    if (this.x > canvas.width) {
      this.x = 0;
    } else if (this.y > canvas.height) {
      this.y = 0;
    } else if (this.x < 0) {
      this.x = canvas.width;
    } else if (this.y < 0) {
      this.y = canvas.height;
    }
  }

  // Change Direction of Snake when WASD key is pressed
  this.changeDirection = function(direction) {
    //console.log(direction);
    switch(direction) {
      case 'W':
        if (this.ySpeed != 0) break;
        this.xSpeed = 0;
        this.ySpeed = -scale;
        break;
      case 'S':
      	if (this.ySpeed != 0) break;
        this.xSpeed = 0;
        this.ySpeed = scale;
        break;
      case 'A':
      	if (this.xSpeed != 0) break;
        this.xSpeed = -scale;
        this.ySpeed = 0;
        break;
      case 'D':
      	if (this.xSpeed != 0) break;
        this.xSpeed = scale;
        this.ySpeed = 0;
        break;
    }
  }

  // Checks if snake has eaten food and generate new one
  this.eat = function(food) {
    if (this.x === food.x &&
      this.y === food.y) {
      this.total++;
      return true;
    }
    return false;
  }

  // Checks if snake has eaten apple and generate new one
  this.eatApple = function(apple) {
    if (this.x === apple.x &&
      this.y === apple.y) {
      if (this.total == 0) lose();
      this.total--;
      return true;
    }
    return false;
  }

  // Checks if Snake has run into its own body
  this.checkCollision = function(enemy) {
    if (this.x === enemy.x && this.y === enemy.y) lose();

    for (var i=0; i<this.body.length; i++) {
      if (this.x === this.body[i].x &&
        this.y === this.body[i].y) {
        lose();
      }
    }

    for (var i=0; i<enemy.body.length; i++) {
      if (this.x === enemy.body[i].x &&
        this.y === enemy.body[i].y) {
        lose();
      }
    }
  }
}
