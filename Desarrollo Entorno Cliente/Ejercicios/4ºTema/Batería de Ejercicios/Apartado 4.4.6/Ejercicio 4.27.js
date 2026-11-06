(async () => {
  console.log("Comenzando...");
  
  await new Promise(resolve => setTimeout(resolve, 3000));

  console.log("Finalizado.");
})();