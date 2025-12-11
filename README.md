# 🗺️ Path Quest

An interactive visualization comparing **Greedy Algorithm** vs **BFS (Breadth-First Search)** for pathfinding, demonstrating the trade-offs between local optimization and global optimality.




##  Features

- **Real-time Algorithm Comparison**: Watch Greedy and BFS algorithms run side-by-side
- **Animated Visualization**: See cells explored in real-time with smooth animations
- **Cost Analysis**: Track total path cost, visited nodes, and path length
- **Random Maze Generation**: Each run creates a unique grid with random walls and costs
- **Dark Theme UI**: Modern, professional interface with high contrast



### Algorithm Insights
- **Greedy Algorithm**: Fast but can fail or find suboptimal paths (takes locally best steps)
- **BFS (Dynamic Programming)**: Guarantees shortest path but explores more nodes


## 🛠️ Tech Stack

- **Frontend**: React, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Graphics**: SVG for path connections
- **Build Tool**: Vite

##  Installation
bash
# Clone the repository
git clone https://github.com/yourusername/pathfinding-visualizer.git

# Navigate to project directory
cd pathfinding-visualizer

# Install dependencies
npm install

# Run development server
npm run dev


Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

##  How to Use

1. Click **"Run"** to start both algorithms simultaneously
2. Watch the exploration phase (light tints)
3. See the final paths drawn (bright circles)
4. Compare costs and efficiency between algorithms
5. Click **"Reset"** to generate a new random grid
