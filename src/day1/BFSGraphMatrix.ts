export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number
): number[] | null {

    const q = [source]
    const seen = new Set<number>([source])
    const parent = new Map<number, number>([
        [source, -1], // -1 means no parent 
        [needle, -1]
    ])

    while (q.length) {
        const curr = q.shift() as number
        if (curr === needle) break

        const weights = graph[curr]
        for (let node = 0; node < weights.length; node++) {
            if (weights[node] === 0) continue
            if (seen.has(node)) continue
            parent.set(node, curr)
            seen.add(node)
            q.push(node)
        }
    }

    if (parent.get(needle) === -1) return null

    const path = []
    while (parent.has(needle)) {
        path.push(needle)
        needle = parent.get(needle) as number
    }

    return path.reverse()
}