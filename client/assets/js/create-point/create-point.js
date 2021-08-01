//definir variables para crear un punto fisico
const value_name_point = document.getElementById('value-name-point');
const file_img_potin = document.getElementById('img-create-point');
const form_point = document.getElementById('form-point');

const note_create_point = document.getElementById('note-create-hard')



const validar_datos_hard = ()=>{
  if(value_name_point.value.length > 0 && file_img_potin.value.length > 0 ){
    return true
  }else{
      note_create_point.textContent = "Faltan datos por llenar";
      note_create_point.className = "note-error-hard fx-center "
    // return false
  }
}


const blob_file = file_img_potin.files[0];
const localizacion = localStorage.getItem('coordenadas');
const info_user = JSON.parse(localStorage.getItem('datos-log'))

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", info_user.token);

// var formdata = new FormData(form_point);
// formdata.append("supermarketID", info_user.user._id);
// formdata.append("headsquareLocation", localizacion);
// formdata.append("headsquareName", "Exito de aranjuez");
// formdata.append("headsquarePhoto", fileInput.files[0], "[PROXY]");
// window.confirm("mensaje")


form_point.addEventListener('submit',(e)=>{
  e.preventDefault()
  const validate = validar_datos_hard();
  if(validate){
    let formdata = new FormData(form_point);
    formdata.append("supermarketID", info_user.user._id);
    formdata.append("headsquareLocation", localizacion);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    fetch("https://comparame-api.herokuapp.com/supermarket/headsquare", requestOptions)
      .then(response => response.json())
      .then(result =>{
       console.log(result);
        note_create_point.textContent = "Operacion exitosa!!";
        note_create_point.className = "fx-center succes-hard";

      }).catch(error => {
        console.log('error', error);
        note_create_point.textContent = "Error!! Intente mas tarde";
        note_create_point.className = "note-error-hard fx-center "

      });
    }
  })