import { useState } from "react";

const makeGrid = (x, y) => Array(x).fill(Array(y).fill(0));
const selects = {
  start: "Start",
  end: "End",
  obstacle: {
    add: "Add Obstacle",
    remove: "Remove Obstacle",
  },
};

export default function Home() {
  const [grid, setGrid] = useState([10, 15]);
  const [start, setStart] = useState([0, 0]);
  const [end, setEnd] = useState([9, 14]);
  const [select, setSelect] = useState(selects.start);
  const [obstacles, setObstacles] = useState([
    [0, 4],
    [3, 5],
  ]);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="flex items-center justify-center h-[100vh] select-none">
      <div>
        <div className="flex justify-end p-1 gap-1">
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
        <div
          className="flex flex-col border-8 border-[groove] border-gray-500"
          onMouseDown={() => setIsClicked(true)}
          onMouseUp={() => setIsClicked(false)}
        >
          {makeGrid(...grid).map((row, i) => (
            <div key={i} className="flex">
              {row.map((_, j) => {
                const isStart = start[0] === i && start[1] === j;
                const isEnd = end[0] === i && end[1] === j;
                const isObstacle = !!obstacles.find(
                  (obs) => obs[0] === i && obs[1] === j
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
                    className={`inline-flex items-center justify-center w-12 h-12 ${
                      isOccupied
                        ? "cursor-default " +
                          (isStart || isEnd ? "bg-gray-900" : "bg-orange-600")
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
                    {isStart
                      ? "Start"
                      : isEnd
                      ? "End"
                      : isObstacle
                      ? "XX"
                      : `${i * grid[1] + j + 1}`}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
