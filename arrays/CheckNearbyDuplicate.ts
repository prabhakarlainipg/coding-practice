
const containsNearbyDuplicate = (a: number[], k:number)=>{
    const lastIndexes =  new Map();
    for(let i=0; i<a.length; i++){
        if(lastIndexes.has(a[i])){
            if(i-lastIndexes.get(a[i])<=k) return true;
        }
        lastIndexes.set(a[i],i);
    }
    return false
}





console.log(containsNearbyDuplicate([1, 2, 3, 1], 3)); // true
console.log(containsNearbyDuplicate([1, 2, 3, 1], 2)); // false
console.log(containsNearbyDuplicate([1, 0, 1, 1], 1)); // true