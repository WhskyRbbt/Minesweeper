
// Variables
let map = [];
const COLS = 10;
const ROWS = 10;
const BOMBS = 10;
const bomb = [];
const hasMine = false;


// function newGame() {
//     let reset = document.getElementById('restart');
//     reset.addEventListener('click', addMines())
// }console.log(newGame)
// newGame();
    
function addMines () {
    let x;
    let y;
    for (let i = 0; i < BOMBS; i++) {      
        x = Math.floor(Math.random() * Math.floor(COLS))
        y = Math.floor(Math.random() * Math.floor(ROWS)) 
        let mineLocation = `${x}` + `${y}`;
        let placeMine = bomb.push(mineLocation);
        console.log("this is ", mineLocation);   
    }
    // console.log("BOMB ", bomb)
    // establish bomb id
    for (let j = 0; j < bomb.length; j++) {
        let markBomb = document.getElementById(bomb[j]);
        markBomb.setAttribute('hasMine','true');

        markBomb.innerHTML = "<img src='/images/bomb.png' width='100%' height='100%' verticle-align='center'>";
        // console.log("MARK BOMB ", markBomb);

    }
}addMines();

function clickCell(cell) {
  //Check if the end-user clicked on a mine
  if (cell.getAttribute("hasMine")==="true") {
    revealMines();
    // write function to reveal  mine
    // alert("Game Over");
  } else {
    cell.className="clicked";
    //Count and display the number of adjacent mines
    var mineCount=0;
    var cellRow = cell.parentNode.rowIndex;
    var cellCol = cell.cellIndex;
    //alert(cellRow + " " + cellCol);
    for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,9); i++) {
      for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,9); j++) {
        if (map.rows[i].cells[j].getAttribute("hasMine")=="true") mineCount++;
      }
    }
    cell.innerHTML=mineCount;
    if (mineCount==0) { 
      //Reveal all adjacent cells as they do not have a mine
      for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,9); i++) {
        for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,9); j++) {
          //Recursive Call
          if (map.rows[i].cells[j].innerHTML=="") clickCell(map.rows[i].cells[j]);
        }
      }
    }
    checkLevelCompletion();
  }
}
    // on click, check if hasMine is truthy, if false, reveal cell. if value is 0, check for cells in circle through recursion.
    //display number of mines in viciinity of reveraled cells.
    //set barrier for map


// function gameOver() {
//     if (hasMine.includes('true');
//     return "GaMe oVEr!"
//     } else {

//     }
// }
    
