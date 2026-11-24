// ==============
// PATRÓN FACTORY
// ==============
function crearCancion({
  titulo = "Sin título",
  artista = "Desconocido",
  genero = "General",
  anio = 2000,
  duracionSeg = 0,
} = {}) {
  return {
    titulo,
    artista,
    genero,
    anio,
    duracionSeg,

    reproducir() {
      const min = Math.floor(this.duracionSeg / 60);
      const seg = String(this.duracionSeg % 60).padStart(2, "0");
      return `> Sonando: "${this.titulo}" - ${this.artista} [${this.genero}, ${this.anio}] (${min}:${seg})`;
    },

    guardar() {
      console.log(`Guardando "${this.titulo}"...`);
    },
  };
}

// ===============================
// CREAR INSTANCIAS CON LA FACTORY
// ===============================
const playlist = [
  crearCancion({ titulo: "Master of Puppets", artista: "Metallica", genero: "Thrash Metal", anio: 1986, duracionSeg: 515 }),
  crearCancion({ titulo: "Fear of the Dark", artista: "Iron Maiden", genero: "Heavy Metal", anio: 1992, duracionSeg: 438 }),
  crearCancion({ titulo: "Painkiller", artista: "Judas Priest", genero: "Heavy Metal", anio: 1990, duracionSeg: 366 }),
  crearCancion({ titulo: "Roots Bloody Roots", artista: "Sepultura", genero: "Groove Metal", anio: 1996, duracionSeg: 212 }),
  crearCancion({ titulo: "Centro di gravità permanente", artista: "Franco Battiato", genero: "Art Pop", anio: 1981, duracionSeg: 235 }),
];

console.log("1. Objeto original:", playlist[0]);
console.log(playlist[4].reproducir());

const playlistJSON = JSON.stringify(playlist, null, 2);
localStorage.setItem("mi_playlist", playlistJSON);

// ===================
// RECUPERAR Y PARSEAR
// ===================
const textoRecuperado = localStorage.getItem("mi_playlist");
const datosCrudos = JSON.parse(textoRecuperado);

// Aquí datosCrudos[0].reproducir() daría error porque son objetos planos sin métodos

// ===================================
// RECONSTRUIR USANDO LA MISMA FACTORY
// ===================================

const playlistReconstruida = datosCrudos.map((dato) => crearCancion(dato));

console.log("4. Reconstruida y lista:", playlistReconstruida[0].reproducir());
