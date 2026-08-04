/*
type for component props
interface for domain models/entities*/

//Use interface for object shapes that may be extended.
// Use type for unions, primitives, tuples, function aliases, and complex type combinations.

interface Person {
    name: string;
}
type ButtonType = 'primary' | 'secondary' | 'danger';

type ButtonProps = {
    label: string;
    variant: ButtonType;
    onClick: () => void;
};

//tuple
type Point = [number, number];

const location: Point = [10, 20];
console.log(location);





interface User {
    name: string;
}

interface User {
    age: number;
}

//interfaces can be reopened and merged
const user: User = {
    name: "Prabhakar",
    age: 35
};

console.log(user);

//Type Extends Using Intersection

type Man = {
    name: string;
};

type Employee = Man & {
    employeeId: number;
};

const emp: Employee = {
    name: "Prabhakar",
    employeeId: 101
};
//Interface Extends Interface
interface Person2 {
    name: string;
}

interface Employee2 extends Person2 {
    employeeId: number;
}

const emp2: Employee2 = {
    name: "Prabhakar",
    employeeId: 101
};
console.log(emp2);

console.log(emp);

export {};

