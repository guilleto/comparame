
///----------------------------------------------------
const form_login_requet = document.getElementById('form-login-required');
form_login_requet.addEventListener('submit', (e) => {
  e.preventDefault()
  let dataform = new FormData(form_login_requet)

  var raw = JSON.stringify({
    "email": dataform.get('email'),
    "password": dataform.get('password')
  });

  var requestOptions = {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: raw,
    redirect: 'follow'
  };

  fetch("https://comparame-api.herokuapp.com/user/login", requestOptions)
    .then(response => response.json())
    .then(result => {
      if (!result.status) {
        alert('Informacion invalidad ')
        // window.location.href('')
      }
      if (result.status) {
        localStorage.setItem('datos-log', JSON.stringify(result))
        ctn_change_rol.style.display = "flex"
        form_login_requet.style.display = "none"
      }
    })
    .catch(error => {
      alert("Uuups hubo problemas, intente nuevamente ")
    });
})




const ctn_change_rol = document.getElementById('change-rol');
const form_change_rol = document.getElementById('form-point')
const value_name_point = document.getElementById('value-name-point');
const file_img_potin = document.getElementById('img-create-point');



form_change_rol.addEventListener('submit', (e) => {
  e.preventDefault()
  
  const datos_user = JSON.parse(localStorage.getItem('datos-log'));

  let myHeaders = new Headers();
  myHeaders.append("Authorization", datos_user.token);

  let formdata = new FormData();
  formdata.append("supermarketName", value_name_point.value);
  formdata.append("supermarketLogo", file_img_potin.files[0], "[PROXY]");

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  // window.open('./page-supermarkert.html');

  fetch("https://comparame-api.herokuapp.com/user/upgradeToSupermarker", requestOptions)
    .then(response => response.json())
    .then(result =>{
      console.log(result)
      if(result.status){
          Swal.fire({
              icon: 'success',
              title: 'Operacion exitosa',
              text: 'Ahora puedes comenzar a administrar tu supermercado'
          })
        window.location.replace('./page-supermarkert.html')
      }else{
        Swal.fire(
          {
            icon: 'error',
            title: 'Error',
            text: 'Hiciste algo mal, vuelve a intentarlo',
          }
        )
        // alert("Uuups.. Hay problemas, Te faltaron campos por llenar")
        // Window.reload()
      }
    }) 
    .catch(error =>{
      // alert("Algo salio mal, vuelve a intentarlo")
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salio mal, vuelve a intentarlo',
      })
      console.log('error', error);
    })

})



