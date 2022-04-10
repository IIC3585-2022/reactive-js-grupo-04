const playerOne = document.getElementById('player-one');
const playerOnePos = { x: 0, y: 0 };
const playerTwo = document.getElementById('player-two');
const playerTwoPos = { x: 0, y: 0 };

const keys = rxjs.fromEvent(window, 'keydown');
keys.subscribe((keyEvent) => {
  if (keyEvent.keyCode === 39) {
    playerOnePos.x += 5;
    playerOne.style.left = playerOnePos.x + 'px';
  }
  if (keyEvent.keyCode === 37) {
    playerOnePos.x -= 5;
    playerOne.style.left = playerOnePos.x + 'px';
  }
  if (keyEvent.keyCode === 38) {
    playerOnePos.y -= 5;
    playerOne.style.top = playerOnePos.y + 'px';
  }
  if (keyEvent.keyCode === 40) {
    playerOnePos.y += 5;
    playerOne.style.top = playerOnePos.y + 'px';
  }
  if (keyEvent.key === 'd') {
    playerTwoPos.x += 5;
    playerTwo.style.left = playerTwoPos.x + 'px';
  }
  if (keyEvent.key === 'a') {
    playerTwoPos.x -= 5;
    playerTwo.style.left = playerTwoPos.x + 'px';
  }
  if (keyEvent.key === 'w') {
    playerTwoPos.y -= 5;
    playerTwo.style.top = playerTwoPos.y + 'px';
  }
  if (keyEvent.key === 's') {
    playerTwoPos.y += 5;
    playerTwo.style.top = playerTwoPos.y + 'px';
  }
});
