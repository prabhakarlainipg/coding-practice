

const totalFruits = (fruits: number[], basketSize: number)=>{

    let left=0;
    let maxFruits =0;
    const baskets = new Map();

    for(let right=0; right<fruits.length; right++){
        const fruit = fruits[right];
        baskets.set(fruit, (baskets.get(fruit)||0) +1);

        while(baskets.size>basketSize){
            const leftFruit = fruits[left];
            baskets.set(leftFruit, baskets.get(fruit) -1);
            if(baskets.get(leftFruit)==0){
                baskets.delete(leftFruit);
            }
            left++;
        }
        maxFruits = Math.max(maxFruits, right-left+1);
    }

    return maxFruits;
}


console.log(totalFruits([1, 2, 1, 2, 3], 2)); // 4
console.log(totalFruits([1, 2, 1, 2, 2,3], 2)); // 5