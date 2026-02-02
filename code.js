document.body.style.margin = "0";
document.body.style.height = "100vh";
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.fontFamily = "Arial";

const game = document.createElement("div");
game.style.width = "900px";
game.style.height = "500px";
game.style.display = "flex";
game.style.position = "relative";
game.style.background = "white";
game.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";

function createPlayer(name) {
  const player = document.createElement("div");
  player.style.flex = "1";
  player.style.padding = "40px";
  player.style.textAlign = "center";
  const title = document.createElement("h2");
  title.innerText = name;
  const score = document.createElement("p");
  score.innerText = "0";
  score.style.fontSize = "60px";
  score.style.color = "#bf2e34";
  const currentBox = document.createElement("div");
  currentBox.style.background = "#bf2e34";
  currentBox.style.color = "white";
  currentBox.style.padding = "15px";
  currentBox.style.width = "120px";
  currentBox.style.margin = "auto";
  const curText = document.createElement("p");
  curText.innerText = "CURRENT";
  const curVal = document.createElement("p");
  curVal.innerText = "0";
  curVal.style.fontSize = "25px";
  currentBox.append(curText, curVal);
  player.append(title, score, currentBox);
  return { player, score, curVal };


}
const p1 = createPlayer("PLAYER 1");
const p2 = createPlayer("PLAYER 2");
p1.player.style.background = "#f7f7f7";
game.appendChild(p1.player);
game.appendChild(p2.player);
const dice = document.createElement("div");
dice.innerText = "🎲";
dice.style.fontSize = "60px";
dice.style.position = "absolute";
dice.style.top = "170px";
dice.style.left = "50%";
dice.style.transform = "translateX(-50%)";
game.appendChild(dice); 

function button(text, top) {
  const btn = document.createElement("button");
  btn.innerText = text;
  btn.style.position = "absolute";
  btn.style.left = "50%";
  btn.style.transform = "translateX(-50%)";
  btn.style.top = top;
  btn.style.padding = "10px 20px";
  btn.style.cursor = "pointer";
  return btn;
}
 
const newGameBtn = button("NEW GAME", "30px");
const rollBtn = button("ROLL DICE", "380px");
const holdBtn = button("HOLD", "430px");

game.append(newGameBtn, rollBtn, holdBtn);
document.body.appendChild(game);

let scores = [0, 0];     
let currents = [0, 0];   
let activePlayer = 0;    
let playing = true;


const players = [p1, p2];
function switchPlayer() {
  currents[activePlayer] = 0;
  players[activePlayer].curVal.innerText = "0";

  activePlayer = activePlayer === 0 ? 1 : 0;

  players[0].player.style.background = activePlayer === 0 ? "#f7f7f7" : "white";
  players[1].player.style.background = activePlayer === 1 ? "#f7f7f7" : "white";
}
const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

rollBtn.addEventListener("click", function () {
  if (!playing) return;

  const diceNum = Math.floor(Math.random() * 6) + 1;

  
  dice.innerText = diceFaces[diceNum - 1];
  dice.style.fontSize = "80px";

  if (diceNum !== 1) {
    currents[activePlayer] += diceNum;
    players[activePlayer].curVal.innerText = currents[activePlayer];
  } else {
    switchPlayer();
  }
});

holdBtn.addEventListener("click", function () {
  if (!playing) return;

  scores[activePlayer] += currents[activePlayer];
  players[activePlayer].score.innerText = scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    playing = false;
    dice.innerText = "🏆";
    alert(`PLAYER ${activePlayer + 1} WINS!`);
  } else {
    switchPlayer();
  }
  
});
newGameBtn.addEventListener("click", function () {
  scores = [0, 0];
  currents = [0, 0];
  activePlayer = 0;
  playing = true;
  p1.score.innerText = "0";
  p2.score.innerText = "0";
  p1.curVal.innerText = "0";
  p2.curVal.innerText = "0";
  dice.innerText = "🎲";
  players[0].player.style.background = "#f7f7f7";
  players[1].player.style.background = "white";
});