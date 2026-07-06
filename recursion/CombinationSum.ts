

const combinationSum = (nums: number[], target: number) => {

    let result:number[][]=[];

    const backtrack = (start : number, current : number[], sum:number) => {

        if(sum==target){
            result.push([...current]);
            return;
        }
        if(sum > target){
            return;
        }
        for(let i = start; i < nums.length; i++){
            current.push(nums[i]);
            backtrack(i, current, sum+nums[i]);
            current.pop();
        }
    }
    backtrack(0,[],0);

    return result;


}

console.log(combinationSum([2, 3, 6, 7], 7));