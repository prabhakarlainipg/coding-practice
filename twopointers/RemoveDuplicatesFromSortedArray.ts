
/*read pointer scans every value.
    write pointer marks where next unique value should go.*/

const removeDuplicatesFromSorted= (ar:number[]) => {
    let write=1;

    for(let read=1;read<ar.length;read++){
        if(ar[read]!==ar[read-1]){
            ar[write]=ar[read];
            write++;
        }
    }
    return write;
}

const length = removeDuplicatesFromSorted([1, 1, 2, 2, 3]);

console.log(length);

export {};