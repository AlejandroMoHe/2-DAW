let equipos = [
    {nombre: "Sevilla", puntos: 25, jugados: 10, ganados: 8, empatados: 1, perdidos: 1, favor: 24, contra: 8},
    {nombre: "Betis", puntos: 22, jugados: 10, ganados: 7, empatados: 1, perdidos: 2, favor: 20, contra: 10},
    {nombre: "Cadiz", puntos: 18, jugados: 10, ganados: 5, empatados: 3, perdidos: 2, favor: 17, contra: 12},
    {nombre: "Malaga", puntos: 16, jugados: 10, ganados: 5, empatados: 1, perdidos: 4, favor: 15, contra: 14},
    {nombre: "Granada", puntos: 14, jugados: 10, ganados: 4, empatados: 2, perdidos: 4, favor: 13, contra: 13},
    {nombre: "Cordoba", puntos: 12, jugados: 10, ganados: 3, empatados: 3, perdidos: 4, favor: 12, contra: 15},
    {nombre: "Huelva", puntos: 10, jugados: 10, ganados: 3, empatados: 1, perdidos: 6, favor: 10, contra: 18},
    {nombre: "Jaen", puntos: 9, jugados: 10, ganados: 2, empatados: 3, perdidos: 5, favor: 9, contra: 16},
    {nombre: "Almeria", puntos: 7, jugados: 10, ganados: 2, empatados: 1, perdidos: 7, favor: 8, contra: 20},
    {nombre: "Huesca", puntos: 4, jugados: 10, ganados: 1, empatados: 1, perdidos: 8, favor: 6, contra: 24}
];

let ganador = equipos[0];

for (let i = 1; i < equipos.length; i++) {
    if (equipos[i].puntos > ganador.puntos) {
        ganador = equipos[i];
    }
}

console.log(ganador);