//inicialiar variables
const input_password_sign = document.getElementById('input-password')
const input_email = document.getElementById('input_email')
const form_sign = document.getElementById('form-sign')
const note_error = document.getElementById('note_error')
//validar que este todo llenos
var campos_sign_in = {
    email:false,
    password:false
}
async function resquet(url){
    const res = await url
    const resp = await res.json()
    return resp
}
input_password_sign.addEventListener('input',()=>{
    const respon = resquet()
    if(input_password.value === respon){
        campos_sign_in.password = true
    }
})
input_email.addEventListener('input',()=>{
    const respon = resquet()
    if(input_email.value === respon){
        campos_sign_in.email = true
    }
})
form_sign.addEventListener('click',()=>{
    note_error.style.display = "none"
})
form_sign.addEventListener("submit",(e)=>{
 if(campos_sign_in.email && campos_sign_in.password){
 }else{
     e.preventDefault()
     note_error.style.display = "inline-block"
 }
})
