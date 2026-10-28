import { WinningLines } from '../gamecore/gameLogic';

function getRandomMove(grid) {
    const emptySquares =
     grid.map((value, index) => value === null ? index : null)
        .filter(index => index !== null)

    if(emptySquares.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    return emptySquares[randomIndex];
}

function aiOpponent(grid, aiPlayer, humanPlayer) {

    for (const line of WinningLines) {
        const [a,b,c] = line;
        const values = [grid[a], grid[b], grid[c]];
        if(values.filter(v => v === aiPlayer).length === 2 &&
            values.includes(null)){
                return line[values.indexOf(null)];
            }
    }

    for(const line of WinningLines){
        const [a,b,c] = line;
        const values = [grid[a], grid[b], grid[c]];
        if(values.filter(v => v === humanPlayer).length === 2 &&
            values.includes(null)){
                return line[values.indexOf(null)];
            }

    }

    if(grid[4] === null) return 4;

    const corners = [0,2,6,8].filter(i => grid[i] === null);
    if(corners.length > 0){
         return corners[Math.floor(Math.random() * corners.length)];
    }

    return getRandomMove(grid);

}

export default aiOpponent;