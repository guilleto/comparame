//inicialiar variables
const input_password_sign = document.getElementById('input-password')
const input_email = document.getElementById('input_email')
const form_sign = document.getElementById('form-sign')
const note_error = document.getElementById('note_error')
//validar que este todo llenos
//generar lugar de almacenamiento de la clave de seguridad
// localStorage.setItem('key-user',"")
var campos_sign_in = {
    email:false,
    password:false
}
const error_status = (input,status)=>{
    if('Email' == status.error){
        input.style.borderColor = "red"
    }
    if('Password'== status.error){
        input.style.borderColor = "red"
    }
}
input_password_sign.addEventListener('input',()=>{
    campos_sign_in.password = true

})
input_email.addEventListener('input',()=>{
    campos_sign_in.email = true
  
})
form_sign.addEventListener('click',()=>{
    note_error.style.display = "none"
})
form_sign.addEventListener("submit",(e)=>{
    e.preventDefault()
 if(campos_sign_in.email && campos_sign_in.password){
     console.log({
        'email': input_email.value,
        'password': input_password_sign.value
    })
    fetch('https://comparame-api.herokuapp.com/user/login',{
        method:'POST',
        headers:{
            'content-type' : 'application/json'
        },
        body:JSON.stringify({
            'email': input_email.value,
            'password': input_password_sign.value
        })
    })
    .then(res => res.json())
    .then((response)=>{
        console.log(response)
        if(response.status == true){
            let token = response.token
            localStorage.setItem('key-user',token)
            window.location.replace('./index.html')
        }
        if(response.status== false){
            note_error.style.display = "inline-block"
        }
    })
 }else{
     note_error.style.display = "inline-block"
 }
})
