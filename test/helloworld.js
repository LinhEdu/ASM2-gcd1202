const readline = require('node:readline');
    
console.log("Hello Cloud Computing class!");
// var a = "Minh";
// console.log(`Hello ${a}`)

/* 
* write the NodeJS code: 
- Input your name from keyboard 
- Print out Hello "YOur name" on the console
*/
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });
// rl.question(`What's your name? `, (name) => {
//     console.log(`Hello ${name}!`);
//     rl.close();
// });

// Loop 
// print out all number from 0 to 9 with for loop
for(i=0; i<=9; i++) {
    console.log(i);
}
// Use while loop, print out all odd numbers from 0 to 9
let a = 1;
while (a<10) {
    console.log(a);
    a += 2;
}