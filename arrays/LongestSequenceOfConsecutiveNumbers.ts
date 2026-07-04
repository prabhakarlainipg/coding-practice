
//O(nlogn)
const longestConsecutive = (a:number[])=>{
    let longest =0;
    let sortedArray = a.sort((a, b) => a - b); //O(n logn)
    for(let i = 0; i<sortedArray.length-1; i++){  //O(n)
        let maxLength=1;
        while(sortedArray[i] == (sortedArray[i+1]-1)){
            maxLength++;
            i++;
        }
        longest=Math.max(maxLength,longest);
    }
    return longest;

}


//O(n) time complexity
const longestConsecutiveUsingSet = (a:number[])=>{

    const set = new Set(a); // O(n)
    let longest = 1;
    for(let i = 0; i<a.length;i++){ //O(n)
        if(!set.has(a[i]-1)){
            let streak =1;
            while(set.has(a[i]+1)){
                streak++;
                i++;
            }
            longest = Math.max(longest,streak);
        }
    }
    return longest;

}

console.log(longestConsecutiveUsingSet([100, 4, 200, 1, 3, 2])); // 4


console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // 4