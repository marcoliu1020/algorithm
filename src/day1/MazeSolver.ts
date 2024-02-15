export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    const path: Point[] = []

    const seen: boolean[][] = []
    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false))
    }

    walk(maze, wall, start, end, seen, path)

    return path
}

const DIRECTIONS = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
]

// recursion
function walk(maze: string[], wall: string, curr: Point, end: Point, seen: boolean[][], path: Point[]): boolean {
    // Base Case
    // off the map
    if (curr.x < 0 || curr.x >= maze[0].length ||
        curr.y < 0 || curr.y >= maze.length
    ) {
        return false
    }
    // on the wall
    if (maze[curr.y][curr.x] === wall) {
        return false
    }
    // have seen it
    if (seen[curr.y][curr.x]) {
        return false
    }
    // bingo
    if (curr.x === end.x && curr.y === end.y) {
        path.push({ x: curr.x, y: curr.y }) // final point
        return true
    }

    // Recurse
    path.push(curr)
    seen[curr.y][curr.x] = true
    for (const [x, y] of DIRECTIONS) {
        const nextPoint = {
            x: curr.x + x,
            y: curr.y + y
        }
        const isBingo = walk(maze, wall, nextPoint, end, seen, path)
        if (isBingo) return true
    }
    path.pop()

    return false
}