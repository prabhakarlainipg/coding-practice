const majorityElement = (a : number[])=>{
    let map = new Map();
    for(let num of a){
        if(map.has(num)){
            map.set(num,map.get(num)+1);
            if(map.get(num)>a.length/2){
                return num;
            }
        }else{
            map.set(num,1);
        }
    }
    return null;
}

const majorityElementBoyerMooreVotingAlgorithm = (a : number[])=>{
    let candidate = null;
    let count = 0;
    for(let num of a){
        if(count == 0){
            candidate = num;
        }
        if(candidate==num){ count++;}
        else count--;
    }
    //till here gives the possible candidate

    let candidateCount = 0;

    //this pass confirms whether it's a truly majority
    for (const num of a) {
        if (num === candidate) {
            candidateCount++;
        }
    }

    if (candidateCount > a.length / 2) {
        return candidate;
    }

    return null;
}

console.log(majorityElement([2, 2, 1, 1, 1, 2, 5,2, 2]));
console.log(majorityElementBoyerMooreVotingAlgorithm([2, 2, 1, 1, 1, 2, 5, 2,2]));