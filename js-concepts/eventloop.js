/*console.log(1);

setTimeout(() => console.log(2), 0);

console.log(3);

//sync -> micro tasks -> macro tasks
console.log("******");
console.log(1); //sync

setTimeout(() => console.log(2), 0); //macro task

Promise.resolve().then(() => console.log(3)); //micro task

console.log(4);*/ //sync code

/*console.log("******");
async function test() {
    console.log(1);
    await null;
    console.log(2);
}

test();
console.log(3);*/

/*console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve()
    .then(() => console.log("C"))
    .then(() => console.log("D"));

console.log("E");*/

//Both queueMicrotask and Promise.then are microtasks.
// They run in the order added.
console.log("A");

queueMicrotask(() => {
    console.log("B");
});

Promise.resolve().then(() => {
    console.log("C");
});

setTimeout(() => {
    console.log("D");
}, 0);

console.log("E");

