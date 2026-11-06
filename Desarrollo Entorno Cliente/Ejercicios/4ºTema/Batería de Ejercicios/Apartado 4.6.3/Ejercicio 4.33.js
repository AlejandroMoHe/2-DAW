function noLetras(lista1) {

    let letras = "abcdefghijklmnopqrstuvwxyz"

    for (let i = 0; i < lista1.length; i++) {
        for (let j = 0; j < letras; j++) {
            if (toLowerCase(lista1[i]) !== j){
                console.log(lista1[i])
        };    
        }
        
    }
}

let lista1 = ["afgwiuvwbenvwimvb%$&%$iojfoew"]
