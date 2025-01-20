const gameboard = (function() {
    const board = [[null, null, null], [null, null, null], [null, null, null]]

    function setBoard(marker, x, y) {
        board[y][x] = marker
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

function makePlayer(marker) {
    function play(x, y) {
        gameboard.setBoard(marker, x, y)
    }

    return {play}
}