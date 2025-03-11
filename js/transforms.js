let idbuscar = null;
window.onload = () => {
    const data = localStorage.getItem("abuscar");
    if (data) {
        idbuscar = data;
        let urlId = `https://dragonball-api.com/api/characters/${idbuscar}`;
        cargarPersonaje(urlId); // Llamamos la función con la URL correcta
    } else {
        console.log("Error al recuperar id");
    }
};
const $ = {
    imagenPersonaje: document.getElementById('imagePersonaje'),
    nombre: document.getElementById('name'),
    descripcion: document.getElementById('description'),
    divTransformaciones: document.getElementById('transformaciones'),
    lightbox: document.getElementById('lightbox'),
    linkInicio:document.getElementById('linkInicio'),
    hRaza:document.getElementById('hRaza'),
    hPlaneta:document.getElementById('hPlaneta'),
    hKi:document.getElementById('hKi'),
    hMaxKi:document.getElementById('hMaxKi'),
    hAfiliacion:document.getElementById('hAfiliacion'),
    hGenero:document.getElementById('hGenero'),
};
async function cargarPersonaje(url) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { accept: "*/*" },
        });

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const dataDb = await response.json();
        printPersonaje(dataDb);
        console.log(dataDb);
    } catch (error) {
        console.error(`Error al obtener el personaje:`, error.message);
    }
}

function printPersonaje (objeto){
    $.imagenPersonaje.src = objeto.image;
    $.nombre.textContent = objeto.name;
    $.descripcion.textContent = objeto.description;
    $.hRaza.textContent = objeto.race;
    $.hPlaneta.textContent = objeto.originPlanet.name;
    $.hKi.textContent = objeto.ki;
    $.hMaxKi.textContent = objeto.maxKi;
    $.hAfiliacion.textContent = objeto.affiliation;
    $.hGenero.textContent = objeto.gender;

    objeto.transformations.forEach(t=>{
        let divTransformacion = document.createElement('div');
        let imagen = document.createElement('img');
        let nombre = document.createElement('h6');
        imagen.src = t.image;
        nombre.textContent = t.name;
        divTransformacion.classList.add('card','tarjetas','col-12','col-sm-4','col-md-2','transformacionStyle');
        divTransformacion.addEventListener('click',()=>{
            abrirLightbox();
            document.getElementById("lightbox").querySelector('img').src = t.image;
        })
        divTransformacion.appendChild(imagen);
        divTransformacion.appendChild(nombre);
        $.divTransformaciones.appendChild(divTransformacion);
    })
};
$.lightbox.addEventListener('click',(e)=>{
    if(e.target.id === 'lightbox'){
        cerrarLightbox();
    }else{

    }
});
function abrirLightbox() {
    document.getElementById("lightbox").style.display = "flex";
    document.body.style.overflow = "hidden";
}

function cerrarLightbox() {
    document.getElementById("lightbox").style.display = "none";
    document.body.style.overflow = "auto";
}

$.linkInicio.addEventListener('click',()=>{
    window.location.href = "index.html"
});