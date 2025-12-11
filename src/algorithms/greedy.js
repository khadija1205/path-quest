const getNeighbors = (node, grid) => {
    const neighbors = [];
    const { row, col } = node;

    // up
    if (row > 0) neighbors.push(grid[row - 1][col]);

    // down
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);

    // left
    if (col > 0) neighbors.push(grid[row][col - 1]);

    // right
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

    return neighbors;

}





export const greedy = (grid, startNode, endNode) => {
    const visitedNodesInOrder = [];
    let currentNode = startNode;


    currentNode.isVisitedGreedy = true;
    visitedNodesInOrder.push(currentNode);

    while (currentNode !== endNode) {
        const neighbors = getNeighbors(currentNode, grid);

        const validNeighbors = neighbors.filter(neighbor => !neighbor.isVisitedGreedy && neighbor.type !== 'wall');

        if (validNeighbors.length === 0) {
            break;
        }

        let bestNeighbor = validNeighbors[0];
        for (const neighbor of validNeighbors) {
            if (neighbor.cost < bestNeighbor.cost) {
                bestNeighbor = neighbor;
            }
        }


        bestNeighbor.isVisitedGreedy = true;
        bestNeighbor.parentGreedy = currentNode;
        visitedNodesInOrder.push(bestNeighbor);
        currentNode = bestNeighbor;
    }

    return visitedNodesInOrder;
};


export const getShortestPathGreedy = (endNode) => {

    const path = [];
    let currentNode = endNode;
    if (!endNode.parentGreedy && endNode.type !== 'start') {
        return path; 
    }

    while (currentNode != null && currentNode.parentGreedy != undefined) {
        path.unshift(currentNode);
        currentNode = currentNode.parentGreedy;
    }

    return path;
    
}