
let colores = new Map([
    [naranja, "#f39c12"], 
    [lima, "#c0f312"], 
    [turquesa, "#12f3e5"], 
    [rosa, "#f312af"], 
    [rojo, "#f31212"]
]);

let eleccion = prompt("Escribe un color: ")

for (color of colores) {
    if (color === eleccion){
        console.log(color)
    }
}


