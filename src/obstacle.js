class Obstacle {
    constructor(gameScreen) {
      this.gameScreen = gameScreen;
      this.left = Math.floor(Math.random() * 750);
      this.top = -50;
      this.width = 70;
      this.height = 70;
      this.element = document.createElement("img");
  
      this.element.src = `./obstacle-img/${Math.round(Math.random() * (5 - 1) + 1)}.png`;
      this.element.style.position = "absolute";
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
  
      this.gameScreen.appendChild(this.element);
    }
  
    updatePosition() {
      // Update the obstacle's position based on the properties left and top
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
    }
  
    move() {
      // Move the obstacle down by 1px
      this.top += 1;
      // Update the obstacle's position on the screen
      this.updatePosition();
    }
  }