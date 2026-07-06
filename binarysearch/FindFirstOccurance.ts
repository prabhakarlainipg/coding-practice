

const firstOccurrence = (a:number[], target: number) => {

    let left:number=0;
    let right:number=a.length-1;
    let answer =-1;
    while(left<right){
        let mid= Math.floor((left+right)/2);
        if(a[mid]==target){
            answer=mid;
            right=mid-1;
        }
        else if(a[mid]<target){
            left=left+1
        }else{
            right=mid-1;
        }
    }
    return left;
}

console.log(firstOccurrence([1, 2, 2, 2, 3], 2)); // 1