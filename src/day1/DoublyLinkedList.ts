type Node<T> = {
    value: T,
    prev?: Node<T>,
    next?: Node<T>,
}

export default class DoublyLinkedList<T> {
    public length: number;
    private head: Node<T> | undefined
    private tail: Node<T> | undefined

    constructor() {
        this.length = 0
        this.head = undefined
        this.tail = undefined
    }

    prepend(item: T): void {
        const newNode = { value: item } as Node<T>
        this.length++

        if (!this.head) {
            this.head = this.tail = newNode
            return
        }

        newNode.next = this.head
        this.head.prev = newNode
        this.head = newNode
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) throw new Error('idx out of range')
        if (idx === 0) return this.prepend(item)
        if (idx === this.length) return this.append(item)

        const curr = this.getNode(idx) as Node<T>
        const newNode: Node<T> = { value: item }
        this.length++

        newNode.next = curr
        newNode.prev = curr.prev

        curr.prev = newNode
        if (newNode.prev) newNode.prev.next = newNode
    }

    append(item: T): void {
        const newNode: Node<T> = { value: item }
        this.length++

        if (!this.tail) {
            this.head = this.tail = newNode
            return
        }

        this.tail.next = newNode
        newNode.prev = this.tail
        this.tail = newNode
    }

    remove(item: T): T | undefined {
        let curr = this.head

        while (curr) {
            if (curr.value === item) break
            curr = curr.next
        }

        if (!curr) return undefined
        return this.removeNode(curr)?.value
    }

    removeAt(idx: number): T | undefined {
        const node = this.getNode(idx)

        if (!node) return undefined
        return this.removeNode(node)?.value
    }

    private removeNode(node: Node<T>): Node<T> | undefined {
        this.length--
        if (node.prev) node.prev.next = node.next
        if (node.next) node.next.prev = node.prev
        if (node === this.head) this.head = node.next
        if (node === this.tail) this.tail = node.prev

        // free
        node.prev = node.next = undefined

        return node
    }

    get(idx: number): T | undefined {
        const node = this.getNode(idx)
        return node?.value
    }

    private getNode(idx: number): Node<T> | undefined {
        if (idx >= this.length) return undefined

        let curr = this.head
        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next
        }

        return curr
    }
}