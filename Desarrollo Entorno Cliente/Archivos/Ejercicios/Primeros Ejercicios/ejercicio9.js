let variable1 = 60;
let variable2 = 90;
let temporal = variable1;

variable1 = variable2;
variable2 = temporal;

console.log("Variable 1: " + variable1);
console.log("Variable 2: " + variable2);