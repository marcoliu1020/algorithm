type Node<T> = {
    value: T
    prev?: Node<T>
}

export default class Stack<T> {
    public length: number;
    private head: Node<T> | undefined


    constructor() {
        this.length = 0
        this.head = undefined
    }

    push(item: T): void {
        const node: Node<T> = { value: item }
        node.prev = this.head
        this.head = node
        this.length++
    }

    pop(): T | undefined {
        if (!this.head) return undefined

        this.length--
        const head = this.head
        this.head = this.head.prev

        // free
        head.prev = undefined

        return head.value
    }

    peek(): T | undefined {
        return this.head?.value
    }
}