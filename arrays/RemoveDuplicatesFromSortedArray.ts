
const removeDuplicatesFromSortedArray = (ar: number[])=>{
    let position=1;
    for (let i = 1; i < ar.length; i++) {
        if(ar[i]!=ar[i-1]){
            ar[position] = ar[i];
            position++;
        }
    }
    console.log(ar);
    return ar.slice(0,position);

}

console.log(removeDuplicatesFromSortedArray([1,1,2,2,3,4,4,4,5]));