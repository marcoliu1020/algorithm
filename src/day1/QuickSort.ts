export default function quick_sort(arr: number[]): void {
    const mid = Math.floor(arr.length / 2) as number
    [arr[arr.length - 1], arr[mid]] = [arr[mid], arr[arr.length - 1]]
    qs(arr, 0, arr.length - 1)
}

function qs(arr: number[], lo: number, hi: number): void {
    if (lo >= hi) return
    const mid = partition(arr, lo, hi)
    qs(arr, lo, mid - 1)
    qs(arr, mid + 1, hi)
}

function partition(arr: number[], lo: number, hi: number): number {
    const piviot = arr[hi]
    let idx = lo

    for (let i = lo; i < hi; i++) {
        if (arr[i] < piviot) {
            [arr[i], arr[idx]] = [arr[idx], arr[i]]
            idx++
        }
    }

    [arr[idx], arr[hi]] = [arr[hi], arr[idx]]

    return idx
}
