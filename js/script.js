const $ = {
    containerPersonajes:document.getElementById('aqui'),
    inputBuscar: document.getElementById('inputBuscar'),
    inputOrderAToZ:document.getElementById('ordenarAZ'),
}
// Otro Ejemplo
// Definimos la URL con los parámetros incluidos
let pagina = 1;
let personajes =[];
function cargarPersonajes (page) {
    let urldragon = `https://dragonball-api.com/api/characters?page=${page}&limit=58`;
        // Configuración de la petición
    const opciones = {
        method: 'GET',  // Es una petición GET
        headers: {
            'accept': '*/*'  // Este es el header que pide el curl
        }
    };
    const daticos = null ;
    // Realizamos la petición con fetch
    fetch(urldragon, opciones)
        .then(response => {
            // Comprobamos si la respuesta es correcta (status 200-299)
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            // Convertimos la respuesta a JSON (el cuerpo de la respuesta)
            return response.json();
        })
        .then(data => {
            // Aquí ya tenemos la información en formato JavaScript (objeto o array)
            console.log('Personajes:', data);

            data.items.forEach(element => {
                personajes.push(element)
                targetas(element)
            });
        })
        .catch(error => {
            // Capturamos cualquier error (problemas de red o de la API)
            console.error('Error al obtener los personajes:', error.message);
        })
        .finally(() => {
            console.log("Petición de dragon ball finalizada");
        });

}
cargarPersonajes(pagina)
console.log(personajes)
let cont = 0;
let domtarjets = [];
function targetas (objeto){
    let divPrincipal = document.createElement('div');
    let divImg = document.createElement('div');
    let divInfo = document.createElement('div');
    let nombrePersonaje = document.createElement('h4');
    let kiBase = document.createElement('h5');
    let kiTotal = document.createElement('h5');
    let equipo = document.createElement('h5');

    let sexoRaza = document.createElement('h6');
    let base = document.createElement('h6');
    let maximo = document.createElement('h6');
    let bando = document.createElement('h6');

    let imagen = document.createElement('img');

    nombrePersonaje.textContent = objeto.name;
    kiBase.textContent = 'Ki Base';
    kiTotal.textContent = 'Ki Maximo';
    equipo.textContent = 'Bando';
    sexoRaza.textContent = `${objeto.race}-${objeto.gender}`;
    base.textContent = objeto.ki;
    maximo.textContent= objeto.maxKi;
    bando.textContent=objeto.affiliation;
    imagen.src = objeto.image;

    divPrincipal.classList.add('card','h-100','tarjetas');
    divImg.classList.add('divImg');
    divInfo.classList.add('divInfo');


    
    divImg.appendChild(imagen);
    divInfo.appendChild(nombrePersonaje);
    divInfo.appendChild(sexoRaza);
    divInfo.appendChild(kiBase);
    divInfo.appendChild(base);
    divInfo.appendChild(kiTotal);
    divInfo.appendChild(maximo);
    divInfo.appendChild(equipo);
    divInfo.appendChild(bando);
    divPrincipal.appendChild(divImg);
    divPrincipal.appendChild(divInfo);
    domtarjets.push(divPrincipal);
    printTarjets(domtarjets)
}    
function printTarjets(ta){
    ta.forEach(t=>{
        $.containerPersonajes.appendChild(t)
    })
};
$.inputBuscar.addEventListener('input' , function(e){
    utilidades.search(e.target.value)
});
$.inputOrderAToZ.addEventListener('input',function(e){
    if($.inputOrderAToZ.checked){
        utilidades.aToZ()
        console.log('hola')
    }else{
        printTarjets(domtarjets)
    }
})

const utilidades = {
    search(cual){
        let filtro = cual.toLowerCase(); // Convertir el texto de búsqueda a minúsculas

        domtarjets.forEach(tarjet => {
            let nombre = tarjet.querySelector('h4').textContent.toLowerCase(); // Obtener el nombre del personaje en minúsculas

            if (nombre.includes(filtro)) {
                tarjet.style.display = ''; // Mostrar la tarjeta si coincide
            } else {
                tarjet.style.display = 'none'; // Ocultar la tarjeta si no coincide
            }
        });
    },
    aToZ(){
        let copiaA = [...domtarjets].sort((a,b)=>{ //guardamos una copia del arreglo ordenado de a a la z con .sort
            let nombreA = a.querySelector('h4').textContent.trim();
            let nombreB = b.querySelector('h4').textContent.trim();
            return nombreA.localeCompare(nombreB)
        })
        printTarjets(copiaA)
    },
}

// // Definimos el id del personaje que queremos consultar
// const personajeId = 3;

// // Armamos la URL dinámica
// const urlUnSolo = `https://dragonball-api.com/api/characters/${personajeId}`;

// // Configuración de la petición (GET con headers)
// const opciones2 = {
//     method: 'GET',
//     headers: {
//         'accept': '*/*'   // Esto es igual al curl original
//     }
// };

// // Realizamos la petición con fetch
// fetch(urlUnSolo, opciones2)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`Error HTTP: ${response.status}`);
//         }
//         return response.json();  // Convertimos la respuesta a JSON
//     })
//     .then(data => {
//         // Mostramos la información del personaje
//         console.log('Personaje obtenido:', data);
//     })
//     .catch(error => {
//         console.error('Error al obtener el personaje:', error.message);
//     })
//     .finally(() => {
//         console.log("Petición de un solo dragon ball finalizada");
//     });

