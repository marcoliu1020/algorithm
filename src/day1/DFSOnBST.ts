export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    return deepSearch(head, needle)

    function deepSearch(node: BinaryNode<number> | null, needle: number): boolean {
        if (!node) return false
        if (node.value === needle) return true
        if (node.value < needle) return deepSearch(node.right, needle)
        return deepSearch(node.left, needle)
    }
}