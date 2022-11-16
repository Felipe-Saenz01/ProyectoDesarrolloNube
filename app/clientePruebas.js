import { db, auth } from "./firebase.js";
import { collection, getDocs,doc, setDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import './cliente.js';
import { showAlert } from "./showAlert.js";

const contenedor = document.getElementById('vistaPruebas');

const querySnapshot = await getDocs(collection(db, "DBpruebas"));
querySnapshot.forEach((doc) => {
    const card = document.createElement('div');
    const registros = doc.data();
    card.setAttribute('id', registros.nombrePrueba);
    card.classList.add('col-4', 'mb-1', 'mr-1');

    const bntEliminar = document.createElement('button');
    bntEliminar.classList.add('btn','btn-primary', 'mb-1', 'ml-1');
    bntEliminar.innerText = 'Presentar';
    bntEliminar.setAttribute('data-bs-toggle', 'modal');
    bntEliminar.setAttribute('data-bs-target', '#prueba');
    bntEliminar.onclick = function(){
	    eliminarRegistro(card.getAttribute('id'));
	}
    card.innerHTML=`
        <div class="card text-bg-dark mb-4">
            <div class="card-body">
            <h5 class="card-title">${registros.nombrePrueba}</h5>   
            <p>Pulse el boton para presentar estra prueba</p>
            </div>
            <div class='card-footer'>
            </div>

        </div>
    
    `;
    //console.log(card.children[0])
    card.children[0].children[1].appendChild(bntEliminar)
    contenedor.appendChild(card);
    
})

const pruebaForm = document.getElementById('pruebaForm');

async function eliminarRegistro(id){
    
    const nombrePrueba = document.getElementById('nombrePrueba');
    const pregunta1 = document.getElementById('pregunta1');
    const respuesta11 = document.getElementById('txtRespuesta1-1');
    const respuesta21 = document.getElementById('txtRespuesta2-1');
    const respuesta31 = document.getElementById('txtRespuesta3-1');
    const edtrespuesta11 = document.getElementById('edtRespuesta1-1');
    const edtrespuesta21 = document.getElementById('edtRespuesta2-1');
    const edtrespuesta31 = document.getElementById('edtRespuesta3-1');
    const pregunta2 = document.getElementById('pregunta2');
    const respuesta12 = document.getElementById('txtRespuesta1-2');
    const respuesta22 = document.getElementById('txtRespuesta2-2');
    const respuesta32 = document.getElementById('txtRespuesta3-2');
    const edtrespuesta12 = document.getElementById('edtRespuesta1-2');
    const edtrespuesta22 = document.getElementById('edtRespuesta2-2');
    const edtrespuesta32 = document.getElementById('edtRespuesta3-2');
    const modulo = document.getElementById('modulo');
 
    
    querySnapshot.forEach((doc) => {
        const registros = doc.data();

        if(registros.nombrePrueba === id){
            nombrePrueba.innerText = registros.nombrePrueba;
            pregunta1.innerText = registros.pregunta1;
            respuesta21.innerText = registros.respuesta21;
            edtrespuesta21.setAttribute('value', registros.respuesta21);
            respuesta11.innerText = registros.respuesta11;
            edtrespuesta11.setAttribute('value', registros.respuesta11) ;
            respuesta31.innerText = registros.respuesta31;
            edtrespuesta31.setAttribute('value', registros.respuesta31) ;
            pregunta2.innerText = registros.pregunta2;
            respuesta12.innerText = registros.respuesta12;
            edtrespuesta12.setAttribute('value', registros.respuesta12) ;
            respuesta22.innerText = registros.respuesta22;
            edtrespuesta22.setAttribute('value', registros.respuesta22) ;
            respuesta32.innerText = registros.respuesta32;
            edtrespuesta32.setAttribute('value', registros.respuesta32) ;
            modulo.setAttribute('value', registros.nombrePrueba)

        }
    })
}

pruebaForm.addEventListener('submit', async (evento)=>{
    evento.preventDefault();
    const respuesta1 = document.querySelector('input[name=respuesta1]:checked').value;
    const respuesta2 = document.querySelector('input[name=respuesta2]:checked').value;
    const nombrePrueba = pruebaForm['modulo'].value

    onAuthStateChanged(auth, async (user) =>{
        if(user){
            guardarRespuesta(user.email, respuesta1, respuesta2, nombrePrueba);
            
            
        }else{
            window.location.href='../index.html';
        }
    })

    console.log(respuesta1);
    console.log(respuesta2);
})

function guardarRespuesta(email, respuesta1, respuesta2, nombrePrueba){
    const registroRespuesta = setDoc(doc(db, 'DBrespuestas', email),{
        email,
        respuesta1,
        respuesta2,
        nombrePrueba
    })
    pruebaForm.reset();
    const Modalregistro = document.getElementById('prueba');
    const modalRegistro = bootstrap.Modal.getInstance(Modalregistro);
    modalRegistro.hide();
    showAlert('Respuestas registradas.', 'succes')

}
