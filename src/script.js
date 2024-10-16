window.onload = function () {
  const startButton = document.querySelector('#start-button');
  const restartButton = document.querySelector('#restart-button');

  const moveStartButton = () => { 
    let x = Math.random() * (window.innerWidth - startButton.offsetWidth); 
    let y = Math.random() * (window.innerHeight - startButton.offsetHeight);
  
    startButton.style.left = `${x}px`; 
    startButton.style.top = `${y}px`; 
  }

  // startButton.addEventListener('mouseenter', moveStartButton); 
  startButton.addEventListener("click", function () {
    startGame();
  });

  function startGame() {
    console.log("start game");
    game = new Game();
    game.start();
  }

   // Function that handles keydown event
   function handleKeydown(event) {
    const key = event.key;
    const possibleKeystrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];

    // Check if the pressed key is in the possibleKeystrokes array
    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();

      const playerSpeed = 3;
      game.player.directionX = 0;
      game.player.directionY = 0;
      // Update player's directionXbased on the key pressed
      switch (key) {
        case "ArrowLeft":
          game.player.directionX = -playerSpeed ;
          break;
        case "ArrowUp":
          game.player.directionY = -playerSpeed ;
          break;
        case "ArrowRight":
          game.player.directionX = playerSpeed ;
          break;
        case "ArrowDown":
          game.player.directionY = playerSpeed ;
          break;
      }
    }
  }

  // Add the handleKeydown function as an event listener for the keydown event
  window.addEventListener("keydown", handleKeydown);
}