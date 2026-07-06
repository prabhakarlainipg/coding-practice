

const lastOccurrence = (a:number[], target: number) => {

    let left=0;
    let right=a.length-1;
    let answer=-1;
    while(left<right){

        let mid=Math.floor((left+right)/2);
        if(a[mid]==target){
            answer=mid;
            left=mid+1;
        }
        else if(a[mid]<target){
            left=left+1;
        }else right=right-1;
    }
    return answer;
}

console.log(lastOccurrence([1, 2, 2, 2, 3], 2)); // 3