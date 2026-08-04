type A = {
    id: string;
};

type B = {
    id: number;
};

type C = A & B; // intersection, conflict in intersection
// this type would be never.. string cannot be assigned to never
/*const a : C  = {
    id: "10"
}*/

type D =  A | B;
// id can be string or number
const e = {
    id: 10
}


type A1 = {
    name: string;
};

type B1 = {
    age: number;
};

type C1 = A1 | B1; // UNION

const c1: C1 = { name: "Prabhakar" };
const c2: C1 = { age: 35 };
const c3: C1 = { name: "Prabhakar", age: 35 }; // this is also valid

type D1 = A1 & B1; // intersection, both should exist

const d4: D1= {
    name: "Prabhakar",
    age: 35
};