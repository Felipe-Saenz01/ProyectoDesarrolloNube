import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getDoc, doc} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import './cerrarSesion.js';

onAuthStateChanged(auth, async (user) =>{
    if(user){
        buscarNombre(user.email);
    }else{
        window.location.href='../index.html';
    }
})

async function buscarNombre(email){
    const titulo = document.getElementById('titulo');
    const docSnap = await getDoc(doc(db, "DBusers", email))
    if(docSnap.exists()){
        console.log(docSnap.data().tipo)
        titulo.innerText=docSnap.data().nombre;
    }

}