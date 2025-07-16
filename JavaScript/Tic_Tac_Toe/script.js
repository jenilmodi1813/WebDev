let boxs = document.querySelectorAll('.box');
let reset = document.querySelector('#reset-btn');
let newButton = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let turn0 = true;

const winPatterns = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,5],
  [3,4,5],
  [6,7,8],
];

boxs.forEach((e)=>{
  e.addEventListener('click',() => {
    // console.log("box clicked");
    
    if(turn0){
      e.innerText = 'O';
      turn0 = false;
    }
    else{
      e.innerText = 'X';
      turn0 = true;
    }
    e.disabled = true;
    checkWinner();
  })
});

const showWinner = (pos1Val) =>{
  msg.innerText = `Winner is ${pos1Val}`;
  msgContainer.classList.remove("hide");
  disabledBox();
}

const disabledBox = ()=>{
  for (let box of boxs) {
    box.disabled = true;
  }
}

const enabledBox = ()=>{
  for (let box of boxs) {
    box.disabled = false;
    box.innerText = "";
  }
}

const checkWinner = ()=>{
   let winnerFound = false;

  for (let pattern of winPatterns) {
    let pos1Val = boxs[pattern[0]].innerText;
    let pos2Val = boxs[pattern[1]].innerText;
    let pos3Val = boxs[pattern[2]]. innerText;

    if(pos1Val != "" && pos2Val != "" && pos3Val != "" ){
      if(pos1Val == pos2Val && pos2Val == pos3Val){
        showWinner(pos1Val);
        winnerFound = true;
        return;
      }
      
    }
  }
  let allFilled = [...boxs].every(box => box.innerText !== "");
      if (!winnerFound && allFilled) {
        msg.innerText = "Game is Tie";
        msgContainer.classList.remove("hide");
        disabledBox();
      }
};

const resetGame = ()=>{
  turn0 = true;
  enabledBox();
  msgContainer.classList.add("hide");
}

newButton.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);