const user_token = localStorage.getItem('key-user');
const loader = document.getElementById('ctn-loader');
    async function authentication_token() {
        const res = await fetch('https://comparame-api.herokuapp.com/user/authenticate', {
            method: 'GET',
            headers: {
                'Authorization': user_token
            }
        })
        const response = await res.json()
        respuesta_api = response
    }
    authentication_token()
    let respuesta_api 
// if(typeof(user_token)=="string"){
//     const validar= autentication(user_token);
//     if(validar.status){
    //     }
    // }
    //proteger rutar
    setTimeout(()=>{
        if(respuesta_api.status){
            loader.style.display = "none"
        }else{
            window.location.replace('./index.html')
        }
    },9000)
// (async () => {
//     if (respuesta_api.status){
//         try {
//             const authenticate = await authentication_token();
//             if (authenticate.status) {
//                 window.location.replace('./miLista.html')
//                 loader.style.display = "none"
//             }
//             if (!authenticate.status) {
//                 window.location.replace('./index.html');
//             }
//         }
//         catch (err) {
//             window.location.replace('./index.html');
//         }
//     }
// })();
if (user_token == null) {
    window.location.replace('./index.html')
} 
// else {
//     window.location.replace('./index.html')
// }
