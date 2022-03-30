function rectangularCollision({ rect1, rect2 }) {
    return (
      rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
      rect1.attackBox.position.x <= rect2.position.x + rect2.width &&
      rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
      rect1.attackBox.position.y <= rect2.position.y + rect2.height 
    );
  }
  //Show game based on health after timer ends
  function determineWinner({ player, enemy, timerId }) {
    clearTimeout(timerId);
    document.querySelector("#displayResult").style.display = "flex";
    if (player.health === enemy.health) {
      document.querySelector("#displayResult").innerHTML = "Tie";
    } else if (player.health > enemy.health) {
      document.querySelector("#displayResult").innerHTML = "Player 1 Won";
    } else if (enemy.health > player.health) {
      document.querySelector("#displayResult").innerHTML = "Player 2 Won";
    }
  }
  //timer
  let timer = 5;
  let timerId;
  function decreaseTimer() {
    if (timer > 0) {
      timerId = setTimeout(decreaseTimer, 1000);
      timer--;
      document.querySelector("#timer").innerHTML = timer;
    }
    //Determine winner
    if (timer === 0) {
      determineWinner({ player, enemy });
    }
  }