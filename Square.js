/* eslint-disable complexity */
/* eslint-disable max-statements */

/*
merge two strings together using the folling conditions:
1) add the letter with the least amount of occuranses first
example: 'dce' 'cccdb' here d will be added bc its occurance is 1 in its string and c is 3 in its sting;

2) if num of occurances are equal compare in alpha order aka comapare char codes;
exaple: 'super' 'tower' here s will go first bc it comes before t in the aplhabet, and so on..

3) if the occurances and letters are the same S1 will always go first by default;
*/

function mergeStrings(s1, s2) {
    let dictS1 = {};
    let dictS2 = {};
    let result = '';

    for (let letter of s1) {
        if (dictS1[letter]) {
            dictS1[letter]++;
        } else {
            dictS1[letter] = 1;
        }
    }

    for (let letter of s2) {
        if (dictS2[letter]) {
            dictS2[letter]++;
        } else {
            dictS2[letter] = 1;
        }
    }

    let pointerS1 = 0;
    let pointerS2 = 0;

    while (s1[pointerS1] || s2[pointerS2]) {
        let currLetterS1 = s1[pointerS1];
        let currLetterS2 = s2[pointerS2];

        if (!s1[pointerS1]) {
            result += currLetterS2;
            pointerS2++;
        } else if (!s2[pointerS2]) {
            result += currLetterS1;
            pointerS1++;
        } else if (dictS1[currLetterS1] < dictS2[currLetterS2]) {
            result += currLetterS1;
            pointerS1++;
        } else if (dictS1[currLetterS1] > dictS2[currLetterS2]) {
            result += currLetterS2;
            pointerS2++;
        } else if (s1.charCodeAt(pointerS1) < s2.charCodeAt(pointerS2)) {
            result += currLetterS1;
            pointerS1++;
        } else if (s1.charCodeAt(pointerS1) > s2.charCodeAt(pointerS2)) {
            result += currLetterS2;
            pointerS2++;
        } else {
            result += currLetterS1;
            pointerS1++;
        }
    }

    return result;
}

const test1 = 'dce';
// const test2 = 'cccbd';
// console.log(mergeStrings(test1, test2)) // 'dcecccbd'

// let test3 = 'super';
// let test4 = 'tower';
// console.log(mergeStrings(test3, test4)) // 'stouperwer'


/*
Given an array of positive integers a, your task is to calculate the sum of every possible a[i] ∘ a[j], where a[i] ∘ a[j] is the concatenation of the string representations of a[i] and a[j] respectively.

Example

For a = [10, 2], the output should be concatenationsSum(a) = 1344.

a[0] ∘ a[0] = 10 ∘ 10 = 1010,
a[0] ∘ a[1] = 10 ∘ 2 = 102,
a[1] ∘ a[0] = 2 ∘ 10 = 210,
a[1] ∘ a[1] = 2 ∘ 2 = 22.
So the sum is equal to 1010 + 102 + 210 + 22 = 1344.

For a = [8], the output should be concatenationsSum(a) = 88.

There is only one number in a, and a[0] ∘ a[0] = 8 ∘ 8 = 88, so the answer is 88.

For a = [1, 2, 3], the output should be concatenationsSum(a) = 198.

a[0] ∘ a[0] = 1 ∘ 1 = 11,
a[0] ∘ a[1] = 1 ∘ 2 = 12,
a[0] ∘ a[2] = 1 ∘ 3 = 13,
a[1] ∘ a[0] = 2 ∘ 1 = 21,
a[1] ∘ a[1] = 2 ∘ 2 = 22,
a[1] ∘ a[2] = 2 ∘ 3 = 23,
a[2] ∘ a[0] = 3 ∘ 1 = 31,
a[2] ∘ a[1] = 3 ∘ 2 = 32,
a[2] ∘ a[2] = 3 ∘ 3 = 33.
The total result is 11 + 12 + 13 + 21 + 22 + 23 + 31 + 32 + 33 = 198.
*/


const concatenationsSum = (a) => {
    let result = [];

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length; j++) {
            let subconcat = `${String(a[i])}`;
            subconcat += `${String(a[j])}`;
            result.push(subconcat);
        }
    }
    // number the whole reduce incase it is a single number
    return Number(result.reduce((strNum1, strNum2) => Number(strNum1) + Number(strNum2)));
}

// console.log(concatenationsSum([10, 2])) // 1344
// console.log(concatenationsSum([8])) // 88
// console.log(concatenationsSum([1, 2, 3])) // 198


