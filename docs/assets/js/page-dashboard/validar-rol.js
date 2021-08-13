//proteger ruta del dashboard mediante una validacion de rol
//si no cumple lo estipulado se devuelve a inicio 


const loader = document.getElementById('ctn-loader');
const key_user = localStorage.getItem('key-user')
const datos_user_login = JSON.parse(localStorage.getItem('datos-log'));
const infor_market = JSON.parse(localStorage.getItem('datos-market'))


fetch('https://comparame-api.herokuapp.com/rol')
.then(res=>res.json())
.then(resp =>{
    console.log(resp)
    if(!resp.status){
        window.location.replace('./index.html')
    }
    if(resp.data[0]._id == datos_user_login.user.rol){
        loader.style.display = "none"
        // resquest_market(datos_user_login.user._id)
    }else{
        window.location.replace('./index.html')
    }

}).catch(err=>{
    //si no es validod o hay un error devolverlo a la pagina inicio
    window.location.replace('./index.html')
})


if(!infor_market){
        //--------------------------llamar datos 
        fetch("https://comparame-api.herokuapp.com/supermarket/",{
            method:'GET'
        })
        .then(response => response.json())
        .then(result =>{ 
            // console.log(result)
            if(result.status){
                let supermarkets = result.data.supermarkets.filter((e)=>{
                          if( e.userID == datos_user_login.user._id){
                              return  e
                          }
                        })
                    localStorage.setItem('datos-market',JSON.stringify(supermarkets[0]));
                }
                if(!result.status){
                    Swal.fire({
                        icon:'error',
                        title:'Error'
                    })
      
                }
            })
            .catch(error =>{ 
                console.log('error', error)
                Swal.fire({
                    icon:'error',
                    title:'Error'
                })
            });
}