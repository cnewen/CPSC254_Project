const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scale = 20;
const rows = canvas.height / scale;
const cols = canvas.width / scale;
var snake;

(function setup() {
  snake = new Snake();
  food = new Food();
  apple = new Apple();
  food.pickLocation();
  apple.pickLocation();

  window.setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    food.draw();
    apple.draw();
    snake.update();
    snake.draw();

    // generate food at random location
    if (snake.eat(food)) {
      food.pickLocation();
    }

    // generate apple at random location
    if(snake.eatApple(apple)) {
      apple.pickLocation();
    }

    snake.checkCollision();
  }, 250);
}());


// Listen for Button Pressed WASD
window.addEventListener('keydown', ((evt) => {
  //console.log(evt);
  const direction = evt.code.replace('Key', '');
  snake.changeDirection(direction);
}));
