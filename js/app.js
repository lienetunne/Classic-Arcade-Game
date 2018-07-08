'use strict';
// pause the game
var gamePause = true;
var count = count;
const removeCol = document.querySelector('.col');
var progressWidth = document.querySelector('.progress-bar');
// if button - Start the game is clicked, game starts
document.querySelector('#startTheGame').addEventListener('click',function(){
  removeCol.parentNode.removeChild(removeCol);
  var addProgressBar = document.querySelector('.col-12').classList.remove('fade');
  gamePause = false;
  createEnemies();
  count =0;
});
// Enemies our player must avoid
class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed  = speed;
    this.sprite = 'images/enemy-bug.png';
  }
  update(dt){
    this.x = this.x + this.speed*dt;
    if (this.x >= 500) {
      this.x = -200;
      this.speed = Math.floor(Math.random() * (400 - 100 + 1)) + 100;;
    }
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y){
          player.x = 200;
          player.y = 400;
        }
  }
  // Draw the enemy on the screen, required method for game
  render(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
  }
  update(dt){
    // player reaching water
    if (this.y < 10){
// count moves, if move is one, add 25% to progress bar and so on till 100%
      count = count+ 1;
      if (count === 1){
        this.y = 400;
        this.x = 200;
        progressWidth.classList.remove('width0');
        progressWidth.classList.add('width25');
      }
      if (count === 2){
        this.y = 400;
        this.x = 200;
        progressWidth.classList.remove('width25');
        progressWidth.classList.add('width50');
      }
      if (count === 3){
        this.y = 400;
        this.x = 200;
        progressWidth.classList.remove('width50');
        progressWidth.classList.add('width75');
      }
// if moves is 4 game is won
      if (count === 4){
        progressWidth.classList.remove('width75');
        progressWidth.classList.add('width100');
        gameWon();
      }
    }
// checkin so player doesnt move outside the canvas
 if (this.x <= 0){
      this.x = 0;
    }
    if (this.x >= 400){
      this.x = 400;
    }
    if (this.y >= 400){
      this.y = 400;
    }
  }
  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(dt){
// add players key moves
      switch (dt) {
        case "up":
          this.y -= this.speed + 33;
          break;
        case "down":
          this.y += this.speed + 33;
          break;
        case "left":
          this.x -= this.speed + 50;
          break;
        case "right":
          this.x += this.speed + 50;
          break;
  }
  }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var createEnemies = function(){
var enemyOne = new Enemy(-200,60,50 + Math.floor(Math.random() * 200));
allEnemies.push(enemyOne);
var enemyTwo = new Enemy(-400,140,50 + Math.floor(Math.random() * 200));
allEnemies.push(enemyTwo);
var enemyThree = new Enemy(-300,230,50 + Math.floor(Math.random() * 200));
allEnemies.push(enemyThree);
var enemyFour = new Enemy(-200,140,50 + Math.floor(Math.random() * 200));
allEnemies.push(enemyFour);
}
// Place the player object in a variable called player
var player = new Player(200,400,50);
// Game is won, pause the game, show congratulations text and new game button.
function gameWon(){
  gamePause = true;
  console.log('game won!');
  $('#gameWon').modal('show');
  document.getElementById('newGame').addEventListener('click',newGame);
}
// new game, reset everything.
function newGame(){
  count = 0;
  allEnemies=[];
  createEnemies();
  gamePause = false;
  player.y = 410;
  player.x = 200;
  progressWidth.classList.remove('width100');
  progressWidth.classList.add('width0');
};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