/*
apply gravity to a grid after a 90 deg roation;
restrictions:  - movable pieces are '*'
               - non-movable pieces are '#'
               - empty spaces are ''
               - a movable piece can only drop if empty spaces are avail
               - if a non-movable piece is in the way a movable one can not drop past it

input: [
    ['*', '', ''],
    ['*', '#', ''],
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
]

outPut: [
    ['', '', '', '*', ''],
    ['', '', '', '#', ''],
    ['', '', '', '', '*'],
]
*/

const rotateAndApplyGrav = (grid) => {
    let rotatedGrid = new Array(grid[0].length).fill(null).map(() => new Array(grid.length));
    let rotatedCol = rotatedGrid[0].length - 1;
    // fill in our rotated grid in the right order;
    for (let i = 0; i < grid.length; i++) {
        let row = grid[i];
        for (let j = 0; j < row.length; j++) {
            rotatedGrid[j][rotatedCol] = grid[i][j];
        }
        rotatedCol--;
    }

    // apply gravity to our newly rotated grid;
    for (let i = 0; i < rotatedGrid[0].length; i++) {
        let start = rotatedGrid.length - 1;
        let end = rotatedGrid.length - 2;
        // Scans from the bottom of the grid up, swapping '' with the first '*' element that occurs above it
        while (end >= 0) {
            if (rotatedGrid[start][i] === '' && rotatedGrid[end][i] === '*') {
                let temp = rotatedGrid[start][i];
                rotatedGrid[start][i] = rotatedGrid[end][i];
                rotatedGrid[end][i] = temp;
                start--;
            } else if (rotatedGrid[start][i] !== '') {
                start--;
            } else if (rotatedGrid[end][i] === '#') {
                start = end - 1;
                end -= 2;
            } else {
                end--;
            }
        }
    }
    return rotatedGrid;
}

let input = [
    ['*', '', ''],
    ['*', '#', ''],
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
]

// console.log(rotateAndApplyGrav(input));

// let twice = rotateAndApplyGrav(input);
// console.log(rotateAndApplyGrav(twice));

// let thrice = rotateAndApplyGrav(twice);
// console.log(rotateAndApplyGrav(thrice));


/*
You've created a new programming language, and now you've decided to add hashmap support to it. Actually you are quite disappointed that in common programming languages it's impossible to add a number to all hashmap keys, or all its values. So you've decided to take matters into your own hands and implement your own hashmap in your new language that has the following operations:

insert x y - insert an object with key x and value y.
get x - return the value of an object with key x.
addToKey x - add x to all keys in map.
addToValue y - add y to all values in map.
To test out your new hashmap, you have a list of queries in the form of two arrays: queryTypes contains the names of the methods to be called (eg: insert, get, etc), and queries contains the arguments for those methods (the x and y values).

Your task is to implement this hashmap, apply the given queries, and to find the sum of all the results for get operations.

Example

For queryType = ["insert", "insert", "addToValue", "addToKey", "get"] and query = [[1, 2], [2, 3], [2], [1], [3]], the output should be hashMap(queryType, query) = 5.

The hashmap looks like this after each query:

1 query: {1: 2}
2 query: {1: 2, 2: 3}
3 query: {1: 4, 2: 5}
4 query: {2: 4, 3: 5}
5 query: answer is 5
The result of the last get query for 3 is 5 in the resulting hashmap.


*/

function hashMap(queryType, query) {
    let myMap = [];

    for (let i = 0; i < queryType.length; i++) {
        let currQtype = queryType[i];
        let currQ = query[i];
        console.log(myMap);
        if (currQtype === 'insert') {
            myMap[currQ[0]] = currQ[1];
        } else if (currQtype === 'addToValue') {
            for (let j = 0; j < myMap.length; j++) {
                let elem = myMap[j];
                if (typeof elem === 'number') {
                    myMap[j] += currQ[0]
                }
            }
        } else if (currQtype === 'addToKey') {
            let add = new Array(currQ[0]);
            myMap = add.concat(myMap);
        } else if (currQtype === 'get') {
            return myMap[currQ[0]];
        }
    }
}

let testQ1 = ['insert', 'insert', 'addToValue', 'addToKey', 'get'];
let testQ2 = [[1, 2], [2, 3], [2], [1], [3]];

console.log(hashMap(testQ1, testQ2))
