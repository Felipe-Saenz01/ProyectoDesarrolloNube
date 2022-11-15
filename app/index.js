import { db, auth } from "./firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { setDoc, doc} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import './cargarCiudades.js';
import { showAlert } from "./showAlert.js";

const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', (evento) =>{
    evento.preventDefault();

    const nombre = registerForm['edtNombre'];
    const genero = registerForm['edtGenero'];
    const rh = registerForm['lsRh'];
    const departamento = registerForm['lsDepartamento'];
    const ciudad = registerForm['lsCiudad'];
    const telefono = registerForm['edtTelefono'];
    const correo = registerForm['edtCorreo'];
    const confirmarCorreo = registerForm['edtConfirmarCorreo'];
    const contra = registerForm['edtContra'];
    const confirmarContra = registerForm['edtConfirmarContra'];

    if(correo.value != confirmarCorreo.value){
        showAlert("Los correos no coinciden.", "error")
	    return;
    }

    if(contra.value != confirmarContra.value){
        showAlert("Las contraseñas no coinciden.", "alert")
	    return;
    }
    registroAuth(nombre.value, genero.value, rh.value, departamento.value, ciudad.value, telefono.value, correo.value, contra.value, "cliente")
    console.log('Formulario de registro');


});


async function registroAuth(nombre, genero, rh, departamento, ciudad, telefono, email,password,tipo){
    try {
        const autentication = await createUserWithEmailAndPassword(auth, email,password,tipo);
        showAlert("Usuario: "+autentication.user.email+", registrado.", "succes");
        const registro = setDoc(doc(db, "DBusers", email),{
              nombre,
              genero,
              rh,
              telefono,
              departamento,
              ciudad,
              email,
              tipo
            })
          
        
        registerForm.reset();
        const Modalregistro = document.getElementById('registro');
        const modalRegistro = bootstrap.Modal.getInstance(Modalregistro);
        modalRegistro.hide();
        
    } catch (error) {
        console.log(error.code);

        if( error.code === 'auth/email-already-in-use'){
            showAlert("El email ya se encuentra registrado.", "error")
        }else if(error.code === 'auth/invalid-email'){
            showAlert("El email es incorrecto o invalido.", "error")
        }else if(error.code === 'auth/weak-password'){
            showAlert("La contraseña es muy corta o debil.", "error")
        }
    }
}
let estado = "";
/// metodo para Inicio de sesion

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (evento) =>{
    evento.preventDefault();

    const correo = loginForm['loginCorreo'];
    const contra = loginForm['loginContra'];

    console.log(correo.value, contra.value)

    try {
        const login = await signInWithEmailAndPassword(auth, correo.value, contra.value);

        const Modallogin = document.getElementById('inicioSesion');
        const modalLogin = bootstrap.Modal.getInstance(Modallogin);
        modalLogin.hide();
        
        if(login.user.email === "admin@firebase.com"){
            loginForm.reset();
            window.location.href='../src/Admin.html';
        }else{
            loginForm.reset();
            window.location.href='../src/cliente.html';
        }
        
    } catch (error) {
        console.log(error.code);
        
        if( error.code === 'auth/wrong-password'){
            showAlert("Contraseña incorrecta.", "error")
        }else if(error.code === 'auth/user-not-found'){
            showAlert("El correo no existe o está mal escrito.", "error")
        }

    }

})

