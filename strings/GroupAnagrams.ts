

const groupAnagrams = (data: string[]) => {
    let map = new Map<string, string[]>();

    for (let i = 0; i < data.length; i++) {
        let sortedString = data[i].split('').sort().join('');
        if(map.has(sortedString)){
            map.get(sortedString)?.push(data[i]);
        }else{
            map.set(sortedString, [data[i]]);
        }
    }

    for(let key of map.keys()){
        console.log(key);
        console.log(map.get(key));
    }
    for(let value of map.values()){
        console.log(value);
    }
    return Array.from(map.values());


}


console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));