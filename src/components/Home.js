import { useState } from "react";
import { shortestPath } from "../utils/shortest-path";

const makeGrid = (x, y) => Array(x).fill(Array(y).fill(0));
const selects = {
  start: "Start",
  end: "End",
  obstacle: {
    add: "Add Obstacle",
    remove: "Remove Obstacle",
  },
};

const defaults = {
  grid: [10, 15],
  start: [0, 0],
  end: [9, 14],
  obstacles: JSON.parse(
    "[[2,1],[3,1],[4,1],[5,1],[5,0],[6,0],[7,0],[7,1],[8,1],[8,2],[8,4],[8,5],[6,5],[6,4],[6,3],[5,3],[4,3],[3,3],[3,4],[3,6],[3,7],[2,7],[2,6],[1,6],[1,5],[1,4],[1,7],[1,8],[1,9],[1,10],[2,10],[3,10],[4,10],[5,10],[5,8],[6,8],[6,7],[8,9],[7,10],[7,12],[6,12],[5,12],[5,13],[4,13],[2,14],[7,2],[5,4],[5,5],[5,6],[5,7],[6,10],[9,12],[8,13],[0,8],[9,11],[8,8],[8,6],[8,7]]"
  ),
  path: [],
  select: selects.obstacle.add,
  isClicked: false,
};

export default function Home() {
  const [grid, setGrid] = useState(defaults.grid);
  const [start, setStart] = useState(defaults.start);
  const [end, setEnd] = useState(defaults.end);
  const [select, setSelect] = useState(defaults.select);
  const [obstacles, setObstacles] = useState(defaults.obstacles);
  const [path, setPath] = useState(defaults.path);
  const [isClicked, setIsClicked] = useState(defaults.isClicked);

  const handlePlay = () => {
    setPath(shortestPath(grid, obstacles, start, end));
  };

  const handleReset = () => {
    setGrid(defaults.grid);
    setStart(defaults.start);
    setEnd(defaults.end);
    setObstacles(defaults.obstacles);
    setPath(defaults.path);
    setSelect(defaults.select);
    setIsClicked(defaults.isClicked);
  };

  return (
    <div className="flex items-center justify-center h-[100vh] select-none">
      <div>
        <div className="flex justify-between items-center py-1">
          <div>
            <form>
              <input
                type="text"
                className="border-2 border-gray-700/50 rounded-md py-2 w-14 ml-1 px-3 text-xl opacity-60 cursor-not-allowed"
                disabled
                // onChange={(e) => {
                //   const value = Number(e.target.value);
                //   if (value >= 0 && value <= 15) {
                //     setGrid([value, grid[1]]);
                //   }
                // }}
                value={grid[0]}
              />
              <input
                type="text"
                className="border-2 border-gray-700/50 rounded-md py-2 w-14 ml-1 px-3 text-xl opacity-60 cursor-not-allowed"
                disabled
                // onChange={(e) => {
                //   const value = Number(e.target.value);
                //   if (value >= 0 && value <= 15) {
                //     setGrid([grid[0], value]);
                //   }
                // }}
                value={grid[1]}
              />
            </form>
          </div>
          <div className="flex justify-center gap-1">
            <button
              onClick={handleReset}
              className={`px-4 py-2 border bg-slate-300 hover:border-slate-700`}
            >
              Reset
            </button>
            <button
              onClick={handlePlay}
              className={`px-4 py-2 border bg-slate-300 hover:border-slate-700 font-bold`}
            >
              Find Path
            </button>
          </div>
        </div>

        <div
          className="flex flex-col border-8 border-[groove] border-gray-500 h-[80vh] w-[90vw]"
          onMouseDown={() => setIsClicked(true)}
          onMouseUp={() => setIsClicked(false)}
        >
          {makeGrid(...grid).map((row, i) => (
            <div key={i} className="flex h-full w-full">
              {row.map((_, j) => {
                const isStart = start[0] === i && start[1] === j;
                const isEnd = end[0] === i && end[1] === j;
                const isObstacle = !!obstacles.find(
                  (obs) => obs[0] === i && obs[1] === j
                );
                const isPath = !!path.find(
                  (block) => block[0] === i && block[1] === j
                );
                const isOccupied = isStart || isEnd || isObstacle;
                const addObstacle = () => setObstacles([...obstacles, [i, j]]);
                const removeObstacle = () =>
                  setObstacles(
                    obstacles.filter((obs) => !(obs[0] === i && obs[1] === j))
                  );

                return (
                  <div
                    key={`${i}${j}`}
                    className={`border-b border-l border-gray-200/20 inline-flex items-center justify-center w-full h-full ${
                      isOccupied
                        ? "cursor-default " +
                          (isStart || isEnd ? "bg-gray-900" : "bg-gray-600")
                        : isPath
                        ? "bg-green-950"
                        : "bg-green-600 hover:bg-green-700 cursor-pointer"
                    } text-white`}
                    onMouseDown={() => {
                      if (!isOccupied) {
                        if (select === selects.start) setStart([i, j]);
                        else if (select === selects.end) setEnd([i, j]);
                        else if (select === selects.obstacle.add) addObstacle();
                      } else if (select === selects.obstacle.remove)
                        removeObstacle();
                    }}
                    onMouseOver={() => {
                      if (isClicked) {
                        if (select === selects.obstacle.add && !isOccupied) {
                          addObstacle();
                        } else if (
                          select === selects.obstacle.remove &&
                          isObstacle
                        )
                          removeObstacle();
                      }
                    }}
                  >
                    {isStart ? (
                      "Start"
                    ) : isEnd ? (
                      "End"
                    ) : (
                      <span className="invisible">
                        {false ? i * grid[1] + j + 1 : "0"}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div>
          <div className="flex justify-between items-center py-1 gap-1">
            <div>
              <button
                onClick={() => {
                  setSelect(selects.obstacle.add);
                }}
                className={`px-4 py-2 border ${
                  select === selects.obstacle.add
                    ? "bg-slate-700 text-white"
                    : "bg-slate-300 hover:border-slate-700"
                }`}
              >
                Add Obstacles
              </button>
              <button
                onClick={() => {
                  setSelect(selects.obstacle.remove);
                }}
                className={`px-4 py-2 border ${
                  select === selects.obstacle.remove
                    ? "bg-slate-700 text-white"
                    : "bg-slate-300 hover:border-slate-700"
                }`}
              >
                Remove Obstacles
              </button>
            </div>
            <button
              onClick={() => {
                setObstacles([]);
              }}
              className={`px-4 py-2 border bg-slate-300 hover:border-slate-700`}
            >
              Clear Obstacles
            </button>
            <div>
              <button
                onClick={() => {
                  setSelect(selects.start);
                }}
                className={`px-4 py-2 border ${
                  select === selects.start
                    ? "bg-slate-700 text-white"
                    : "bg-slate-300 hover:border-slate-700"
                }`}
              >
                Move Start
              </button>
              <button
                onClick={() => {
                  setSelect(selects.end);
                }}
                className={`px-4 py-2 border ${
                  select === selects.end
                    ? "bg-slate-700 text-white"
                    : "bg-slate-300 hover:border-slate-700"
                }`}
              >
                Move End
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
