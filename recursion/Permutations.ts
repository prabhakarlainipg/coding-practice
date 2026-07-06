


const permutations = (nums:number[])=>{
    let result:number[][] = [];

    let set = new Set();
    const  backtrack = (current:number[])=>{
        if(current.length == nums.length){
            result.push([...current]);
            return;
        }
        for(let num of nums){
            if(set.has(num)){
                continue;
            }
            set.add(num);
            current.push(num);
            backtrack(current);
            current.pop();
            set.delete(num);
        }
    }
    backtrack([]);
    return result;
}


console.log(permutations([1,2,3]));