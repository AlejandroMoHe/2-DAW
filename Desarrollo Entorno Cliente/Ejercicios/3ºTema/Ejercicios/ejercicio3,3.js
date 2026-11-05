let numeros = [];
let pares = [];
const MAX = 100

numeros.push(Math.floor(Math.random() * MAX));

for (let i = 0; i <= MAX; i++) {
    if (i % 2 === 0){
        pares.push(i)
    }
    
}

console.log(pares)