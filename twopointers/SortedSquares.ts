

const sortedSquares = (ar: number[]) => {
let result: number[] = [];
let left= 0;
let right= ar.length-1;
let position=ar.length-1;
while(left <= right){
    let leftSqare = ar[left]*ar[left];
    let rightSqare = ar[right]*ar[right];
    if(leftSqare > rightSqare){
result[position] = leftSqare;
position--;
left++
    }
    else{
        result[position] = rightSqare;
        position--;
        right--
    }
}
    return result;
}

console.log(sortedSquares([-4, -1, 0, 3, 10]));
