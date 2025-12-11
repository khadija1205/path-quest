
const Grid = ({ grid, stats, greedyStats }) => {
    


    const getLines = (grid, useGreedy = false) => {
        const lines = [];
        const cellSize = 33; 
        
        grid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const parentProp = useGreedy ? 'parentGreedy' : 'parent';
                const visitedProp = useGreedy ? 'isVisitedGreedy' : 'isVisited';
                
                if (cell[visitedProp] && cell[parentProp]) {
                    const parent = cell[parentProp];
                    
                    // Calculate center points of cells
                    const x1 = parent.col * cellSize + cellSize / 2;
                    const y1 = parent.row * cellSize + cellSize / 2;
                    const x2 = cell.col * cellSize + cellSize / 2;
                    const y2 = cell.row * cellSize + cellSize / 2;
                    
                    lines.push({ x1, y1, x2, y2 });
                }
            });
        });
        
        return lines;
    }


    return (
        <div className="flex flex-col items-center min-h-screen">
            <div className="flex flex-col w-[300px] text-left mt-10">
                <h1 className=" text-green-300 text-xl font-bold mb-2">Greedy Approach</h1>
                <h2 className="text-[#a19d9d] text-sm">Takes Locally Best Step</h2>
            </div>

            {/* grid */}

            <div className="p-4 rounded-xl border border-gray-600 bg-[#0f0f0f] shadow-lg mt-5 ">
                {/* loop through each row */}
                <div className="relative">
                    {grid.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex gap-[1px]">
                            {/* loop though each cell in a row */}
                            {row.map((cell, cellIndex) => {
                                let bgColor = 'bg-gray-700';
                                let textColor = 'text-gray-400';
                                let showCircle = false;
                                if (cell.type === 'start') {
                                    bgColor = 'bg-green-400';
                                    textColor = 'text-white';
                                } else if (cell.type === 'end') {
                                    bgColor = 'bg-red-400';
                                    textColor = 'text-white';
                                } else if (cell.type === 'wall') {
                                    bgColor = 'bg-gray-400';
                                    textColor = 'text-gray-600';
                                } else if (cell.isPathGreedy) {
                                    bgColor = 'bg-white';
                                    showCircle = true;
                                    textColor = 'text-white';
                                } else if (cell.isVisitedGreedy) {
                                    bgColor = 'bg-gray-700';
                                    textColor = 'text-gray-400';
                                }
                                return (
                                    <div
                                        key={cellIndex}
                                        className={`w-8 h-8 ${bgColor} border border-gray-300 flex items-center justify-center text-xs font-semibold relative transition-colors duration-800`}
                                    >
                                        {showCircle && (
                                            <div className="absolute inset-0 bg-green-400 rounded-full opacity-50 z-0"></div>
                                        )}

                                        <span className={`relative z-10 ${textColor} font-bold`}>
                                            {cell.type !== 'wall' && cell.cost}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    ))}

                    {/* SVG overlay for lines */}
                    <svg
                        className="absolute top-0 left-0 pointer-events-none"
                        width={grid[0].length * 32}
                        height={grid.length * 32}
                    >
                        {getLines(grid, true).map((line, index) => (
                            <line
                                key={index}
                                x1={line.x1}
                                y1={line.y1}
                                x2={line.x2}
                                y2={line.y2}
                                stroke="#86efac"
                                strokeWidth="3"
                                opacity="0.7"
                            />
                        ))}
                    </svg>
                </div>

                <div className="flex flex-col justify-center ">
                    <div className="text-green-300 mt-2">cost: {greedyStats.cost}</div>
                    <div className="text-green-300">Visited nodes: {greedyStats.visitedCount}</div>
                    <div className="text-green-300">Shortest Path: {greedyStats.pathLength}</div>
                </div>
            </div>

            <div className="flex flex-col w-[300px] text-left mt-10">
                <h1 className=" text-yellow-200 text-xl font-bold mb-2">Dynamic Programming</h1>
                <h2 className="text-[#a19d9d] text-sm">Finds optimal path</h2>
            </div>

            {/* grid */}

            <div className="p-4 rounded-xl border border-gray-600 bg-[#0f0f0f] shadow-lg mt-5 ">
                {/* loop through each row */}
                <div className="relative">
                    {grid.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex gap-[1px]">
                            {/* loop though each cell in a row */}
                            {row.map((cell, cellIndex) => {
                                 let bgColor = 'bg-gray-800'; 
                                 let textColor = 'text-gray-500';
                                 let showCircle = false;

                                 if (cell.type === 'start') {
                                     bgColor = 'bg-green-500';
                                     textColor = 'text-white';
                                 } else if (cell.type === 'end') {
                                     bgColor = 'bg-red-500';
                                     textColor = 'text-white';
                                 } else if (cell.type === 'wall') {
                                     bgColor = 'bg-black'; 
                                     textColor = 'text-gray-700';
                                 } else if (cell.isPath) {
                                     
                                     showCircle = true;
                                     textColor = 'text-white';
                                 } else if (cell.isVisited) {
                                     
                                     textColor = 'text-gray-500';
                                 }

                                return (
                                    <div
                                        key={cellIndex}
                                        className={`w-8 h-8 ${bgColor} border border-gray-300 flex items-center justify-center text-xs font-semibold relative transition-colors duration-800`}
                                    >
                                        {showCircle && (
                                            <div className="absolute inset-1 bg-yellow-400 rounded-full opacity-50 z-0"></div>
                                        )}
                                        <span className={`relative z-10 ${textColor} font-bold`}>
                                            {cell.type !== 'wall' && cell.cost}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    ))}

                    {/* SVG overlay for lines */}
                    <svg
                        className="absolute top-0 left-0 pointer-events-none"
                        width={grid[0].length * 32}
                        height={grid.length * 32}
                    >
                        {getLines(grid, false).map((line, index) => (
                            <line
                                key={index}
                                x1={line.x1}
                                y1={line.y1}
                                x2={line.x2}
                                y2={line.y2}
                                stroke="#fbbf24"
                                strokeWidth="3"
                                opacity="0.7"
                            />
                        ))}
                    </svg>
                </div>

                <div className="text-yellow-200 mt-2">cost: {stats.cost}</div>
                <div className="text-yellow-200">Visited nodes: {stats.visitedCount}</div>
                <div className="text-yellow-200">Shortest Path: {stats.pathLength}</div>
            </div>
        </div>
    );
};

export default Grid;


