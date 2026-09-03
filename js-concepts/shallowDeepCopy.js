
const user1 = {
    name : "prabhakar",
    location : {
        city : "Hyderabad"
    }
}

const user2 = {...user1}
user2.name="raju";
user2.location.city = "Bangalore";

console.log(user1.location.city);
console.log(user2.location.city);

const obj = {
    name: "Prabhakar",
    date: new Date(),
    value: undefined,
    /*sayHello: function () {
        console.log("Hello");
    }*/
};
console.log(obj);

//DEEP COPY USING JSON.parse(JSON.stringify))
//Date becomes string
// UNDEFINED removed
// FUNCTION removed
// MAP/SET not copied correctly
// Cannot handle circular references
const copy = JSON.parse(JSON.stringify(obj));
console.log(copy);


//DEEP COPY USING structuredClone
//Does not support FUNCTIONS.
const copy2  = structuredClone(obj);
console.log(copy2);

function deepCopy(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => deepCopy(item));
    }

    const copy = {};

    for (let key in obj) {
        copy[key] = deepCopy(obj[key]);
    }

    return copy;
}

const emp1 = {
    name: "Prabhakar",
    address: {
        city: "Hyderabad"
    }
};

const emp2 = deepCopy(emp1);

emp2.address.city = "Bangalore";

console.log(emp1.address.city); // Hyderabad