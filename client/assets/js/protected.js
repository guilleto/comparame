const user_token = localStorage.getItem('key-user');
const authentication_token = async (token)=>{
    const res = await fetch('https://comparame-api.herokuapp.com/user/authenticate',{
        method:'GET',
        headers:{
            'Authorization' : user_token 
        }
    })
    const reponse = await res.JSON()
    return reponse
}
// if(typeof(user_token)=="string"){
//     const validar= autentication(user_token);
//     if(validar.status){
//     }
// }

(async()=>{
    if(user_token){
        try{
            const authenticate = await authentication_token(user_token);
            if(!authenticate.status){
                window.location.replace('./index.html');
            }
        }
        catch(err){
            window.location.replace('./index.html');
       }
    }else{
        window.location.replace('./index.html')
    }
})();
if(typeof(user_token)=="object"){
    window.location.replace('./index.html')
}else{
    window.location.replace('./index.html')
}
//proteger rutar
