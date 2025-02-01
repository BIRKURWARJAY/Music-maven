// // hollow triangle pattern
// function x(num) {
//   for (i = 1; i <= num; i++){
//     let row = "";
//     row += " ".repeat(num - i);
//     row += "* ";
//     if (i === num) {
//       row += "* ".repeat(i - 1)                    /////====================================---------------------------------------=============================
//     }
//     if (i > 1 && i < num) {
//       row += " ".repeat((i - 2) * 2) + "*"
//     }
//     console.log(row)
//   }
// }

// x(7)



////right angled pattern

// function x(num) {
//   for (i = 1; i <= num; i++){
//     console.log("* ".repeat(i))
//   }
// }
// x(5)




// //Inverted Right-Angle Triangle pattern

// function x(num) {
//   for (i = num; i >= 1; i--){
//     console.log("* ".repeat(i))
//   }
// }
// x(5)



// //Pyramid pattern
// function x(num) {
//   for (i = 1; i <= num; i++){
//     console.log(" ".repeat(num - i) + "* ".repeat(i))
//   }
// }
// x(5)



// // Diamond pattern
// function x(num) {
//   for (i = 1; i <= num; i++){
//     console.log(" ".repeat(num - i) + "* ".repeat(i))
//   }
//   for (i = num - 1; i >= 1; i--){
//     console.log(" ".repeat(num - i) + "* ".repeat(i))
//   }
// }
// x(5)



// //Checkerboard pattern
// function x(num) {
//   for (i = 1; i <= 5; i++){
//     if (i % 2 === 0) {
//       console.log(" " + "x ".repeat(num - 1))
//     } else {
//       console.log("x ".repeat(num))
//     }
//     console.log()
//   }
// }
// x(2)



// // Hollow Diamond pattern
// function x(num) {
//   for (i = 1; i <= num; i++){
//     let row = "";
//     row += " ".repeat(num - i) + "* "
//     if (i > 1 && i <= num) {
//       row += " ".repeat((i - 2) * 2) + "*"
//     }
//     console.log(row)
//   }
//   for (i = num - 1; i >= 1; i--){
//     let row = "";
//     row += " ".repeat(num - i) + "* ";
//     if (i > 1 && i <= num - 1) {
//       row += " ".repeat((i - 2) * 2) + "*"
//     }
//     console.log(row)
//   }
// }
// x(5)


// // Right-Pointing Arrow pattern
// function x(num) {
//   for (i = 1; i <= num; i++){
//     console.log("* ".repeat(i))
//   }
//   for (i = num - 1; i >= 1; i--){
//     console.log("* ".repeat(i))
//   }
// }
// x(3)



// // Butterfly pattern
// function x(num) {
//   for (i = 1; i <= num; i++){
//     console.log("* ".repeat(i) + " ".repeat((num - i) * 4) + "* ".repeat(i))
//   }
//   for (i = num - 1; i >= 1; i--){
//     console.log("* ".repeat(i) + " ".repeat((num - i) * 4) + "* ".repeat(i))
//   }
// }
// x(5)



// // Number Pyramid pattern
// function x(num) {
//   for (i = 1; i <= num; i++){
//     let row = "";
//     row += " ".repeat(num - i)
//     for (j = 1; j <= i; j++){
//       row += j + " "
//     }
//     console.log(row)
//   }
// }
// x(5)




// // crossed hollow square pattern
// function x(num) {
//   for (i = 1; i <= num; i++){
//     let row = "";
//     for (j = 1; j <= num; j++){
//       if (j == 1 || j == num || i == 1 || i == num || j == i || j == (num - i) + 1) {
//         row += "* "
//       } else {
//         row += "  "
//       }
//     }
//     console.log(row)
//   }
// }

// x(10)