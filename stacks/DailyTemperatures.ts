


/*I use a monotonic decreasing stack of indexes.
    Each index in the stack is waiting for a warmer future
temperature. When the current temperature is greater than
the temperature at the top index of the stack,
    the current day is the answer for that previous day.*/

/*Time complexity: O(n)
Space complexity: O(n)*/
const dailyTemperatures = (data:number[]) => {
    let result:Array<number> = new Array(data.length).fill(0);
let stack : number[]=[];
for(let i=0;i<data.length;i++){
    while(stack.length>0 &&
        data[i]>data[stack[stack.length-1]]){
        // @ts-ignore
        let index:number = stack.pop();
        result[index] = i-index;
    }
    stack.push(i);
    }
    return result;

}


console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
