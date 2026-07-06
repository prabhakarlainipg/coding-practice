




const subsets = (nums: number[]) => {
    let result:number[][] = [];

    const backtrack =(start : number, current : number[]) => {
        result.push([...current]);
        for(let i=start; i<nums.length;i++){
            current.push(nums[i]);
            backtrack(i+1, current);
            current.pop();
        }
    }

    backtrack(0,[])
    return result;

}


console.log(subsets([1, 2, 3]));