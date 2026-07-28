/* function User (name) {
    this.name =  name;
};

const user  = new User("Prabhakar");
console.log(user.name); // Prabhakar*/
/*console.log(user.toString()); // [object Object]
console.log(Object.getPrototypeOf(user));
console.log(Object.getPrototypeOf(user) === Object.prototype);*/

//.prototype exists on functions/classes.
// Object instances use [[Prototype]], accessible by Object.getPrototypeOf(obj).
/*User.prototype.role='Developer';
 console.log(user.role);

console.log(user.hasOwnProperty("role"));

console.log(Object.getOwnPropertyNames(user))*/


 const city = {
    name : "Hyderabad"
 }
//cityObject inherits from city.
 const cityObject= Object.create(city);
console.log(Object.getPrototypeOf(cityObject) === city);
 cityObject.state = "Telangana";
console.log(cityObject.hasOwnProperty("name"));
console.log(cityObject.name)
console.log(cityObject.state)
console.log(cityObject)
console.log(Object.getPrototypeOf(cityObject));
console.log(Object.getPrototypeOf(city));


const commonUserDetails = {
    role: "Developer"
};

const user2 = {
    name: "Prabhakar"
};

Object.setPrototypeOf(user2, commonUserDetails);

console.log(user2.name); // Prabhakar
console.log(user2.role); // Developer

