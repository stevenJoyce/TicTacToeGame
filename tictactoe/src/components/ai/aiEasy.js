
function aiEasy(board) {
    const emptySquares = board
    .map((value, index) => value === null ? index : null)
    .filter(index => index !== null);

    return emptySquares[Math.floor(Math.random() * emptySquares.length)];

}

export default aiEasy;