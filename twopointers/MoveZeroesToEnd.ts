const numbers = [0,1,0,3,12];
const moveZerosToEnd = (array : number[]) => {
    let write=0;
    for (let read = 0; read < array.length; read++) {
        if(array[read] !== 0){
            array[write] = array[read];
            write++;
        }
    }
    for (let i = write; i < array.length; i++) {
        array[i] = 0;
    }
    return array;
}
console.log(moveZerosToEnd(numbers));
