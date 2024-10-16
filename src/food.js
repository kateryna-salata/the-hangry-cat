class Food {
    constructor(gameScreen) {
      this.gameScreen = gameScreen;
      this.left = Math.floor(Math.random() * 750);
      this.top = 0;
      this.width = 60;
      this.height = 60;
      this.element = document.createElement("img");
  
      this.element.src = `./food-img/${ Math.round(Math.random() * (5-1) +1)}.png`;
      this.element.style.position = "absolute";
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
  
      this.gameScreen.appendChild(this.element);
    }
  
    updatePosition() {
      // Update the food's position based on the properties left and top
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
    }
  
    move() {
      // Move the food down by 0.5px
      this.top += 0.5;
      // Update the food's position on the screen
      this.updatePosition();
    }
  }


  