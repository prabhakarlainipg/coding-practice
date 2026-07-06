
const shipWithinDays = (w:number[], targetDays: number) => {

    let left = Math.max(...w);
    let right = w.reduce((a, b) => a + b, 0);

    let answer =  right;
    while(left <= right) {

        let capacity =  Math.floor((left+left)/2);

        let neededDays=1;
        let currentLoad = 0;

        for( let weight of w){
            if( currentLoad + weight > capacity){
                neededDays++;
                currentLoad =0;
            }
            currentLoad += weight;
        }

        if(neededDays <= targetDays){
            answer = capacity;
            right=capacity-1;
        }else{
            left=capacity+1;
        }
    }
    return answer;
}



console.log(shipWithinDays([1,2,3,4,5,6,7,8,9,10], 5)); // 15