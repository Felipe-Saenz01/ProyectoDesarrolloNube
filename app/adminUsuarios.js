import { db } from "./firebase.js";
import { collection, getDocs, getDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import './admin.js';
import './cargarCiudades.js';
import { showAlert } from "./showAlert.js";


const querySnapshot = await getDocs(collection(db, "DBusers"));

const tabla = document.getElementById('cuerpoTabla');

querySnapshot.forEach((doc) => {
    const row = tabla.insertRow();
    const registros = doc.data();
    console.log(registros)
    row.setAttribute('id', registros.email); 
    row.innerHTML= `
    <tr>
        <td scope="row">${registros.nombre}</td>
        <td >${registros.email}</td>
        <td >${registros.genero}</td>
        <td >${registros.telefono}</td>
        <td >${registros.rh}</td>
        <td >${registros.departamento}</td>
        <td >${registros.ciudad}</td>
        <td >${registros.tipo}</td>
        <td> </td>
    </tr>
    `;
    const btnUpdate = document.createElement('button');
	btnUpdate.classList.add('btn','btn-warning', 'mb-1', 'ml-1');
    btnUpdate.setAttribute('data-bs-toggle', 'modal');
    btnUpdate.setAttribute('data-bs-target', '#registro');
	btnUpdate.innerHTML = '<i class="bi bi-pencil-square"></i>';
	btnUpdate.onclick = function(){
	    updateRegistro(row.getAttribute('id'));
	}
	row.children[8].appendChild(btnUpdate);
    
  
});
const updateForm = document.getElementById('registerForm')

function updateRegistro(id){
    //console.log(id);
    const fila = document.getElementById(id);
    const elementosfila = fila.getElementsByTagName('td')
    console.log(elementosfila[7].innerHTML)
    updateForm['edtNombre'].setAttribute('value', elementosfila[0].innerHTML) ;
    updateForm['edtCorreo'].setAttribute('value', elementosfila[1].innerHTML) ;
    updateForm['edtGenero'].setAttribute('value', elementosfila[2].innerHTML) ;
    updateForm['edtTelefono'].setAttribute('value', elementosfila[3].innerHTML);
    updateForm['edtTipo'].setAttribute('value', elementosfila[7].innerHTML);
    
}



updateForm.addEventListener('submit', (evento)=>{
    evento.preventDefault();
    const nombre = updateForm['edtNombre'];
    const genero = updateForm['edtGenero'];
    const rh = updateForm['lsRh'];
    const departamento = updateForm['lsDepartamento'];
    const ciudad = updateForm['lsCiudad'];
    const telefono = updateForm['edtTelefono'];
    const tipo = updateForm['edtTipo'];
    const correo = updateForm['edtCorreo'];


    registroAuth(nombre.value, genero.value, rh.value, departamento.value, ciudad.value, telefono.value,tipo.value, correo.value)
    console.log('Formulario de registro');
 
})

function registroAuth(nombre, genero, rh, departamento, ciudad, telefono, tipo, email){
    const registro = setDoc(doc(db, "DBusers", email),{
        nombre,
        genero,
        rh,
        telefono,
        departamento,
        ciudad,
        tipo,
        email,
      })
      updateForm.reset();
      const Modalregistro = document.getElementById('registro');
      const modalRegistro = bootstrap.Modal.getInstance(Modalregistro);
      modalRegistro.hide();
      showAlert('Registro Actualizado.', 'succes')
}