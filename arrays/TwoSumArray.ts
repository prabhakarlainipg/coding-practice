const array = [1, 2, 3, 4, 5];
const target = 7;
//Because const functions are not hoisted like normal function declarations.
const findIndicesOfNumbersSumEqualToTarget = (array :number[], target : number) => {
    const map = new Map();
    const resultArray = [];
    for(let i = 0; i < array.length; i++) {
        let needed = target - array[i];
        if(map.has(needed)) {
            resultArray.push([map.get(needed), i]);
        }
        map.set(array[i], i);
    }
    return resultArray.length!=0? resultArray :[];
}

const result  =  findIndicesOfNumbersSumEqualToTarget(array, target);
console.log(result);

