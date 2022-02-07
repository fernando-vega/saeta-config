import * as canvasDraw from './canvasDraw.js';
import {
    setConfigAreas
} from './canvasDraw.js';

const API_URL = 'https://consultas.fasecolda.com/pruebas/api/';
let dataResponse;

function login() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "usuario": "userVtexCust",
        "clave": "LRyp2c0VHE",
        "servicio": "VTEXPRCUST"
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://consultas.fasecolda.com/pruebasjwt/api/login/autenticar", requestOptions)
        .then(response => response.text())
        .then(result => sessionStorage.setItem('userToken', 'Bearer ' + result.replace(/"/g, '')))
        .catch(error => console.log('error', error));
}

login()

async function getData(url) {
    const response = await fetch(url);
    let data = await response.json();
    if (response) {
        document.getElementById('mainImage').src = data.Url
        document.getElementById('image-type').innerHTML = data.Descripcion
        dataResponse = data;
    }
}

function getQueryParams() {
    let queryParam = window.location.search;
    queryParam = queryParam.replace('?', '');
    return queryParam;
}

window.onload = function () {
    canvasDraw;
    getData(API_URL + 'serviciosprendas/imagensku/' + getQueryParams());
}


window.saveData = async function () {
    console.log('1: ', dataResponse.Configuracion)
    dataResponse.Configuracion = setConfigAreas();
    console.log('2: ', dataResponse.Configuracion)
    let dataUpdate = JSON.stringify(dataResponse);
    console.log('3: ', dataUpdate.Configuracion)
    let myHeaders = new Headers();
    myHeaders.append('Authorization', sessionStorage.getItem('userToken'));
    myHeaders.append('Content-Type', 'application/json');
    let saveOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: dataUpdate,
        redirect: 'follow'
    };

    fetch(API_URL + 'serviciosprendas/imagensku/' + getQueryParams(), saveOptions)
        .then(response => response.text())
        .then(result => alert('Se guardo correctamente', result))
        .catch(error => alert('Error al guardar, intente mas tarde', error));
}