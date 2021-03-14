const form = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const paginacionDiv = document.querySelector('#paginacion');

let paginaActual = 1;
let totalPaginas;
let iteradorSiguiente;
const IndicePag = 30;

window.onload = ()=>{
    form.addEventListener('submit',validarFormulario);
}

function validarFormulario(e){
    e.preventDefault();
    console.log("Validando");

    const termino = document.querySelector('#termino').value;

    if(termino === ''){
        mostrarError('Ingrese un campo de búsqueda');
        return
    }

    buscarImagenes()}

function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta) {
        const alerta = document.createElement('p');

        alerta.classList.add('bg-red-100', "border-red-400", "text-red-700", "px-4", "py-3", "rounded",  "max-w-lg", "mx-auto", "mt-6", "text-center" );
    
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${mensaje}</span>
        `;
    
        formulario.appendChild(alerta);
    
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }

}

function buscarImagenes() {
    const terminoBusqueda = document.querySelector('#termino').value;

    const key = '1732750-d45b5378879d1e877cd1d35a6';
    const url = `https://pixabay.com/api/?key=${key}&q=${terminoBusqueda}&per_page=30&page=${paginaActual}`;

    fetch(url) 
        .then(respuesta => respuesta.json())
        .then( resultado => {
            totalPaginas = calcularPaginas(resultado.totalHits);

            // console.log(totalPaginas)
            console.log(resultado.hits);
            mostrarImagenes(resultado.hits);
        });


}

function mostrarImagenes(imagenes){
    
    while (resultado.firstChild) {
        resultado.firstChild.remove();
    }

    imagenes.forEach(imagen => {

        const { likes, views, previewURL, largeImageURL } = imagen;
        resultado.innerHTML +=  `
        <div class="w-1/2 md:w-1/3 lg:w-1/4 mb-4 p-3">
            <div class="bg-white ">
                <img class="w-full" src=${previewURL} alt={tags} />
                <div class="p-4">
                    <p class="card-text">${likes} Me Gusta</p>
                    <p class="card-text">${views} Vistas </p>
    
                    <a href=${largeImageURL} 
                    rel="noopener noreferrer" 
                    target="_blank" class="bg-blue-800 w-full p-1 block mt-5 rounded text-center font-bold uppercase hover:bg-blue-500 text-white">Ver Imagen</a>
                </div>
            </div>
        </div>
        `;
        
    });

    if(!iteradorSiguiente){
       mostrarPaginacion();
    }else{
        console.log("No existe");
    }

}

function mostrarPaginacion(){

    while (paginacion.firstChild) {
        paginacion.firstChild.remove();
    }

    let iterador = crearPaginacion();

    while (true) {
        const {done, value} = iterador.next();

        if (done) {
            return
        }

        const botonSiguiente = document.createElement('a');
        botonSiguiente.onclick = ()=>{
            console.log(value);
            paginaActual = value;
            buscarImagenes();
        }
        botonSiguiente.dataset.pagina = value;
        botonSiguiente.href = "#";
        botonSiguiente.textContent = value;
        botonSiguiente.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'mx-auto', 'mb-10', 'font-bold', 'uppercase', 'rounded');
        paginacionDiv.appendChild(botonSiguiente);
    }
}

function calcularPaginas(paginas){
    return parseInt( Math.ceil( paginas / IndicePag ));
}

function *crearPaginacion() {
    console.log(totalPaginas);
    for( let i = 1; i <= totalPaginas; i++) {
        yield i;
    }
}


