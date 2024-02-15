export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number
): number[] | null {
    const path:number[] = []
    const seen = new Set<number>()
    dfs(graph, source, needle, seen, path)
    return path.length === 0 ? null : path

    function dfs(
        graph: WeightedAdjacencyList,
        curr: number,
        needle: number,
        seen: Set<number>,
        path: number[]
    ): boolean {
        if (seen.has(curr)) return false
        
        seen.add(curr)
        path.push(curr)
        if (curr === needle) return true

        const graphEdges = graph[curr]
        for (let node = 0; node < graphEdges.length; node++) {
            const { to, weight } = graphEdges[node]
            if (weight === 0) continue
            if (seen.has(to)) continue
            if (dfs(graph, to, needle, seen, path))
                return true
        }

        path.pop()
        return false
    }
}