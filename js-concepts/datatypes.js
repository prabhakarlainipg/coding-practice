const ar = [1,2,3];

console.log(typeof ar); //object
console.log(Array.isArray(ar)); //true

console.log(typeof function () {}); //function

//When you copy a primitive, the value is copied independently:
//But When you assign an object to another variable,
// JavaScript copies the reference value. Both variables then identify the same object:

const firstUser = {
    name : 'Prabhakar'
}

const secondUser = firstUser;

secondUser.name = 'Ram';

console.log(firstUser);
console.log(secondUser);


//JavaScript always passes arguments by value.
function update(value) {
    value = 100;
}

let score = 10;
update(score);

console.log(score); //10

function update(user) {
    user.name = "Bob";
}

const person = {
    name: "Alice",
};

update(person);
//The function receives a copy of the reference.
// Both references identify the same object, so mutation is visible outside.
console.log(person.name); // Bob



function update(user) {
    user = {
        name: "Charlie",
    };
}

const person2 = {
    name: "Alice",
};

update(person2);


//Reassigning the local parameter does not change the caller’s variable.
console.log(person2.name); // Alice



//A primitive cannot be changed internally.

let message = "hello";

message[0] = "H";

console.log(message[0]);

console.log(message); // hello



console.log(typeof null); // "object"

let v = null;
console.log(v === null);



let user = {
    first : "John",
}

//React may skip the update because the state appears unchanged by identity.
const updateUser = () => {
    user.first = "Bob";
    return user;
};
let updatedUser = updateUser();

//The new reference helps React detect the update.
const updateUser2 = () => {
    return {
        ...user,
        first: "John",
    };
};

let updatedUser2 = updateUser2();





let a = 10;
let b = a;

b += 5;

console.log(a, b);
console.log(user == updatedUser);
console.log(user == updatedUser2);



//The spread creates a NEW top-level object. We will discuss its shallow-copy limitation later.

const x = { count: 1 };
const y = { ...x };

y.count += 1;

console.log(x.count, y.count);

