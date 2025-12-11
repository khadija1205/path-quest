const getNeighbors = (node, grid) => {
    const neighbors = [];
    const { row, col } = node;

    // up
    if (row > 0) {
        neighbors.push(grid[row - 1][col]);
    }

    // down
    if (row < grid.length - 1) {
        neighbors.push(grid[row + 1][col]);
    }

    // Left
    if (col > 0) {
        neighbors.push(grid[row][col - 1]); 
    }

    // right
    if (col < grid[0].length - 1) {
        neighbors.push(grid[row][col + 1]);
    }

    return neighbors;
}


export const getShortestPath = (endNode) => {
    const path = [];
    let currentNode = endNode;

     if (!endNode.parent && endNode.type !== 'start') {
         return path; 
     }

    while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = currentNode.parent;
    }

    return path;
}




export const bfs = (grid, startNode, endNode) => {
    const visitedNodesInOrder = [];
    const queue = [];

    startNode.isVisited = true;
    startNode.parent = null;
    queue.push(startNode);


    while (queue.length > 0) {
        const currentNode = queue.shift();

        visitedNodesInOrder.push(currentNode);

        if (currentNode == endNode) {
            return visitedNodesInOrder;
        }

        const neighbors = getNeighbors(currentNode, grid);


        for (const neighbor of neighbors) {
            if (!neighbor.isVisited && neighbor.type !== 'wall') {
                neighbor.isVisited = true;

                neighbor.parent = currentNode;

                queue.push(neighbor);
            }
        }
    }

    return visitedNodesInOrder;
}