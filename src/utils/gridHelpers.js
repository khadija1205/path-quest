const shouldBeWall = () => {
    return Math.random() < 0.2;
}


export const createInitialGrid = (rows, cols) => {

    const createCell = (row, col) => {
        const cell = {
            row: row,
            col: col,
            type: 'empty',
            isVisited: false,
            isPath: false,
            isVisitedGreedy: false,
            isPathGreedy: false,
            parentGreedy: null,
            cost: Math.floor(Math.random() * 9) + 1,
        
        };
        return cell;
    };


    const createRow = (rowIndex, cols) => {
        const row = [];

        for (let col = 0; col < cols; col++) {
            const cell = createCell(rowIndex, col);
            row.push(cell);
        }

        return row;
    };




    const grid = [];

    for (let row = 0; row < rows; row++) {
        const rowArray = createRow(row, cols);
        grid.push(rowArray);
    }

    grid[1][1].type = 'start';
    grid[8][8].type = 'end';



    for (let row = 0; row < rows; row++){
        for (let col = 0; col < cols; col++){
            if (grid[row][col].type !== 'start' && grid[row][col].type !== 'end') {
                if (shouldBeWall()) {
                    grid[row][col].type = 'wall';
                }
            }
        }
    }

    return grid;

};


