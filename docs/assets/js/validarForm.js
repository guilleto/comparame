// generear las expreciones de restriccion
const expreciones = {
  username: /^[a-zA-Z0-9\_\-]{1,16}$/,
  name: /^[a-zA-ZÀ-ÿ\s]{1,48}$/,
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  password: /^.{4,22}$/,
};
//deben de estar todos los campos llenos para poder enviar informacion validad
var campos = {
  username: false,
  name: false,
  lastname: false,
  email: false,
  password: false
};
//inicializar variables
const form = document.getElementById("form");
const input_name = document.getElementById("input_name");
const input_lastName = document.getElementById("input_lastName");
const input_userName = document.getElementById("input_userName");
const input_email = document.getElementById("input_email");
const input_terminos = document.getElementById('input-terminos');
// const input_rol = document.querySelectorAll('.slt-rol');
const ctn_response_false = document.getElementById('ctn-response-false');
const ctn_response_true = document.getElementById('ctn-response-true');
//funcion para resalizar peticiones a la base datos
async function resquet_BD(url) {
  const resp = await fetch(url);
  const res = await resp.json();
  return res;
}
//functinon que me permite mostrar si esta correcto
function show_right(input, icon) {
  let input_in = document.getElementById(input);
  let icon_in = document.getElementById(icon);
  icon_in.className = "far";
  input_in.style.borderColor = " #3CD404 ";
  icon_in.style.color = " #3CD404 ";
  icon_in.classList.toggle("fa-check-circle");
  if (icon_in.classList == "fa-times-circle") {
    icon_in.classList.toggle("fa-times-circle");
  }
}
//mostrar error y ocultar el estilo de correcto
const show_wrong = (input, icon) => {
  let input_in = document.getElementById(input);
  let icon_in = document.getElementById(icon);
  icon_in.className = "far";
  input_in.style.borderColor = " #F32D05";
  icon_in.style.color = " #F32D05";
  icon_in.classList.toggle("fa-times-circle");
  if (icon_in.classList == "fa-check-circle") {
    icon_in.classList.toggle("fa-check-circle");
  }
};

//validar campo de nombre
input_name.addEventListener("input", () => {
  if (input_name.value.length > 0) {
    campos.name = true;
    show_right("input_name", "icon_name");
    if (expreciones.name.test(input_name.value) == false) {
      campos.name = false;
      show_wrong("input_name", "icon_name");
    }
  } else {
    input_name.style.borderColor = " #e4e0e0";
    document
      .getElementById("icon_name")
      .classList.remove("fa-times-circle", "fa-check-circle");
  }
});
//validar campo de apellido
input_lastName.addEventListener("input", () => {
  if (input_lastName.value.length > 0) {
    campos.lastname = true;
    show_right("input_lastName", "icon_lastname");
    if (expreciones.name.test(input_lastName.value) == false) {
      campos.lastname = false;
      show_wrong("input_lastName", "icon_lastname");
    }
  } else {
    input_lastName.style.borderColor = " #e4e0e0";
    document
      .getElementById("icon_lastname")
      .classList.remove("fa-times-circle", "fa-check-circle");
  }
});
//validando el campo del nombres de usuario con estilos
//definir variables para este campo
const note_userName = document.getElementById("note_userName");
const note_check_user = document.getElementById("check_user");
input_userName.addEventListener("input", () => {
  note_userName.style.display = "none";
  note_check_user.style.display = "none";
  // const resp ;
  if (input_userName.value.length > 0) {
    if (
      expreciones.username.test(input_userName.value) == false
    ) {
      campos.username = false;
      show_wrong("input_userName", "icon_userName");
      note_userName.style.display = "inline-block";
      // if ( resp == input_userName.value) {
      //   note_userName.style.display = "none";
      //   note_check_user.style.display = "inline-block";
      // }
    } else {
      campos.username = true;
      show_right("input_userName", "icon_userName");
    }
  } else {
    input_userName.style.borderColor = " #e4e0e0";
    document
      .getElementById("icon_userName")
      .classList.remove("fa-times-circle", "fa-check-circle");
  }
});
//validar  campo de email con stylos
input_email.addEventListener("input", () => {
  if (input_email.value.length > 0) {
    if (
      expreciones.email.test(input_email.value) == false
    ) {
      campos.email = false;
      show_wrong("input_email", "icon_email");
    } else {
      campos.email = true;
      show_right("input_email", "icon_email");
    }
  } else {
    input_email.style.borderColor = " #e4e0e0";
    document
      .getElementById("icon_email")
      .classList.remove("fa-times-circle", "fa-check-circle");
  }
});
//validar el campo de password
input_password.addEventListener("input", () => {
  const note_password = document.getElementById("note_password");
  note_password.style.display = "none";
  if (input_password.value.length > 0) {
    campos.password = true;
    input_password.style.borderColor = " #3CD404 ";
    if (
      expreciones.password.test(input_password.value) == false
    ) {
      campos.password = false;
      input_password.style.borderColor = " #F32D05 ";
      note_password.style.display = "inline-block";
    }
  } else {
    input_password.style.borderColor = " #e4e0e0";
  }
});
//validar que todo el formulario este completo para enviar los datos
//inicializar variables
const messega_error = document.getElementById("message_error");
form.addEventListener("click", () => {
  messega_error.style.display = "none";
});

//validar el rol
let code_rol;
async function resquet(){
  const req = await fetch('https://comparame-api.herokuapp.com/rol');
  roles = await req.json();
  code_rol = roles.data[1]._id;
}
resquet()
// input_rol[0].addEventListener('click', ()=>{
//   //  const type_rol = e.target.value
//    campos.rol = true;
//      code_rol = roles.data[0]._id;
//   }) 
// input_rol[1].addEventListener('click',()=>{
//   // const type_rol = e.target.value
//   campos.rol = true;
//     code_rol = roles.data[1]._id;
// });







form.addEventListener("submit", (e) => {
  e.preventDefault()
  if (
    campos.name &&
    campos.lastname &&
    campos.username &&
    campos.email &&
    campos.password
  ) {
    fetch('https://comparame-api.herokuapp.com/user/register',{
      method: 'POST',
      headers:{
       'content-type' : 'application/json'
      },
      body: JSON.stringify( {
        "rolID": code_rol,
        "username": input_userName.value,
        "email": input_email.value,
        "password": input_password.value,
        "first_name": input_name.value,
        "last_name": input_lastName.value
      })
    })
    .then(resp => resp.json())
    .then((data) => {
      const response = data;
      console.log(data)
      if(response.status == false ){
        ctn_response_false.innerHTML = response.message;
        ctn_response_false.style.display = "inline-block";
      }
      if(response.status){
        ctn_response_true.innerHTML = response.message;
        ctn_response_true.style.display = "inline-block";
        // let message = window.confirm('¿Desea crear un supermercado? "pulsa Aceptar"  O ¿continuar como usuario normal ? "pulsa Cancelar"');
        // if(message){
        //   window.location.replace('./change-rol.html')
        // }else{
        //   window.location.replace('./page-log-in.html')
        // }
        Swal.fire({
          icon:'question',
          title: 'Deseas crear un supermercado?',
          text:'Crea tu propio super en nuestra pagina o continua normal',
          showDenyButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.replace('./change-rol.html')
          } else if (result.isDenied) {
            window.location.replace('./page-log-in.html')
          }
        })

      }
    
      }).catch((err)=>{
        Swal.fire({
          icon:'error',
          title:'Error',
          text:'intente nuevamente'
        })
      console.log('error en el registro '+ err)
    })
  } else {
    messega_error.style.display = "inline-block";
  }
});
