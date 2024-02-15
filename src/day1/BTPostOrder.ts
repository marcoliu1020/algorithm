export default function post_order_search(head: BinaryNode<number>): number[] {
    const res: number[] = []
    dfs(head)
    return res

    function dfs(node: BinaryNode<number> | null): void {
        if (!node) return;
        dfs(node.left)
        dfs(node.right)
        res.push(node.value)
    }
}