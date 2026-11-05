//La función recoge el número y hace el modulo. Si es 0 significa que se puede multiplicar por 10
function multiplo(num) {
    if (num % 10 === 0){
        console.log("El número introducido es múltiplo de 10")
    }else{
        console.log("El número introducido NO es múltiplo de 10")
    }

}

multiplo(21)