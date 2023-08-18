class Queue {
  constructor() {
    this.values = {};
    this.front = 0;
    this.rear = 0;
  }
  push(value) {
    this.values[this.rear] = value;
    this.rear++;
  }
  top() {
    return this.values[this.front];
  }
  pop() {
    const value = this.values[this.front];
    delete this.values[this.front];
    this.front++;
    return value;
  }
  size() {
    return this.rear - this.front;
  }
  empty() {
    return this.size() === 0;
  }
}

const dirs = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

let n, m;
const isValid = (i, j) => {
  return i >= 0 && i < n && j >= 0 && j < m;
};

export function shortestPath(grid, obstacles, start, end) {
  n = grid[0];
  m = grid[1];
  const newGrid = [];
  const parent = [];
  const visited = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (newGrid[i]) {
        newGrid[i][j] = 1;
        parent[i][j] = [-1, -1];
        visited[i][j] = false;
      } else {
        newGrid[i] = [1];
        parent[i] = [[-1, -1]];
        visited[i] = [false];
      }
    }
  }

  for (const [i, j] of obstacles) {
    newGrid[i][j] = 0;
  }

  const q = new Queue();
  q.push(start);

  while (!q.empty()) {
    const [ui, uj] = q.pop();

    visited[ui][uj] = true;

    for (const [di, dj] of dirs) {
      const [vi, vj] = [di + ui, dj + uj];
      if (isValid(vi, vj) && !visited[vi][vj] && newGrid[vi][vj] !== 0) {
        q.push([vi, vj]);
        parent[vi][vj] = [ui, uj];
      }
    }
  }

  const path = [];
  let curr = end;
  while (isValid(curr[0], curr[1])) {
    path.push(curr);
    curr = parent[curr[0]][curr[1]];
  }

  return path.reverse();
}
