const gameboard = (function() {
    const board = [[null, null, null], [null, null, null], [null, null, null]]

    function setBoard(marker, x, y) {
        board[y][x] = marker

        return board
    }

    function checkWin() {
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

    return {setBoard, checkWin}
})();

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
                if (board[y][x]) {
                    newCell.textContent = board[y][x]
                } else {
                    newCell.textContent = ' '
                }
                newCell.textContent = board[y][x]
                newLayer.appendChild(newCell)
            }
            
        }
    }

    return {update}
})()

function makePlayer(marker) {
    function play(x, y) {
        return gameboard.setBoard(marker, x, y)
    }

    return {play}
}

displayController.update(makePlayer('O').play(1,0))
