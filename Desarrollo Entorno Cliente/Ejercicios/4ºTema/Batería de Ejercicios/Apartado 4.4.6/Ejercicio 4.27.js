// 4.27. Función autoejecutable: espera tres segundos antes de finalizar.
(function () {
    console.log("Comenzando...");

    setTimeout(function () {
        console.log("Finalizado.");
    }, 3000);
})();
