export default function bs_list(haystack: number[], needle: number): boolean {
    let [left, right] = [0, haystack.length - 1]

    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        const value = haystack[mid]

        if (needle < value)
            right = mid - 1
        else if (needle > value)
            left = mid + 1
        else
            return true
    }

    return false
}