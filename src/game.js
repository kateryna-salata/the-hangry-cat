class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.endScreen = document.getElementById("game-end");
    this.scoreElement = document.getElementById("score");
    this.livesElement = document.getElementById("lives");
    this.scoreTextElement = document.getElementById("score-text");
    this.livesTextElement = document.getElementById("lives-text");
    this.player = new Player(this.gameScreen, 700, 690, 140, 150, "../img/pipka.webp");
    this.height = 800;
    this.width = 800;
    this.obstacles = [];
    this.foodItems = [];
    this.projectiles = [];
    this.score = 0;
    this.lives = 9;
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = 1000/60;
    this.counter = 0;
  }

  start(){
        // Set the height and width of the game screen
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
    
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "block";
        this.scoreTextElement.style.display = "block";
        this.livesTextElement.style.display = "block";
    
        // Runs the gameLoop on a fequency of 60 times per second. Also stores the ID of the interval.
        this.gameIntervalId = setInterval(() => {
          this.gameLoop()
        }, this.gameLoopFrequency)
  }

  spawnObstacles() {
    // Adjust this number to control how often obstacles appear
    if (this.counter % 200 === 0) {
      const newObstacle = new Obstacle(this.gameScreen);
      this.obstacles.push(newObstacle);
    }
  }

  spawnFood() {
    // Adjust this number to control how often food appear
    if (this.counter % 200 === 0) {
      const newFood = new Food(this.gameScreen);
      this.foodItems.push(newFood);
    }
  }

  gameLoop(){
    this.update();
    this.spawnObstacles();
    this.spawnFood();
    // If "gameIsOver" is set to "true" clear the interval to stop the loop
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId)
    }
    this.counter++;
  }

  update() {
    this.player.move();

    for (let i = 0; i < this.foodItems.length; i++) {
      const foodItem = this.foodItems[i];
      foodItem.move();
  
      if (this.player.didEat(foodItem)) {
        foodItem.element.remove();
        this.foodItems.splice(i, 1);
        this.score+=10;
        i--;
        //update score
        this.scoreElement.textContent = this.score;
      }
    }

    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      if (this.player.didCollide(obstacle)) {
        // Remove the obstacle element from the DOM
        obstacle.element.remove();
        // Remove obstacle object from the array
        this.obstacles.splice(i, 1);
        // Reduce player's lives by 1
        this.lives--;
        // Update the counter variable to account for the removed obstacle
        i--;
        //update lives
        this.livesElement.textContent = this.lives;
      }
    }

    if (this.lives === 0) {
      this.endGame();
    }

  }

  endGame() {
    this.player.element.remove();
    this.obstacles.forEach(obstacle => obstacle.element.remove());

    this.gameIsOver = true;

    // Hide game screen
    this.gameScreen.style.display = "none";
    // Show end game screen
    this.gameEndScreen.style.display = "block";
  }
}