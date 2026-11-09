// 4.26. Deja a cero todos los elementos de una matriz 3x3, excepto los de la diagonal principal.
function diagonal(matriz) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (i !== j) {
                matriz[i][j] = 0;
            }
        }
    }

    return matriz;
}

let matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log(diagonal(matriz));
