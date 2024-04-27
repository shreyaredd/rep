const selectBox = document.querySelector(".select-box"),
selectBtnX = selectBox.querySelector(".options .playerX"),
selectBtnO = selectBox.querySelector(".options .playerO"),
playBoard = document.querySelector(".play-board"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll("section span"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

window.onload = ()=>{
    for (let i = 0; i < allBox.length; i++) {
       allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

selectBtnX.onclick = ()=>{
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
}

selectBtnO.onclick = ()=>{ 
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.setAttribute("class", "players active player");
}

let playerXIcon = "fas fa-times",
playerOIcon = "far fa-circle",
playerSign = "X",
runBot = true;

function clickedBox(element){
    if(players.classList.contains("player")){
        playerSign = "O";
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        element.setAttribute("id", playerSign);
    }else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        element.setAttribute("id", playerSign);
        players.classList.add("active");
    }
    selectWinner();
    element.style.pointerEvents = "none";
    playBoard.style.pointerEvents = "none";
    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(()=>{
        bot(runBot);
    }, randomTimeDelay);
}

function bot(){
    let array = [];
    if(runBot){
        playerSign = "O";
        for (let i = 0; i < allBox.length; i++) {
            if(allBox[i].childElementCount == 0){
                array.push(i);
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if(array.length > 0){
            if(players.classList.contains("player")){ 
                playerSign = "X";
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                allBox[randomBox].setAttribute("id", playerSign);
                players.classList.add("active");
            }else{
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();
        
        }
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
        playerSign = "X";
    }
}

function getIdVal(classname){
    return document.querySelector(".box" + classname).id;
}
function checkIdSign(val1, val2, val3, sign){ 
    if(getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign){
        return true;
    }
}

function selectWinner(){
    if(checkIdSign(1,2,3,playerSign) || checkIdSign(2,3,4,playerSign) || checkIdSign(5,6,7, playerSign) || checkIdSign(6,7,8, playerSign) || checkIdSign(9,10,11, playerSign) || checkIdSign(10,11,12, playerSign) || checkIdSign(13,14,15, playerSign) || checkIdSign(14,15,16, playerSign) 
    || checkIdSign(1,5,9, playerSign) || checkIdSign(5,9,13, playerSign) || checkIdSign(2,6,10, playerSign) || checkIdSign(6,10,14, playerSign) || checkIdSign(3,7,11, playerSign) || checkIdSign(7,11,15, playerSign) || checkIdSign(4,8,12, playerSign) || checkIdSign(8,12,16, playerSign) 
    || checkIdSign(1,6,11, playerSign) || checkIdSign(6,11,16, playerSign) || checkIdSign(2,7,12, playerSign) || checkIdSign(5,10,15, playerSign) || checkIdSign(4,10,7, playerSign) || checkIdSign(7,10,13, playerSign) || checkIdSign(3,6,9, playerSign) || checkIdSign(8,11,14, playerSign)){
        runBot = false;
        bot(runBot);
        setTimeout(()=>{
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 700);
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    }else{
        if(getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != ""&& getIdVal(10) != ""&& getIdVal(11) != ""&& getIdVal(12) != ""&& getIdVal(13) != ""&& getIdVal(14) != ""&& getIdVal(15) != ""&& getIdVal(16) != ""){
            runBot = false;
            bot(runBot);
            setTimeout(()=>{
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700);
            wonText.textContent = "Match has been drawn!";
        }
    }
}
  

replayBtn.onclick = ()=>{
    window.location.reload();
}