import { useState } from "react";

const makeGrid = (x, y) => Array(x).fill(Array(y).fill(0));
const selects = {
  start: "Start",
  end: "End",
};

export default function Home() {
  const [grid, setGrid] = useState(makeGrid(10, 15));
  const [start, setStart] = useState([0, 0]);
  const [end, setEnd] = useState([9, 14]);
  const [select, setSelect] = useState(selects.start);

  return (
    <div className="flex items-center justify-center h-[100vh]">
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
        </div>
        <div className="flex flex-col border-8 border-[groove] border-gray-500">
          {grid.map((row, i) => (
            <div key={i} className="flex">
              {row.map((_, j) => {
                const isStart = start[0] === i && start[1] === j;
                const isEnd = end[0] === i && end[1] === j;
                return (
                  <div
                    key={`${i}${j}`}
                    className={`inline-flex items-center justify-center w-12 h-12 ${
                      isStart || isEnd
                        ? "bg-gray-900 cursor-default"
                        : "bg-green-600 hover:bg-green-700 cursor-pointer"
                    } text-white`}
                    onClick={() => {
                      if (select === selects.start) setStart([i, j]);
                      else if (select === selects.end) setEnd([i, j]);
                    }}
                  >
                    {isStart ? "Start" : isEnd ? "End" : `(${i},${j})`}
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
