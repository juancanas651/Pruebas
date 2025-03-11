window.onload = ()=>{
    localStorage.removeItem('abuscar');
    inputBuscar.value = '';
};
const $ = {
    containerPersonajes: document.getElementById('aqui'),
    inputBuscar: document.getElementById('inputBuscar'),
    inputOrderAToZ: document.getElementById('ordenarAZ'),
    btnCancelSearch: document.getElementById('btnCancelSearch'),
    linkPersonajes: document.getElementById('linkPersonajes'),
    linkPlanetas: document.getElementById('linkPlanetas'),
    buttonsContainer:document.getElementById('buttonContainer'),
};

let urlPlanets = 'https://dragonball-api.com/api/planets?page=1&limit=20';
let urlPersonajes = `https://dragonball-api.com/api/characters?page=${1}&limit=5`;
let personajes = [];
let planetas = [];
let domtarjets = [];

// Función para cargar datos
async function cargarDatos(url, tipo) {
    try {
        const response = await fetch(url, { method: 'GET', headers: { 'accept': '*/*' } });
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data = await response.json();
        console.log(`${tipo}:`, data);
        if (tipo === 'Personajes') {
            console.log(data.links)
            personajes = data.items;
            createButtonpages(data,data.meta.currentPage)
            domtarjets = personajes.map(crearTarjeta)
            printTarjets(domtarjets)
        } else {
            planetas = data.items;
        }
    } catch (error) {
        console.error(`Error al obtener los ${tipo.toLowerCase()}:`, error.message);
    }
}
cargarDatos(urlPersonajes, 'Personajes')
cargarDatos(urlPlanets, 'Planetas')

// Función para generar tarjetas
function crearTarjeta(objeto) {
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
        divPrincipal.id = `${objeto.id}`

        divPrincipal.addEventListener('click',(e)=>{
            localStorage.setItem('abuscar',e.currentTarget.id);

            window.location.href = "transformaciones.html"
        })

    }
    return divPrincipal;
}

// Función para renderizar tarjetas
function printTarjets(arr) {
    $.containerPersonajes.innerHTML = '';
    arr.forEach(t => $.containerPersonajes.appendChild(t));
}

// Eventos
$.inputBuscar.addEventListener('input', function (e) {
    utilidades.search(e.target.value);
    $.btnCancelSearch.classList.toggle('d-none', e.target.value === '');
});

$.inputOrderAToZ.addEventListener('input', function () {
    if ($.inputOrderAToZ.checked) {
        utilidades.aToZ();
    } else {
        printTarjets(domtarjets);
    }
});

$.btnCancelSearch.addEventListener('click', () => {
    $.inputBuscar.value = '';
    utilidades.search('');
    $.btnCancelSearch.classList.add('d-none');
});

$.linkPersonajes.addEventListener('click', () => {
    domtarjets = personajes.map(crearTarjeta);
    printTarjets(domtarjets);
});

$.linkPlanetas.addEventListener('click', () => {
    domtarjets = planetas.map(crearTarjeta);
    printTarjets(domtarjets);
});

const utilidades = {
    search(filtro) {
        let filtroLower = filtro.toLowerCase();
        domtarjets.forEach(tarjet => {
            let nombre = tarjet.querySelector('h4').textContent.toLowerCase();
            tarjet.style.display = nombre.includes(filtroLower) ? '' : 'none';
        });
    },
    aToZ() {
        let ordenado = [...domtarjets].sort((a, b) => 
            a.querySelector('h4').textContent.localeCompare(b.querySelector('h4').textContent)
        );
        printTarjets(ordenado);
    },
};
function createButtonpages (objeto , current){
    //para atras
    $.buttonsContainer.textContent = '';
    let previus = document.createElement('button');
    previus.classList.add('btn')
    let iconPrevius = document.createElement('i');
    iconPrevius.classList.add('fa-solid', 'fa-chevron-left')
    previus.appendChild(iconPrevius);
    previus.addEventListener('click',()=>{
        if(!objeto.links.previous==''){
            urlPersonajes = objeto.links.previous
            cargarDatos(urlPersonajes, 'Personajes')
        }
    })
    $.buttonsContainer.appendChild(previus)

    //numericos
    for(let i=1 ; i<objeto.meta.totalPages+1;i++){
        let buttonPage = document.createElement('button');
        buttonPage.classList.add('btn')
        buttonPage.textContent = i
        if(buttonPage.textContent == current){
            buttonPage.classList.add('btn-warning')
        }
        buttonPage.addEventListener('click',(e)=>{
            urlPersonajes = `https://dragonball-api.com/api/characters?page=${e.target.textContent}&limit=5`
            cargarDatos(urlPersonajes, 'Personajes')
        })
        $.buttonsContainer.appendChild(buttonPage);

    }

    //para adelante
    let next = document.createElement('button');
    next.classList.add('btn');
    let iconNext = document.createElement('i');
    iconNext.classList.add('fa-solid', 'fa-chevron-right')
    next.appendChild(iconNext);
    next.addEventListener('click',()=>{
        if(!objeto.links.next == ''){
            urlPersonajes = objeto.links.next
            cargarDatos(urlPersonajes, 'Personajes')
        }
    })
    $.buttonsContainer.appendChild(next)
};