 /*const promise  = new Promise((resolve, reject) => {
     let a = Math.random();
     console.log(a); //Promise Constructor Runs Immediately
     if(a > 0.5){
         resolve("Success");
     }else  reject("Error");
 })

 promise.then((data) => {
     console.log(data);
 }).catch((err) => {
     console.log(err);
 })

 //Only First Resolve/Reject Counts
 //Once a Promise is settled, it cannot change.
 const p = new Promise((resolve, reject) => {
     resolve("First");
     resolve("Second");
     reject("Error");
 });

 p.then((data) => console.log(data))
     .catch((err) => console.log(err));

//Promise With API Call
 fetch("https://jsonplaceholder.typicode.com/users")
     .then((response) => response.json())
     .then((users) => {
         console.log(users);
     })
     .catch((error) => {
         console.log("API failed", error);
     });*/
//fetch rejects only on network errors.
 // For HTTP errors like 404 or 500, fetch still resolves.
/* fetch("https://jsonplaceholder.typicode.com/users2")
     .then((response) => {
         console.log(response.ok);
         if(!response.ok) throw new Error("Something went wrong!");
         return response.json();
     })
     .then((data) => console.log(data))
     .catch((error) => console.log(error));*/

 //then returns a new Promise
/* Promise.resolve(10)
     .then((value) => {
         console.log(value); // 10
         return value * 2;
     })
     .then((value) => {
         console.log(value); // 20
         return value * 3;
     })
     .then((value) => {
         console.log(value); // 60
     });*/

/* Promise.resolve(10)
     .then((value) => {
         return value * 2;
     })
     .then((value) => {
         throw new Error("Something failed");
     })
     .then((value) => {
         console.log("This will not run");
     })
     .catch((error) => {
         console.log(error.message);
     });*/

 //Catch Can Recover
/* Promise.reject("Failed")
     .catch((error) => {
         console.log(error);
         return "Recovered"
     }).then(data=>
 console.log(data));*/

 //finally() runs whether Promise resolves or rejects.
 // Promise.reject("Error")
 //     .catch((error) => {
 //         console.log(error);
 //     })
 //     .finally(() => {
 //         console.log("Cleanup");
 //     });
/*
 const p1 = Promise.resolve("User");
 const p2 = Promise.reject("Orders");
 const p3 = Promise.resolve("Payments");

 Promise.all([p1,p2,p3]).then(results => {
     console.log(results);
 }).catch((error) => {
     console.log(error +" Failed");
 });

 Promise.allSettled([p1, p2, p3]).then(results => {
     console.log(results);
 });
*/
 /*const pr1 = new Promise((resolve) => {
     setTimeout(() => resolve("First"), 100);
 });

 const pr2 = new Promise((_,reject) => {
     setTimeout(() => reject("Second"), 500);
 });
*/
 //RACE Returns first settled Promise. (resolved/rejected)
 /*Promise.race([pr1, pr2])
     .then((result) => {
         console.log(result);
     }).catch((err) => {
         console.log(err);
 });*/


 //async Function Always Returns A Promise

/* const asyncFunction = async () => "Hello";
 console.log(asyncFunction()); //Promise { 'Hello' }
 asyncFunction().then((value) => {console.log(value)});*/

 const getUsers =  async ()=>{
     const res = await fetch("https://jsonplaceholder.typicode.com/users2");
     if(!res.ok) return new Error("API FAILED")
     const data =  await res.json();
     return data;
 }

 getUsers().then(users => {
     console.log(users);
 }).catch(err => console.log(err));



 //Error Handling With try/catch
 /*async function getUsers() {
     try {
         const response = await fetch("https://jsonplaceholder.typicode.com/users2");

         if (!response.ok) {
             throw new Error("API failed");
         }

         const data = await response.json();
         console.log(data);
     } catch (error) {
         console.log(error.message);
     }
 }

 getUsers();*/












