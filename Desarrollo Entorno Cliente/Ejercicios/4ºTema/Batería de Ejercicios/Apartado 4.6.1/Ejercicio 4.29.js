// 4.29. Crea 10 números aleatorios y los ordena.
// Los números que terminan en 0 aparecen primero.
function aleatorios() {
    let numeros = [];

    for (let i = 0; i < 10; i++) {
        numeros.push(Math.floor(Math.random() * 100) + 1);
    }

    numeros.sort(function (a, b) {
        if (a % 10 === 0 && b % 10 !== 0) return -1;
        if (a % 10 !== 0 && b % 10 === 0) return 1;
        return a - b;
    });

    return numeros;
}

console.log(aleatorios());
