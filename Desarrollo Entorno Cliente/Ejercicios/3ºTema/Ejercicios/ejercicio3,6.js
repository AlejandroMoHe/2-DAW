let valores = [];
let i = 0;

while (i < 10) {
    valores.push(Math.random() < 0.5);
    i++;
}

console.log(valores);

i = 0;

while (i < 10) {
    if (valores[i] == true) {
        console.log("Posición: " + i);
    }

    i++;
}