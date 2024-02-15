export default function pre_order_search(head: BinaryNode<number>): number[] {
    const res: number[] = []
    dfs(head)
    return res

    function dfs(node: BinaryNode<number> | null): void {
        if (!node) return;
        res.push(node.value)
        dfs(node.left)
        dfs(node.right)
    }
}