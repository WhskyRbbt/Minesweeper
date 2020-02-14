
const map = document.getElementById("map");
let mapChecker = false;
let message = document.getElementById('win_loss');


function init() {
    map.innerHTML = "";
    for (let i = 0; i < 10; i++) {
      row = map.insertRow(i);
      for (let j = 0; j < 10; j++) {
        cell = row.insertCell(j);
        cell.addEventListener('click', clickHandeler)
        let bomb = document.createAttribute("hasBomb");       
        bomb.value = "false";             
        cell.setAttributeNode(bomb);
        message.innerHTML = "";
      }
    }
    addBombs();
}

let clickHandeler = function(e) {
    return cellChoice(e.target)
}

function addBombs() {
    for (let i = 0; i <=  6; i++) {
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 10);
        let cell = map.rows[row].cells[col];
        cell.setAttribute("hasBomb", "true");
        if (mapChecker) cell.innerHTML = "X";
    }
}

function displayBombs() {
    for (let i=0; i<10; i++) {
      for(let j=0; j<10; j++) {
        let cell = map.rows[i].cells[j];
        if (cell.getAttribute("hasBomb")==="true") cell.className="bomb";
      }
    }
}

function cellChoice(cell) {
    if (cell.getAttribute("hasBomb") === "true") {
      displayBombs();

      let loss = document.getElementById('win_loss');
      loss.innerHTML = "Sorry, you got </br>* 'SPLODED! *";
      let noMoClicks = document.getElementById('map');
      let cells = Array.from(noMoClicks.getElementsByTagName('td'));

      for (i = 0; i < cells.length; i++) {
          cells[i].removeEventListener('click', clickHandeler);
      }

    } else {
      cell.className = "picked";
      let bombCount = 0;
      let cellRow = cell.parentNode.rowIndex;
      let cellCol = cell.cellIndex;
      for (let i = Math.max(cellRow-1,0); i <= Math.min(cellRow+1,9); i++) {
        for(let j = Math.max(cellCol-1,0); j <= Math.min(cellCol+1,9); j++) {
          if (map.rows[i].cells[j].getAttribute("hasBomb") === "true") bombCount++;
        }
      }
      cell.innerHTML = bombCount;
       { 
          if (bombCount === 0) { 
          for (let i = Math.max(cellRow-1,0); i <= Math.min(cellRow+1,9); i++) {
              for(let j = Math.max(cellCol-1,0); j <= Math.min(cellCol+1,9); j++) {
                if (map.rows[i].cells[j].innerHTML === "") cellChoice(map.rows[i].cells[j]);
                    }
                }
            }
        }
    isGameOver();
    }
}

function isGameOver() {
  let noMoreMoves = true;
    for (let i = 0; i < 10; i++) {
      for(let j = 0; j < 10; j++) {
        if ((map.rows[i].cells[j].getAttribute("hasBomb") === "false") && (map.rows[i].cells[j].innerHTML === "")) noMoreMoves = false;
      }
  }
  if (noMoreMoves) {
    let win = document.getElementById('win_loss');
    win.innerHTML = "* NOICE!!! *</br>You Beat the System!!!";
    displayBombs();
  }
}


init();