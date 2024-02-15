// O(sqrt(N) + sqrt(N)) = O(sqrt(N))
export default function two_crystal_balls(breaks: boolean[]): number {
    const jump = Math.floor(
        Math.sqrt(breaks.length)
    )

    // O(sqrt(N))
    let floor = jump
    for (; floor < breaks.length; floor += jump) {
        if (breaks[floor])
            break
    }

    // O(sqrt(N))
    for (let i = floor - jump; i < breaks.length; i++) {
        if (breaks[i])
            return i
    }

    return -1
}