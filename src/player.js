class Player {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("img");

    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    // Set up the default element's property values
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left - 44}px`;
    this.element.style.top = `${top - 5}px`;

    this.gameScreen.appendChild(this.element);
  }

  move() {
    // Update player position based on directionX and directionY
    this.left += this.directionX;
    this.top += this.directionY;

    // Ensure the player stays within the game screen
    // handles left hand side
    if (this.left < 5) {
      this.left = 5;
    }

    // handles top side
    if (this.top < 5) {
      this.top = 5;
    }

    // handles right hand side
    if (this.left > this.gameScreen.offsetWidth - this.width - 5) {
      this.left = this.gameScreen.offsetWidth - this.width - 5;
    }

    // handles bottom side
    if (this.top > this.gameScreen.offsetHeight - this.height - 5) {
      this.top = this.gameScreen.offsetHeight - this.height - 5;
    }

    // Update the playerposition on the screen
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }

  didEat(food) {
    const playerRect = this.element.getBoundingClientRect();
    const foodRect = food.element.getBoundingClientRect();

    if (
      playerRect.left < foodRect.right &&
      playerRect.right > foodRect.left &&
      playerRect.top < foodRect.bottom &&
      playerRect.bottom > foodRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}