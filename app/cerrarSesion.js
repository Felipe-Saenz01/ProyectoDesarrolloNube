import { auth } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
const btnCerrarSesion = document.getElementById('cerrarSesion');

btnCerrarSesion.addEventListener('click', async ()=>{
    await signOut(auth);
})