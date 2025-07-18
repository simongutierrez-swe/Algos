// Find a position where n is less than both nums to the right and left
// approach do a BFS and look at two things at the same time

function findValidNum(arr) {
    let start = Math.floor((arr.length - 1) / 2);
    let queue = [start];

    while (queue.length) {
        let currIdx = queue.shift();

        if (arr[currIdx] < arr[currIdx + 1] && arr[currIdx] < arr[currIdx - 1]) return currIdx;

        if (arr[currIdx - 2]) queue.push(currIdx - 2);
        if (arr[currIdx + 2]) queue.push(currIdx + 2);
    }

    return -1;
}