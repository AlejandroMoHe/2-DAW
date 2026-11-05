let numeros = [];

for (let i = 0; i < 10; i++) {
    numeros.push(Math.floor(Math.random() * 21) * 5);
}

while (numeros[0] < 50) {
    numeros.shift();
    numeros.unshift(Math.floor(Math.random() * 11 + 10) * 5);
}

while (numeros[9] > 50) {
    numeros.pop();
    numeros.push(Math.floor(Math.random() * 11) * 5);
}

console.log(numeros);
console.log("Primer número:", numeros[0]);
console.log("Último número:", numeros[9]);