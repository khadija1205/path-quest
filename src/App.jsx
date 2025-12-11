import { useState } from 'react';
import { bfs, getShortestPath } from './algorithms/bfs';
import { greedy, getShortestPathGreedy } from './algorithms/greedy';
import Grid from './components/Grid';
import { createInitialGrid } from './utils/gridHelpers';

function App() {
    const [grid, setGrid] = useState(createInitialGrid(10, 10));
    const [stats, setStats] = useState({
        visitedCount: 0,
        pathLength: 0
    });
    const [greedyStats, setGreedyStats] = useState({
        visitedCount: 0,
        pathLength: 0,
        cost: 0
    });
  
  const resetGrid = () => {
      setGrid(createInitialGrid(10, 10));
      setStats({ visitedCount: 0, pathLength: 0, cost: 0 });
      setGreedyStats({ visitedCount: 0, pathLength: 0, cost: 0 });
  };

    const calculatePathCost = (path) => {
        let totalCost = 0;
        for (const node of path) {
            totalCost += node.cost;
        }
        return totalCost;
    };

    const runBFS = () => {
        const startNode = grid[1][1];
        const endNode = grid[8][8];

        const visitedNodes = bfs(grid, startNode, endNode);
        const shortestPath = getShortestPath(endNode);

        setStats({
            visitedCount: visitedNodes.length,
            pathLength: shortestPath.length,
            cost: calculatePathCost(shortestPath)
        });

        for (let i = 0; i < visitedNodes.length; i++) {
            setTimeout(() => {
                visitedNodes[i].isVisited = true;
                setGrid([...grid]);
            }, 20 * i);
        }
      
      const visitedDelay = 10 * visitedNodes.length;
      for (let i = 0; i < shortestPath.length; i++) {
          setTimeout(() => {``
              shortestPath[i].isPath = true;
              setGrid([...grid]);
          }, visitedDelay + 500 * i); // 50ms delay between each path cell
      }

        

        console.log('Visited nodes:', visitedNodes);
        console.log('Shortest path:', shortestPath.length);
        console.log('Path:', shortestPath);
    };

    const runGreedy = () => {
        const startNode = grid[1][1];
        const endNode = grid[8][8];

        const visitedNodes = greedy(grid, startNode, endNode);
        const shortestPath = getShortestPathGreedy(endNode);

        setGreedyStats({
            visitedCount: visitedNodes.length,
            pathLength: shortestPath.length,
            cost: calculatePathCost(shortestPath)
        });

        // Animate visited nodes
        for (let i = 0; i < visitedNodes.length; i++) {
            setTimeout(() => {
                visitedNodes[i].isVisitedGreedy = true;
                setGrid([...grid]);
            }, 20 * i);
        }

       const visitedDelay = 10 * visitedNodes.length;
       for (let i = 0; i < shortestPath.length; i++) {
           setTimeout(() => {
               shortestPath[i].isPathGreedy = true;
               setGrid([...grid]);
           }, visitedDelay + 500 * i); 
       }
    };

    const runBothAlgorithms = () => {
        runGreedy();
        runBFS();
    };

    return (
        <div className="min-h-screen w-full bg-black pt-10">
            <h1 className="flex justify-center items-center text-3xl font-bold text-white">Pathfinding Challenge</h1>
            <h3 className="flex justify-center items-center text-l text-[#a19d9d]">Greedy vs Dynamic Programming</h3>

            <div className="flex justify-center mt-5">
                <button
                    onClick={runBothAlgorithms}
                    className="bg-gray-600 text-[#bcb1b1] px-6 py-2 rounded-full hover:bg-blue-600"
                >
                    Run
                </button>
                <button
                    onClick={resetGrid}
                    className="bg-gray-600 text-[#bcb1b1] px-6 py-2 rounded-full hover:bg-gray-500 ml-2"
                >
                    Reset
                </button>
            </div>

            <Grid grid={grid} stats={stats} greedyStats={greedyStats} />
        </div>
    );
}

export default App;
