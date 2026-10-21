let multiplos = [];
let numero = 0

while (true) {

    multiplos.push(Math.floor(Math.random() * 100));
    if(multiplos[0] !== 50 && multiplos[-1] !== 50 && multiplos.length === 10){
        break;
    }
    
}

console.log(multiplos)