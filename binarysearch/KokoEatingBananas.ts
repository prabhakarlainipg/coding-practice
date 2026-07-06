

const minEatingSpeed = (piles:number[], targetHours:number) =>{

    let left=1;
    let right= Math.max(...piles);

    let answer = right;
// O(n log m)
    while(left<=right){ //O(log m) - largest pile
        let speed = Math.floor((right+left)/2);
        let hours = 0;
        for(let pile of piles){ //O(n) - number of piles
            hours += Math.ceil(pile/speed);
        }
        if(hours<=targetHours){
            answer = speed;
            right= speed-1;
        }else{
            left= speed+1;
        }
    }

    return answer;
}

console.log(minEatingSpeed([3, 6, 7, 11], 8)); // 4