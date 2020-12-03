/**
  Team Members: Hunter Blachly, Calvin Nguyen
  CPSC 254 -- Snake Game Project
  Draw and Update Game Frames
*/

const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scale = 20;
const rows = canvas.height / scale;
const cols = canvas.width / scale;
var snake, enemy;
with_enemy = true;

(function setup() {
  snake = new Snake();
  food = new Food();
  apple = new Apple();
  food.pickLocation();
  apple.pickLocation();
  enemy = new Enemy();

  window.setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    food.draw();
    apple.draw();
    snake.update();
    snake.draw();
    if (with_enemy) updateEnemy();

    // generate food at random location
    if (snake.eat(food)) {
      food.pickLocation();
    }

    // generate apple at random location
    if(snake.eatApple(apple)) {
      apple.pickLocation();
    }

    snake.checkCollision(enemy);
  }, 250);
}());


// Enemy Snake setup if setting is selected
function updateEnemy() {
	if (alone()) {
		with_enemy = false;
		delete enemy;
		return;
	}
	enemy.changeDirection(enemy.findApple(food.x, food.y));
    	enemy.update();
    	enemy.draw();
    	enemy.checkCollision(snake);

    	if (enemy.eat(food)) {
      		food.pickLocation();
    	}
   	if(enemy.eatApple(apple)) {
     		apple.pickLocation();
    	}
}

// Listen for Button Pressed WASD
window.addEventListener('keydown', ((evt) => {
  //console.log(evt);
  const direction = evt.code.replace('Key', '');
  snake.changeDirection(direction);
}));
