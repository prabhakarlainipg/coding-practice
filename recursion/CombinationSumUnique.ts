


const combinationSumUnique  = (nums:number[], target: number)       =>{
    let result : number[][] = [];
    nums.sort((a, b) => a - b);

    const backtrack = (index: number, current:number[], sum: number) => {

        if(sum==target){
            result.push([...current]);
            return;
        }
        if(sum>target){
            return;
        }
        for(let i = index; i < nums.length; i++){
            if (i>index &&  nums[i] === nums[i - 1]) {
                continue;
            }
            current.push(nums[i]);
            backtrack(i+1, current, sum+nums[i]);
            current.pop();
        }
    }
    backtrack(0, [], 0);
    return result;
}


console.log(combinationSumUnique([10,1,2,7,6,1,5], 8));