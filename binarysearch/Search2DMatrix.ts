


const searchMatrix = (a:number[][], target:number) => {
let left=0;
let rows = a.length;
let cols = a[0].length;
let right = rows * cols -1;
while(left<=right){
    let mid = Math.floor((left+right)/2);
    let rowNum = Math.floor(mid/cols);
    let colNum = mid%cols;

    let value = a[rowNum][colNum];

    if(value==target){ return true;}
    else if(value<target){
        left=mid+1;
    }else right=mid-1;
}
    return false;
}

console.log(searchMatrix(
    [
        [1, 3, 5, 7],
        [10, 11, 16, 20],
        [23, 30, 34, 60]
    ],
    34
)); //true

console.log(searchMatrix(
    [
        [1, 3, 5, 7],
        [10, 11, 16, 20],
        [23, 30, 34, 60]
    ],
    2
)); //false