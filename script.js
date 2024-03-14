let container = document.querySelector('.container');
const result = document.getElementById('Result');
const button = document.querySelector('button');

button.addEventListener('click', () => {
    console.log("Clicked")
    LogicDisplay.clear();
})

const Player = function(name, mark){
    const playerName = name;
    let turn = false;
    let playerMark = mark;
    const moves = [];
    return {playerName, turn, playerMark, moves}
}
boardState = {
    boardFilled:[],
    winningCombo: [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]]
}

const Player1 = Player("Player 1", 'X');
const Player2 = Player("Player 2", 'O');
Player1.turn = true;



container.addEventListener('click', function(e){
    LogicDisplay.Display(e.target);

    // only check winner if atleast 5 moves have been completed

    if (boardState.boardFilled.length >= 5) 
    {
        console.log(LogicDisplay.checkWinner());
    }
    
})


const LogicDisplay = (function(){

    let eventTracker = [];
    let checksum = 0;

    let Display = function(event) {

        
        eventid = event.id;

        if (eventid){
            eventTracker.push(event);
        }
        let position = eventid.slice(-1);
        let playerTurn = Player1.turn ? Player1: Player2;
        
        console.log(boardState.boardFilled.includes(position));
        console.log(boardState.boardFilled);

        if (!boardState.boardFilled.includes(position) && eventid)
        {
            if (playerTurn.playerMark === 'X')
            {
                event.style.color = 'brown';
            }
            
            event.textContent = `${playerTurn.playerMark}`;
            playerTurn.moves.push(position);
            boardState.boardFilled.push(position);

            console.log(playerTurn);
            playerTurn.turn = false;
            if (playerTurn === Player1)
            {
                Player2.turn = true;
            }
            else {
                Player1.turn = true;
            }
        }

    }

    function checkWinner() {
        let local = boardState.winningCombo;
        let tempPlayer = Player1.turn ? Player2:Player1
        
        for  (let x = 0; x< local.length; x++)
        {
            for (let y = 0; y< tempPlayer.moves.length; y++)
            {
                

                if (tempPlayer.moves[y] == local[x][0] || tempPlayer.moves[y] == local[x][1] || tempPlayer.moves[y] == local[x][2])
                {
                    checksum = checksum + 1;
                    
                }
            }
            
            if (checksum === 3)
            {
                result.textContent = `${tempPlayer.playerName} Won`   
                boardState.boardFilled = ['1','2','3','4','5','6','7','8','9'];
                return `${tempPlayer.playerName} Won`
            }
            else {
                checksum = 0;
            }
        }
        if (boardState.boardFilled.length === 9)
        {
            result.textContent = "It's a Draw!"
        }
        
    }
    function clear(){
        Player1.moves = [];
        Player2.moves = [];
        Player1.turn = true;
        Player2.turn = false;
        console.log(eventTracker);
        for (let i = 0; i< eventTracker.length; i++){
            eventTracker[i].textContent = '';
            eventTracker[i].style.color = 'black';
        }
        eventTracker = [];
        boardState.boardFilled = [];
        result.textContent = '';

    }
return {Display, checkWinner, clear}
})()