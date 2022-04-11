const playerOne = document.getElementById('player-one');
const playerTwo = document.getElementById('player-two');
const playerPos = [ { x: 0, y: 0 }, { x: 0, y: 0 } ];
const playerActiveMovement = [[], []];
const playerDoms = [playerOne, playerTwo];

const validKey = (event) => ['w', 'a', 's', 'd', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(event.key)

const parseEvent = (event) => ({
  direction: getDirection(event.key),
  player: getPlayer(event.key),
  type: event.type
});

const getDirection = (key) => {
  if (key === 'w' || key === 'ArrowUp') return 'up';
  if (key === 's' || key === 'ArrowDown') return 'down';
  if (key === 'a' || key === 'ArrowLeft') return 'left';
  if (key === 'd' || key === 'ArrowRight') return 'right';
}

const getPlayer = (key) => {
  if (['w', 'a', 's', 'd'].includes(key)) return 0;
  if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(key)) return 1;
}

const keyDowns = rxjs.fromEvent(document, 'keydown');
const keyUps = rxjs.fromEvent(document, 'keyup');
const keys = rxjs.merge(keyDowns, keyUps)
                  .pipe(
                    rxjs.filter(validKey),
                    rxjs.map(parseEvent)
                  )
                 

keys.subscribe((keyEvent) => {
  if (keyEvent.type == 'keydown' && !playerActiveMovement[keyEvent.player].includes(keyEvent.direction)) {
    playerActiveMovement[keyEvent.player].push(keyEvent.direction); 
  } else if (keyEvent.type == 'keyup') {
    _.pull(playerActiveMovement[keyEvent.player], keyEvent.direction);
  }
})

const movePlayer = (id, movs) => {
  if (movs.includes('up') && playerPos[id].y > 0) playerPos[id].y -= 3;
  if (movs.includes('down') && playerPos[id].y < 500 ) playerPos[id].y += 3; 
  if (movs.includes('right') && playerPos[id].x < 630) playerPos[id].x += 3;
  if (movs.includes('left') && playerPos[id].x > 0) playerPos[id].x -= 3;
  playerDoms[id].style.left = playerPos[id].x + 'px';
  playerDoms[id].style.top = playerPos[id].y + 'px';
}

rxjs.interval(40).subscribe(() => {
  movePlayer(0, playerActiveMovement[0]);
  movePlayer(1, playerActiveMovement[1]);
}); 