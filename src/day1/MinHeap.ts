export default class MinHeap {
    public length: number;
    private data: number[]
    private compare: (a: number, b: number) => boolean

    constructor() {
        this.length = 0
        this.data = []
        this.compare = (x: number, y: number) => this.data[x] < this.data[y]
    }

    insert(value: number): void {
        this.data[this.length] = value
        this.heapifyUp(this.length)
        this.length++
    }

    delete(): number {
        if (this.length === 0) return -1

        const top = this.data[0]
        this.swap(0, this.length - 1) // swap first and last
        this.data.pop()
        this.length--
        this.heapifyDown(0)

        return top
    }

    private heapifyUp(idx: number): void {
        if (idx === 0) return

        const parent = this.parent(idx)
        const isGoUp = this.compare(idx, parent)

        if (isGoUp) {
            this.swap(idx, parent)
            this.heapifyUp(parent)
        }
    }

    private heapifyDown(idx: number): void {
        const N = this.length
        if (idx >= N) return

        let winner = idx

        const leftIdx = this.leftChild(idx)
        if (leftIdx < N && this.compare(leftIdx, winner)) winner = leftIdx

        const rightIdx = this.rightChild(idx)
        if (rightIdx < N && this.compare(rightIdx, winner)) winner = rightIdx

        if (winner === idx) return

        this.swap(winner, idx)
        this.heapifyDown(winner)
    }

    swap(x: number, y: number): void {
        [this.data[x], this.data[y]] = [this.data[y], this.data[x]]
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2)
    }

    private leftChild(idx: number): number {
        return idx * 2 + 1
    }

    private rightChild(idx: number): number {
        return idx * 2 + 2
    }
}