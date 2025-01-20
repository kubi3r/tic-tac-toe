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

    function start() {
        gameboard.resetBoard()
        displayController.update(gameboard.getBoard())

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

            turn === p1 ? turn = p2 : turn = p1

            const won = game.checkWin(gameboard.getBoard())

            if (won === 'draw') {
                console.log('draw')
            } else if (won) {
                console.log(`${won} wins`)
            }
        })
    }

    return {checkWin, start}
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

game.start()