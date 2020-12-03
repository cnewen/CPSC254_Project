function Enemy() {
  this.x = (Math.floor(Math.random() *
      cols - 1) + 1) * scale;
  this.y = (Math.floor(Math.random() *
    rows - 1) + 1) * scale;
  this.xSpeed = scale * 1;
  this.ySpeed = 0;
  this.total = 0;
  this.body = [];

  this.draw = function() {
    var headDirection = 0, tailDirection = 0;
    
    if (this.ySpeed < 0) headDirection = 0;
    else if (this.ySpeed > 0) headDirection = 1;
    else if (this.xSpeed < 0) headDirection = 2;
    else headDirection = 3;
    
    if (this.total < 2) tailDirection = headDirection;
    else if (this.body[0].x == this.body[1].x) tailDirection = this.body[0].y > this.body[1].y ? 0 : 1;
    else tailDirection = this.body[0].x > this.body[1].x ? 2 : 3;
    
    if (this.total == 0) draw_snake(this.x, this.y, this.x, this.y, headDirection, tailDirection, 'red');
    else draw_snake(this.x, this.y, this.body[0].x, this.body[0].y, headDirection, tailDirection, 'red');
    
    for (let i=0; i<this.body.length; i++) {
      ctx.fillRect(this.body[i].x,
        this.body[i].y, scale, scale);
    }
  }

  this.update = function() {
    for (let i=0; i<this.body.length - 1; i++) {
      this.body[i] = this.body[i+1];
    }

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
      if (this.total == 0) return true;
      this.total--;
      return true;
    }
    return false;
  }

  // Checks if Snake has run into its own body
  this.checkCollision = function(player) {
    for (var i=0; i<this.body.length; i++) {
      if (this.x === this.body[i].x &&
        this.y === this.body[i].y) {
        this.x = -20;
        this.y = -20;
        with_enemy = false;
      }
    }
    
    for (var i=0; i<player.body.length; i++) {
      if (this.x === player.body[i].x &&
        this.y === player.body[i].y) {
        this.x = -20;
        this.y = -20;
        with_enemy = false;
      }
    }
  }
  //Checks location vs apple and returns WASD
  this.findApple = function(appleX, appleY) {
  	if (appleY < this.y) return (this.ySpeed > 0 ? (apple.X > this.x ? 'D' : 'A') : 'W');
  	if (appleX < this.x) return (this.xSpeed > 0 ? 'S' : 'A');
  	if (appleX > this.x) return (this.xSpeed < 0 ? 'S' : 'D');
  	if (appleY > this.y) return (this.ySpeed < 0 ? 'A' : 'S');
  }
}
