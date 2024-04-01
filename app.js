'use strict'; 

let boton = document.getElementById('boton');
let input = document.getElementById('input');

function crearBotonBorrar () {
    let botonBorrar = document.createElement('button');
    botonBorrar.classList.add('botonBorrar', 'botonElem');
    botonBorrar.textContent = '❌';
    
    botonBorrar.addEventListener('click', () => {
        let elemento = botonBorrar.closest('.elemento');
        if (elemento) {
            elemento.remove();
        }
    });
    return botonBorrar;
}
function crearBotonHecho (span) {
    let botonHecho = document.createElement('button');
    botonHecho.classList.add('botonHecho', 'botonElem');
    botonHecho.textContent = '✅';

    botonHecho.addEventListener('click', () => {
        if (span) {
            if (span.style.textDecoration === 'line-through') {
                span.style.textDecoration = 'none';
            } else {
                span.style.textDecoration = 'line-through';
            }
        }
    });
    return botonHecho;
}
function crearBotonEditar (span) {
    let botonEditar = document.createElement('button');
    botonEditar.classList.add('botonEditar', 'botonElem');
    botonEditar.textContent = '✏️';

    botonEditar.addEventListener('click', () => {
        if (span) {
            if (span.contentEditable === 'true') {
                span.contentEditable = 'false';
            } else {
                span.contentEditable = 'true';
            }
        }
    });
    return botonEditar;
}

function crearElemento (value) {
    let elementos = document.getElementById('elementos');
    let div = document.createElement('div');
    div.classList.add('elemento');
    elementos.appendChild(div);

    let span = document.createElement('span');
    span.classList.add('textElement');
    span.textContent = value;
    div.appendChild(span);

    let botones = document.createElement('section');
    botones.classList.add('botones');

    let botonHecho = crearBotonHecho(span);
    botones.appendChild(botonHecho);

    let botonEditar = crearBotonEditar(span);
    botones.appendChild(botonEditar);

    let botonBorrar = crearBotonBorrar();
    botones.appendChild(botonBorrar);

    div.appendChild(botones);
}

boton.addEventListener('click', ()=> {
    let elemento = input.value;

    if (elemento.trim() == '') {
        alert('introducí algo pa');
    } else {
        crearElemento (elemento);
        input.value = '';
    }
});

function enterEvento (event) {
    if (event.key === 'Enter') { // Verificar si la tecla presionada es Enter
        boton.click(); // Simular clic en el botón
    }
}

input.addEventListener('keypress', enterEvento);






