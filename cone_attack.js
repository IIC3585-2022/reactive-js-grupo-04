let icecreamBalls = [];
const cones = [0, 1, 2, 3, 4, 5, 6, 7];
const coneOptions = ['icecream_01', 'icecream_02', 'icecream_03'];
let count = 0;

const checkHorCollision = (ballStyle, playerPos) => {
  const leftBall = parseInt(ballStyle.left.replace("px", ""));
  return leftBall < playerPos.x + 65 && playerPos.x < leftBall + 60
    ? true
    : false;
};

const checkVertCollision = (ballStyle, playerPos) => {
  const bottom = parseInt(ballStyle.bottom.replace("px", ""));
  return bottom < playerPos.bot + 80 && playerPos.bot < bottom + 80
    ? true
    : false;
};

const createScoop = rxjs.timer(0, 600).subscribe(() => {
  const element = document.createElement('div');
  var cone = cones[Math.floor(Math.random() * cones.length)];
  element.id = 'icecream_' + count;
  element.className =
    coneOptions[Math.floor(Math.random() * coneOptions.length)];
  const left = 8 + cone * 86;
  element.style.left = left + 'px';
  element.style.bottom = '70px';
  document.getElementById('map').append(element);
  icecreamBalls.push(element.id);
  count += 1;
});

const moveScoops = rxjs.timer(100, 100).subscribe(() => {
  icecreamBalls.forEach((id) => {
    const elem = document.getElementById(id);
    let y_pos = elem.style.bottom.replace('px', '');
    y_pos = parseInt(y_pos);
    y_pos += 10;
    elem.style.bottom = y_pos + 'px';
  });
});

const deleteScoops = rxjs.timer(0, 100).subscribe((done) => {
  icecreamBalls.forEach((id) => {
    const elem = document.getElementById(id);
    let y_pos = elem.style.bottom.replace('px', '');
    y_pos = parseInt(y_pos);
    if (y_pos > 700) {
      icecreamBalls = icecreamBalls.filter((e) => e !== id);
      document.getElementById('map').removeChild(elem);
      addScore(10);
    }
  });
});

const finishGame = () => {
  createScoop.unsubscribe()
  moveScoops.unsubscribe()
  deleteScoops.unsubscribe()
  document.getElementsByClassName("game-end-msg")[0].style.display = "flex";
}

const checkColisions = rxjs.timer(0, 100).subscribe(() => {
  const players = playerPos.map(player => ({...player, bot: 700 - 80 - player.y }))
  const ballsCollissioned = icecreamBalls.some((ballId) => {
    const ballStyle = document.getElementById(ballId).style;
    const playerOneCollision =
      checkHorCollision(ballStyle, players[0]) &&
      checkVertCollision(ballStyle, players[0]);
    const playerTwoCollision =
      checkHorCollision(ballStyle, players[1]) &&
      checkVertCollision(ballStyle, players[1]);

    return playerOneCollision || playerTwoCollision;
  });
  if(ballsCollissioned) {
    checkColisions.unsubscribe()
    finishGame()
  }
});
