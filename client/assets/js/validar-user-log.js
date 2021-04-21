const user_token = localStorage.getItem('key-user');
const menu_log = document.getElementById('menu-log');
const menu_user = document.getElementById('menu-user')
let responses
const autentication_token = (tok)=>{
    fetch('https://comparame-api.herokuapp.com/user/authenticate',{
        method:'GET',
        headers:{
            'Authorization' : user_token 
        }
    })
    .then(res => res.json())
    .then((resp)=>{
        responses = resp
    })
}

if(typeof(user_token)=="string"){
    autentication_token(user_token) 
    setTimeout(()=>{
        if(responses.status){
            menu_log.style.display = "none"
            menu_user.style.display = "flex"
        }
    },4000)
}else{
    console.log('error')
}