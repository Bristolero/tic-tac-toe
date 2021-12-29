//Functions

const PlayerFactory = (name) => { 
    return {name};
}

const player1 = PlayerFactory("Player 1");
const player2 = PlayerFactory("Player 2");

//GUI Elements
const gameGrid = document.getElementById("gameGrid")

const GameBoard = (() => {
    const board = ["","","","","","","","",""];

    const loadBoard = () => {
        let gameGrid = document.getElementById('gameGrid')
        gameGrid.innerHTML = "";
        for(let i = 1; i<=GameBoard.board.length; i++) {
            console.log(GameBoard.board[i-1])
            let fieldDiv = document.createElement('div');
            fieldDiv.id = i;
            fieldDiv.classList.add('field');
            fieldDiv.innerHTML = GameBoard.board[i-1];
            fieldDiv.addEventListener('click', function () {
                GameController.makeMove(fieldDiv.id)
            });
            gameGrid.appendChild(fieldDiv);
        }
    }

    const removeListeners = () => {
        var el = document.getElementById("gameGrid");
        elClone = el.cloneNode(true);
        el.parentNode.replaceChild(elClone, el);
        for(let i = 0; i<board.length; i++) {
            let field = document.getElementById(i+1);
            field.style.pointerEvents = "none";
        }
    }
   

    const checkWin = () => {
        if( (GameBoard.board[0] == "O" && GameBoard.board[3] == "O" && GameBoard.board[6] == "O") || 
        (GameBoard.board[1] == "O" && GameBoard.board[4] == "O" && GameBoard.board[7] == "O") || 
        (GameBoard.board[2] == "O" && GameBoard.board[5] == "O" && GameBoard.board[8] == "O") || 
        (GameBoard.board[0] == "O" && GameBoard.board[1] == "O" && GameBoard.board[2] == "O") || 
        (GameBoard.board[3] == "O" && GameBoard.board[4] == "O" && GameBoard.board[5] == "O") ||
        (GameBoard.board[6] == "O" && GameBoard.board[7] == "O" && GameBoard.board[8] == "O") || 
        (GameBoard.board[0] == "O" && GameBoard.board[4] == "O" && GameBoard.board[8] == "O") || 
        (GameBoard.board[2] == "O" && GameBoard.board[4] == "O" && GameBoard.board[6] == "O") ) {   
            DisplayController.showWinner("Player 2");
            removeListeners();
        } else if ( (GameBoard.board[0] == "X" && GameBoard.board[3] == "X" && GameBoard.board[6] == "X") || 
        (GameBoard.board[1] == "X" && GameBoard.board[4] == "X" && GameBoard.board[7] == "X") || 
        (GameBoard.board[2] == "X" && GameBoard.board[5] == "X" && GameBoard.board[8] == "X") || 
        (GameBoard.board[0] == "X" && GameBoard.board[1] == "X" && GameBoard.board[2] == "X") || 
        (GameBoard.board[3] == "X" && GameBoard.board[4] == "X" && GameBoard.board[5] == "X") ||
        (GameBoard.board[6] == "X" && GameBoard.board[7] == "X" && GameBoard.board[8] == "X") || 
        (GameBoard.board[0] == "X" && GameBoard.board[4] == "X" && GameBoard.board[8] == "X") || 
        (GameBoard.board[2] == "X" && GameBoard.board[4] == "X" && GameBoard.board[6] == "X") ) {
            DisplayController.showWinner("Player 1");
            removeListeners();
        } else if (!GameBoard.board.includes("")) {
            DisplayController.showWinner("Nobody")
            removeListeners();
        }
    }
    return {board, checkWin, loadBoard}
})();


const GameController = (() => {
    let whosTurn = player1;

    const reset = () => {
        GameBoard.board = ["","","","","","","","",""]
        gameGrid.innerHTML="";
        GameBoard.loadBoard()
        whosTurn = player1;
        console.log("RESET")
        DisplayController.handleTurn(whosTurn.name)
    }

    const manipulateField = (id) => {
        let field = document.getElementById(id);
        field.textContent = GameBoard.board[id-1];
        console.log("successfully removed")
        if(whosTurn.name == "Player 1") {
            field.classList.add("made-red");
            field.classList.remove("active");
        } else {
            field.classList.add("made-green")
            field.classList.remove("active");
        }
    }

    const makeMove = (id) => {
        if(whosTurn.name == "Player 1" && GameBoard.board[id-1]=="") {
            GameBoard.board[id-1] = "X";
            whosTurn = player2;
            manipulateField(id);
        } else if(whosTurn.name == "Player 2" && GameBoard.board[id-1]=="") {
            GameBoard.board[id-1] = "O";
            whosTurn = player1;
            manipulateField(id);
        }
        DisplayController.handleTurn(whosTurn.name);
        GameBoard.checkWin();
    };

    return {makeMove, whosTurn, reset};
})();

const DisplayController = (() => {
    const display = document.getElementById("turn-indicator")
    const handleTurn = (name) => {
        display.textContent = "Current turn: " + name;
    };

    const showWinner = (name) => {
        display.textContent = name + " won!";
    };
    return {handleTurn, showWinner};
})();

//ON INIT
//Load Board
GameBoard.loadBoard();

DisplayController.handleTurn("Player 1");