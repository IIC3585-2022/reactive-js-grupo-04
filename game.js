const scoreSubject = new rxjs.BehaviorSubject(0);

const addScore = (plusScore) => {
  newScore = scoreSubject.getValue() + plusScore;
  scoreSubject.next(newScore);
}

scoreSubject.subscribe((score) => {
  document.getElementById("score").textContent = score;
})