


const getAllSubArrays = (nums: number[]) => {
    let result : number[][] = [];
let set = new Set();
    const backtrack = (current : number[])=>{

        result.push([...current]);

        for(let num of nums){
            if(set.has(num)){
                continue;
            }
          set.add(num);
            current.push(num);
          backtrack(current);
          set.delete(num);
          current.pop();
        }
    }

    backtrack([]);

    return result;
}


console.log(getAllSubArrays([1,2,3]));