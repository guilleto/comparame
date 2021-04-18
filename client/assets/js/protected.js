const user_token = localStorage.getItem('key-user');
const autentication = async (tok)=>{
    const res = await fetch('https://comparame-api.herokuapp.com/user/authenticate',{
        method:'GET',
        headers:{
            'Authorization' : user_token 
        }
    })
    const reponse = await res.JSON()
    return reponse
}
if(typeof(user_token)=="string"){
    const validar= autentication(user_token);
    if(validar.status){
    }
}
if(typeof(user_token)=="object"){
    window.location.replace('./index.html')
}else{
    window.location.replace('./index.html')
}