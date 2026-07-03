const numbers = [0,1,0,3,12];
const moveZerosToEnd = (array : number[]) => {
    let position=0;
    for (let i = 0; i < array.length; i++) {
        if(array[i] !== 0){
            array[position] = array[i];
            position++;
        }
    }
    for (let i = position; i < array.length; i++) {
        array[i] = 0;
    }
    return array;
}
console.log(moveZerosToEnd(numbers));
