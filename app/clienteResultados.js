import { db, auth } from "./firebase.js";
import { collection, getDoc,doc, setDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import './cliente.js';


onAuthStateChanged(auth, async (user) =>{
    if(user){
        obtenerInformacion(user.email)
        
    }else{
        window.location.href='../index.html';
    }
})

async function obtenerInformacion(email){
    const buscar = await getDoc(doc(db, 'DBrespuestas', email));
    if(buscar.exists()){
        compararResultados(buscar.data().nombrePrueba, buscar.data().respuesta1, buscar.data().respuesta2 )
    }
}

async function compararResultados(nombrePrueba, respuesta1, respuesta2){
    console.log(respuesta1)
    console.log(respuesta2)
    const buscar = await getDoc(doc(db, 'DBpruebas', nombrePrueba));
    if(buscar.exists()){
        console.log(buscar.data())
        if(buscar.data().respuestaCorrecta1 === respuesta1 && buscar.data().respuestaCorrecta2 === respuesta2 ){
            console.log('respuestas Correctas')
            const card = document.getElementById('vistaResultados');
            card.innerHTML=`
            <div class="card text-bg-dark mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                    <img src="./images/ta-bienM.jpg" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Resultados ${nombrePrueba}</h5>
                        <p class="card-text">Respuestas correctas! prueba APROBADA.</p>
                    </div>
                    </div>
                </div>
            </div>
            `;
        }else{
            console.log('respuestas incorrectas');
            const card = document.getElementById('vistaResultados');
            card.innerHTML=`
            <div class="card text-bg-dark mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                    <img src="./images/ta-malM.jpg" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Resultados ${nombrePrueba}</h5>
                        <p class="card-text">Respuestas incorrectas! prueba REPROBADA.</p>
                    </div>
                    </div>
                </div>
            </div>
            `;
        }
    }

}