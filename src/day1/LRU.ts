type Node<T> = {
    value: T,
    prev?: Node<T>,
    next?: Node<T>,
}

export default class LRU<K, V> {
    private length: number;
    private head?: Node<V>;
    private tail?: Node<V>;

    private lookup: Map<K, Node<V>>;
    private reverseLookup: Map<Node<V>, K>

    constructor(private capacity: number = 10) {
        this.length = 0
        this.head = undefined
        this.tail = undefined
        this.lookup = new Map()
        this.reverseLookup = new Map()
    }

    update(key: K, value: V): void {
        // does it exist?
        let node = this.lookup.get(key)
        if (node) {
            this.detach(node)
            this.prepend(node)
            node.value = value
        } else {
            node = createNode(value)
            this.length++
            this.prepend(node)
            this.trimCache()
            this.lookup.set(key, node)
            this.reverseLookup.set(node, key)
        }
        
        // if it doesn't, we need to insert
        //      - check capacity and evict if over
        // if it does, we need to update to the front of the list
        // and update the value
    }

    get(key: K): V | undefined {
        // check the cache for existence
        const node = this.lookup.get(key)
        if (!node) return undefined

        // update the value we found and move it to the front
        this.detach(node)
        this.prepend(node)

        // return out the value found or undefined if not exist
        return node.value
    }

    private detach(node: Node<V>) {
        if (node.prev) node.prev.next = node.next
        if (node.next) node.next.prev = node.prev
        if (this.head === node) this.head = node.next
        if (this.tail === node) this.tail = node.prev
        node.prev = undefined
        node.next = undefined
    }

    private prepend(node: Node<V>) {
        if (!this.head) {
            this.head = this.tail = node
            return
        }

        node.next = this.head
        this.head.prev = node
        this.head = node
    }

    private trimCache(): void {
        if (this.length <= this.capacity) return

        const tail = this.tail as Node<V>
        this.detach(tail)
        const key = this.reverseLookup.get(tail) as K
        this.lookup.delete(key)
        this.reverseLookup.delete(tail)
        this.length--
    }
}

function createNode<T>(value: T): Node<T> {
    return { value }
}