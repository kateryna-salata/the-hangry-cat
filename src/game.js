class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.endScreen = document.getElementById("game-end");
    this.scoreElement = document.getElementById("score");
    this.livesElement = document.getElementById("lives");
    this.scoreTextElement = document.getElementById("score-text");
    this.livesTextElement = document.getElementById("lives-text");
    this.timerElement = document.getElementById("timeRemaining");
    this.endTextElement = document.getElementById("end-text");
    this.endImgElement = document.getElementById("end-img");
    this.player = new Player(this.gameScreen, 700, 690, 140, 150, "img/pipka.png");
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
    this.gameDuration = 120; // Timer duration in seconds
    this.timeRemaining = this.gameDuration;
    this.timer = null;
    this.meow = new Audio('sounds/angry.m4a');
    this.meow.volume = 0.1;
    this.purr = new Audio('sounds/purr.wav');
    this.purr.volume = 0.2; 
    this.song = new Audio('sounds/game.wav');
    this.song.volume = 0.005; 
  }

  start(){
    // Set the height and width of the game screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.scoreTextElement.style.display = "block";
    this.livesTextElement.style.display = "block";
    this.timerElement.style.display = "block";

    // Runs the gameLoop on a fequency of 60 times per second. Also stores the ID of the interval.
    this.gameIntervalId = setInterval(() => {
      this.gameLoop()
    }, this.gameLoopFrequency)

    // start timer
    this.startTimer();
  }

  startTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.timeRemaining--;
      
      // Format the time as MM:SS
      const minutes = Math.floor(this.timeRemaining / 60).toString().padStart(2, '0');
      const seconds = (this.timeRemaining % 60).toString().padStart(2, '0');
      this.timerElement.innerText = `${minutes}:${seconds}`;
      
      if (this.timeRemaining <= 0) {
        clearInterval(this.timer);
        this.endGame();
      }
    }, 1000);
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
    this.song.play();
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
        //sound
        this.purr.play();
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

        //sound
        this.meow.play();
      }
    }

    if (this.lives === 0) {
      this.endGame();
    }
  }

  endGame() {
    this.song.pause();      // This pauses the audio
    this.song.currentTime = 0;
    //lose/win situation
    if (this.lives === 0) {
      this.endTextElement.innerText = `Your score is ${this.score}. Do a better job, I have just 9 lives`;
      this.endImgElement.src = "img/lose.png";
      
    } else {
      this.endTextElement.innerText = `Your score is ${this.score}. Good job!`;
      this.endImgElement.src = "img/win.png";
      this.endImgElement.style.animation = `spin 5s linear infinite`;
    }

    this.gameIsOver = true;

    // Show end game screen
    this.endScreen.style.display = "flex";
    //Hides 
    this.gameScreen.style.display = "none";
    this.timerElement.style.display = "none";
    this.livesTextElement.style.display = "none";
    this.scoreTextElement.style.display = "none";

    this.player.element.remove();
    this.obstacles.forEach(obstacle => obstacle.element.remove());
  }
}