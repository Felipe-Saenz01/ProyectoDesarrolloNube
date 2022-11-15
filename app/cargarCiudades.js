const Departamentos=[
    {nombre: "Bogotá DC", ciudades: ["Bogotá DC"]},
    {nombre: "Casanare", ciudades: ["Yopal","Aguazul", "Maní", "Tamara", "Monterrey"] },
    {nombre: "Cundinamarca", ciudades: ["Chocontá", "Funza", "Girardot", "Guaduas", "Jerusalén"]},
    {nombre: "Antioquia", ciudades: ["Medellín", "Abejorral", "Armenia", "Bello", "Ciudad Bolívar"]},
    {nombre: "Boyaca", ciudades: ["Tunja", "Duitama", "Sogamoso", "Socha", "Paipa"]}
]

const listaDepartamentos = document.getElementById("lsDepartamento");
const listaCiudades = document.getElementById("lsCiudad");

Departamentos.map(elemento =>{
    const option = document.createElement('option');
    option.value = elemento.nombre;
    option.text = elemento.nombre;
    option.id = elemento.nombre;
    listaDepartamentos.add(option);
})

window.addEventListener('DOMContentLoaded', () =>{
    listaDepartamentos.addEventListener("change", cargarCiudades);
})


function crearOption(valor){
    const option = document.createElement('option');
    option.value = valor;
    option.text = valor;
    return option;
}

function cargarCiudades(){
    Departamentos.map(elemento => {
        if(elemento.nombre === listaDepartamentos.options[listaDepartamentos.selectedIndex].value){
            listaCiudades.options.length =1;
            for (let a = 0; a < elemento.ciudades.length; a++) {
                listaCiudades.add(crearOption(elemento.ciudades[a])); 
            }
        }
    })
}