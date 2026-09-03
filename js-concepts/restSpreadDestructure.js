
// Rest collects multiple values into one array or object. COLLECTS
// Spread expands an array, iterable or object into individual values. EXPANDS
// Destructuring extracts values from arrays or objects. EXTRACTS
const numbers = [10];

//default values
const [first, second = 20] = numbers;

console.log(first);  // 10
console.log(second); // 20


const [a = 10] = [undefined];
console.log(a); // 10

//null is an intentional value, so the default is not used.
const [b = 10] = [null];
console.log(b); // null

let x = "A";
let y = "B";

//array destructuring
[y, x] = [x, y];

console.log(x);  // B
console.log(y); // A


const user = {
    name: "Alice",
};

//Rename variable after object destructure
const { name: myName } = user;

console.log(myName); // Alice


//Nested Destructure
const user2 = {
    name: "Pk",
    address: {
        city: "Bengaluru",
        country: "India",
    },
};

const {
    name,
   address : {city}
} = user2;
console.log(name);
console.log(city); // Bengaluru


function introduce(greeting, ...names) {
    console.log(greeting);
    console.log(names);
}

introduce("Hello", "Alice", "Bob");

// greeting: "Hello"
// names: ["Alice", "Bob"]


const nums = [10, 20, 30];

console.log(...nums);
// Equivalent to:
console.log(10, 20, 30);

//Math.max expects separate arguments, not an array.
console.log(Math.max(...nums));


const u = {
    name: "Alice",
    age: 30,
};

//Order matters. Later properties overwrite earlier properties:
const uu = {
    ...user,
    age: 31,
};

console.log(uu);
// { name: "Alice", age: 31 }

//Strings are iterable:
const letters = [..."React"];

console.log(letters);
// ["R", "e", "a", "c", "t"]
