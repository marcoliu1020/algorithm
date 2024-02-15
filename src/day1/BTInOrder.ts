export default function in_order_search(head: BinaryNode<number>): number[] {
    const res: number[] = []
    dfs(head)
    return res

    function dfs(node: BinaryNode<number> | null): void {
        if (!node) return;
        dfs(node.left)
        res.push(node.value)
        dfs(node.right)
    }
}