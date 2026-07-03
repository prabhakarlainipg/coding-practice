const containsDuplicate = (a: number[]) =>{
    let set = new Set(a);
    return set.size != a.length
}

console.log(containsDuplicate([1, 2, 3, 5])); // true

