
/*0 should go to left.
2 should go to right.
1 stays in middle.*/
const sortColors = (ar:number[]) => {

    let low=0;
    let mid=0;
    let high= ar.length-1;

    while(mid<=high){
        if(ar[mid]==0){
            [ar[low],ar[mid]] = [ar[mid],ar[low]];
            low++;
            mid++;
        }
        else if(ar[mid]==1){
            mid++;
        }
        else{
            [ar[mid],ar[high]] = [ar[high],ar[mid]];
            high--;
        }
    }

    return ar;

}


console.log(sortColors([2, 0, 2, 1, 1, 0]));
