// function x(num) {
//   for (i = 1; i <= num; i++){
//     console.log('*'.repeat(i))
//   }
// }

// // x(5)



// function x(num1 , num2) {

//   let sum = num1 + num2;
//   let product = num1 * num2;
//   let diff = num1 - num2;
//   let Quotient = num1 / num2;
//   if (num2 == 0) {
//     Quotient = "num cannot be divide by 0";
//   }

//   console.log(`num1 = ${num1} num2 = ${num2} sum = ${sum} product = ${product} diff = ${diff} quotient = ${Quotient}`)
// }


// // x(23, 34)



// function x(num1, num2) {
//   if (num1 < num2) {
//     console.log(`${num1} is less than ${num2}`)
//   } else if (num1 == num2) {
//     console.log(`${num1} is equal to ${num2}`)
//   }  else {
//     console.log(`${num2} is less than ${num1}`)
//   }
// }

// // x(2356, 32)

// function x(num) {
//   let prev = Math.floor(num / 10) * 10;
//   let next = Math.ceil(num / 10) * 10;
//   console.log(`${num} is between ${prev} and ${next}`)
// }

// // x(214)


// function x(num) {
//   for (i = 1; i <= num; i++){
//     console.log(`${' '.repeat(num - i)} ${'* '.repeat(i)}`)
//   }

//   for(i = num - 1; i >= 1; i--){
//     console.log(`${' '.repeat(num - i)} ${'* '.repeat(i)}`)
//   }
// }

// // x(3)


// // function x(str) {
// //   let splitstr = str.split("");
// //   console.log(splitstr.reverse().join(""));
// // }

// // x("jay")


// function x(arr) {
//   let sum = 0;
//   let median;
//   for (marks of arr) {
//     sum += marks;
//   }
//   median = sum / arr.length;
//   console.log(arr, median, sum)
// }

// x([56, 78, 89, 98, 45, 67])



// class Demo {
//     constructor() {
//         console.log("hell")
//   }
  
//   display(n) {
//     console.log(n)
//   }
// }

// class Dem extends Demo{
//   constructor() {
//     super();
//   }
//   display(n) {
//     console.log(n)
//   }
// }

// const demo = new Demo();
// const dem = new Dem();

// demo.display(6);
// dem.display(5)





// function swappingNum() {
//   let n1 = prompt("n1");
//   let n2 = prompt("n2");

//   [n1, n2] = [n2, n1];
//   console.log(n1, "   ", n2)
// }
// swappingNum();