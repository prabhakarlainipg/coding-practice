
const nextGreaterElement = (arr: Array<number>) => {
    let result : number[]= new Array(arr.length).fill(-1);
    let stack : number[] = [];
    for(let i = 0; i < arr.length; i++) {

        while(stack.length > 0 &&
            arr[i]> arr[stack[stack.length-1]]) {
            let indexWaitingForGreaterElement = stack.pop();
            // @ts-ignore
            result[indexWaitingForGreaterElement] = arr[i];
        }
        stack.push(i);
    }

    return result;
}


console.log(nextGreaterElement([2, 1, 2, 4, 3]));
