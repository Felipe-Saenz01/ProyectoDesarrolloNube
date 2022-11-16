import { db } from "./firebase.js";
import { collection, getDocs, deleteDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import './admin.js';
import { showAlert } from "./showAlert.js";

const contenedor = document.getElementById('vistaPruebas')

const querySnapshot = await getDocs(collection(db, "DBpruebas"));
querySnapshot.forEach((doc) => {
    const card = document.createElement('div');
    const registros = doc.data();
    console.log(registros)
    card.setAttribute('id', registros.nombrePrueba);
    card.classList.add('col-4', 'mb-1', 'mr-1');

    const bntEliminar = document.createElement('button');
    bntEliminar.classList.add('btn','btn-danger', 'mb-1', 'ml-1');
    bntEliminar.innerHTML = '<i class="bi bi-trash-fill"></i>';
    bntEliminar.onclick = function(){
	    eliminarRegistro(card.getAttribute('id'));
	}
    card.innerHTML=`
        <div class="card text-bg-dark mb-4">
            <div class="card-header" id="cardCabecera${registros.nombrePrueba}">
                <h5 class="card-title">${registros.nombrePrueba}</h5>   
            </div>
            <div class="card-body">
                <h5>${registros.pregunta1}</h5>
                <ul>
                    <li>${registros.respuesta11}</li>
                    <li>${registros.respuesta21}</li>
                    <li>${registros.respuesta31}</li>
                </ul>
                <p>Correcta: ${registros.respuestaCorrecta1}</p>
                <br>
                <h5>${registros.pregunta2}</h5>
                <ul>
                    <li>${registros.respuesta12}</li>
                    <li>${registros.respuesta22}</li>
                    <li>${registros.respuesta32}</li>
                </ul>
                <p>Correcta: ${registros.respuestaCorrecta1}</p>
            </div>
            <div class='card-footer'>

            </div>
        </div>
    
    `;
    card.children[0].children[2].appendChild(bntEliminar)
    contenedor.appendChild(card);
    


})

async function eliminarRegistro(id){
    try {
        await deleteDoc(doc(db, "DBpruebas", id))
        location.reload();
    } catch (error) {
        console.log(error.code);
    }
}


const pruebasFormu = document.getElementById('pruebaForm');

pruebasFormu.addEventListener('submit', (evento)=>{
    evento.preventDefault();
    const nombrePrueba = pruebasFormu['edtNombrePrueba'].value;
    const pregunta1 = pruebasFormu['edtPregunta1'].value;
    const respuesta11 =pruebasFormu['edtRespuesta1-1'].value;
    const respuesta21 =pruebasFormu['edtRespuesta2-1'].value;
    const respuesta31 =pruebasFormu['edtRespuesta3-1'].value;
    const respuestaCorrecta1 =pruebasFormu['edtRespuestaCorrecta1'].value;
    const pregunta2 = pruebasFormu['edtPregunta2'].value;
    const respuesta12 =pruebasFormu['edtRespuesta1-2'].value;
    const respuesta22 =pruebasFormu['edtRespuesta2-2'].value;
    const respuesta32 =pruebasFormu['edtRespuesta3-2'].value;
    const respuestaCorrecta2 =pruebasFormu['edtRespuestaCorrecta2'].value;

    guardarPrueba(nombrePrueba, pregunta1, respuesta11, respuesta21, respuesta31, respuestaCorrecta1, pregunta2, respuesta12, respuesta22, respuesta32, respuestaCorrecta2)



})

function guardarPrueba(nombrePrueba, pregunta1, respuesta11, respuesta21, respuesta31, respuestaCorrecta1, pregunta2, respuesta12, respuesta22, respuesta32, respuestaCorrecta2 ){
    const registroPrueba = setDoc(doc(db, "DBpruebas", nombrePrueba),{
        nombrePrueba,
        pregunta1,
        respuesta11,
        respuesta21,
        respuesta31,
        respuestaCorrecta1,
        pregunta2,
        respuesta12,
        respuesta22,
        respuesta32,
        respuestaCorrecta2,
    })
    console.log('registro prueba')
    const Modalregistro = document.getElementById('prueba');
    const modalRegistro = bootstrap.Modal.getInstance(Modalregistro);
    modalRegistro.hide();
    showAlert('Pruega registrada.', 'succes')
    
}