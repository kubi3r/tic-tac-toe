const gameboard = (function() {
    let board = [[null, null, null], [null, null, null], [null, null, null]]

    function setBoard(marker, x, y) {
        board[y][x] = marker
    }

    function getBoard() {
        return board
    }

    function resetBoard() {
        board = [[null, null, null], [null, null, null], [null, null, null]]
    }

    return {setBoard, getBoard, resetBoard}
})();

function makePlayer(marker) {
    function play(x, y) {
        return gameboard.setBoard(marker, x, y)
    }

    return {play}
}

const game = (function() {
    function checkWin(board) {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0]) { // horizontal
                return board[i][0]
            } 
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i]) { // vertical
                return board[0][i]
            }
            if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0]) { // diagonal 1
                return board[0][0]
            } 
            if (board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[2][0]) { // diagonal 2
                return board[2][0]
            }
        }

        for (layer of board) {
            for (cell of layer) {
                if (cell === null) {
                    return false
                }
            }
        }

        return 'draw'
    }

    function reset() {
        gameboard.resetBoard()
        displayController.update(gameboard.getBoard())
        document.querySelector('.result').textContent = ''
    }

    return {checkWin, reset}
})()

const displayController = (function() {
    const boardContainer = document.querySelector('.board')

    function update(board) {
        boardContainer.textContent = ''

        for (let y = 0; y < 3; y++) {
            const newLayer = document.createElement('div')
            newLayer.classList.add('layer')
            newLayer.setAttribute('data', y)
            boardContainer.appendChild(newLayer)

            for (let x = 0; x < 3; x++) {
                const newCell = document.createElement('div')
                newCell.classList.add('cell')
                newCell.setAttribute('data', x)

                newCell.textContent = board[y][x]

                newLayer.appendChild(newCell)
            }
            
        }
    }

    return {update}
})()

const p1 = makePlayer('X')
const p2 = makePlayer('O')

let turn = p1

document.querySelector('.board').addEventListener('click', (event) => {
    if (event.target.className !== 'cell') {
        return
    }

    const y = event.target.parentElement.getAttribute('data')
    const x = event.target.getAttribute('data')
    
    if (gameboard.getBoard()[y][x] !== null) {
        return
    }

    turn.play(x, y)
    displayController.update(gameboard.getBoard())

    const won = game.checkWin(gameboard.getBoard())

    if (won === 'draw') {
        document.querySelector('.result').textContent = 'Draw'
    } else if (won) {
        const p1Name = document.querySelector('.player-one').value
        const p2Name = document.querySelector('.player-two').value

        if (turn === p1 && p1Name !== '') {
            document.querySelector('.result').textContent = `${p1Name} wins`
        } else if (turn === p2 && p2Name !== '') {
            document.querySelector('.result').textContent = `${p2Name} wins`
        } else {
            document.querySelector('.result').textContent = `${won} wins`
        }
    }

    turn === p1 ? turn = p2 : turn = p1
})

document.querySelector('button').addEventListener('click', (event) => {
    game.reset()
    turn = p1

    event.target.textContent = 'Restart'
})
