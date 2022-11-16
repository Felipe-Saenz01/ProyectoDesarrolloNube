export function showAlert(mensaje, tipo){
    let color;
    if(tipo === 'succes'){
        color = "linear-gradient(90deg, rgba(10,112,7,1) 2%, rgba(54,236,35,1) 96%)";
    }else if (tipo === 'alert'){
        color = "linear-gradient(90deg, rgba(231,146,14,1) 2%, rgba(242,238,0,1) 96%)";
    }else{
        color = "linear-gradient(90deg, rgba(159,2,2,1) 2%, rgba(255,104,64,1) 96%)"
    }
    Toastify({
        text: mensaje,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: color,
        },
        onClick: function(){
            if(tipo === "succes"){
                location.reload();
            }
        } // Callback after click
      }).showToast();
}