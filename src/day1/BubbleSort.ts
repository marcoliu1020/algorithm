// [3, 1, 7, 4, 2] - origin
// [1, 3, 4, 2, | 7] - step 1, N
// [1, 3, 2, | 4, 7] - step 2, N-1
// [1, 2, | 3, 4, 7] - step 3, N-2
// [1, | 2, 3, 4, 7] - step 3, N-3
//     | 分隔線，後面的不用比了      

// O(N^2)
export default function bubble_sort(arr: number[]): void {
    for (let n = arr.length; n > 1; n--) {
        for (let j = 1; j < n; j++) {
            if (arr[j - 1] > arr[j]) {
                [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
            }
        }
    }
}