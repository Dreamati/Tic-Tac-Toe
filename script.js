
const Player = function(name, mark){
    const playerName = name;
    let turn = false;
    let playerMark = mark;
    const moves = [];
    return {playerName, turn, mark, moves}
}

const Player1 = Player("Player 1", 'X');
const Player2 = Player("Player 2", 'O');
Player1.turn = true;

let container = document.querySelector('.container');
container.addEventListener('click', function(e){
    Display(e.target)
    
})

boardState = {
    boardFilled:[]
}

let Display = function(event) {

    eventid = event.id;
    
    let position = eventid.slice(-1);
    let playerTurn = Player1.turn ? Player1: Player2;

    console.log(`#${event.id}`)
    console.log(document.getElementById(`${event.id}`));
    console.log(eventid);
    

    if (!boardState.boardFilled.includes(position) && eventid)
    {
        console.log(event);
        event.textContent = `${playerTurn.mark}`;
        playerTurn.moves.push(position);
        boardState.boardFilled.push(position);
        console.log(boardState.boardFilled);
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
    console.log(boardState.boardFilled.includes(position));
}