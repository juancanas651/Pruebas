const $ = {
    containerPersonajes:document.getElementById('aqui'),
    inputBuscar: document.getElementById('inputBuscar'),
    inputOrderAToZ:document.getElementById('ordenarAZ'),
    btnCancelSearch:document.getElementById('btnCancelSearch'),
    linkPersonajes:document.getElementById('linkPersonajes'),
    linkPlanetas:document.getElementById('linkPlanetas'),
}
// Otro Ejemplo
// Definimos la URL con los parámetros incluidos
let pagina = 1;
let urlPlanets = 'https://dragonball-api.com/api/planets?page=1&limit=20';
let urlPersonajes=`https://dragonball-api.com/api/characters?page=1&limit=58`;
let personajes =[];
let planetas = [];
let domtarjets = [];
function cargarPersonajes (page) {
    let urldragon =page
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
            });
        })
        .catch(error => {
            // Capturamos cualquier error (problemas de red o de la API)
            console.error('Error al obtener los personajes:', error.message);
        })
        .finally(() => {
            console.log("Petición de dragon ball finalizada");
            personajes.forEach(p=>{
                console.log(p)
                tarjets(p);
            })
        });

}
function cargarPlanetas (page) {
    let urldragon =page
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
                planetas.push(element)
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
cargarPersonajes(urlPersonajes);
cargarPlanetas(urlPlanets);
console.log(personajes)

function tarjets (objeto){
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


    if('isDestroyed' in objeto){
        divImg.appendChild(imagen);
        divInfo.appendChild(nombrePersonaje);
        divPrincipal.appendChild(divImg);
        divPrincipal.appendChild(divInfo);
        domtarjets.push(divPrincipal);
        printTarjets(domtarjets);

        divPrincipal.classList.add('card','tarjetas','col-12','col-sm-6','col-md-4','col-xl-3','haber','m-4');
        divImg.classList.add('divImgP');
        divInfo.classList.add('divInfoP');
    }else{

        divPrincipal.classList.add('card','tarjetas','col-12','col-sm-4','col-md-4','col-xl-3','haber','m-4');
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
        printTarjets(domtarjets);
    }

}    


function printTarjets(ta,s){
    $.containerPersonajes.textContent = '';
    ta.forEach(t=>{
        $.containerPersonajes.appendChild(t)
    })
};


$.inputBuscar.addEventListener('input' , function(e){
    utilidades.search(e.target.value)
    if($.inputBuscar.value !== ''){
        $.btnCancelSearch.classList.remove('d-none');
    }else{
        $.btnCancelSearch.classList.add('d-none')
    }
});
$.inputOrderAToZ.addEventListener('input',function(e){
    if($.inputOrderAToZ.checked){
        utilidades.aToZ()
        console.log('hola')
    }else{
        printTarjets(domtarjets)
    }
})

$.btnCancelSearch.addEventListener('click',()=>{
    $.inputBuscar.value ='';
    utilidades.search($.inputBuscar.value)
    if($.inputBuscar.value !== ''){
        $.btnCancelSearch.classList.remove('d-none');
    }else{
        $.btnCancelSearch.classList.add('d-none')
    }
})
$.linkPersonajes.addEventListener('click',()=>{
    domtarjets=[];
    personajes.forEach(p=>{
        tarjets(p)
    })
})
$.linkPlanetas.addEventListener('click',()=>{
    domtarjets=[];
    planetas.forEach(p=>{
        tarjets(p)
    })
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

