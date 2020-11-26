function Snake() {
  this.x = 0;
  this.y = 0;
  this.xSpeed = scale * 1;
  this.ySpeed = 0;
  this.total = 0;
  this.body = [];

  this.draw = function() {
    ctx.fillStyle = "#FFFFFF";
    for (let i=0; i<this.body.length; i++) {
      ctx.fillRect(this.body[i].x,
        this.body[i].y, scale, scale);
    }

    ctx.fillRect(this.x, this.y, scale, scale);
  }

  this.update = function() {
    for (let i=0; i<this.body.length - 1; i++) {
      this.body[i] = this.body[i+1];
    }

    this.body[this.total - 1] =
      { x: this.x, y: this.y };

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x > canvas.width) {
      this.x = 0;
    }

    if (this.y > canvas.height) {
      this.y = 0;
    }

    if (this.x < 0) {
      this.x = canvas.width;
    }

    if (this.y < 0) {
      this.y = canvas.height;
    }
  }


  this.changeDirection = function(direction) {
    //console.log(direction);
    switch(direction) {
      case 'W':
        this.xSpeed = 0;
        this.ySpeed = -scale;
        break;
      case 'S':
        this.xSpeed = 0;
        this.ySpeed = scale;
        break;
      case 'A':
        this.xSpeed = -scale;
        this.ySpeed = 0;
        break;
      case 'D':
        this.xSpeed = scale;
        this.ySpeed = 0;
        break;
    }
  }

  this.eat = function(food) {
    if (this.x === food.x &&
      this.y === food.y) {
      this.total++;
      return true;
    }
    return false;
  }

  this.eatApple = function(apple) {
    if (this.x === apple.x &&
      this.y === apple.y) {
      this.total--;
      return true;
    }
    return false;
  }

  this.checkCollision = function() {
    for (var i=0; i<this.body.length; i++) {
      if (this.x === this.body[i].x &&
        this.y === this.body[i].y) {
        this.total = 0;
        this.body = [];
      }
    }
  }
}
