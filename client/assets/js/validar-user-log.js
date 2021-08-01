const user_token = localStorage.getItem('key-user');
const menu_log = document.getElementById('menu-log');
const menu_user = document.getElementById('menu-user');

const autentication_token = (tok)=>{
    fetch('https://comparame-api.herokuapp.com/user/authenticate',{
        method:'GET',
        headers:{
            'Authorization' : tok
        }
    })
    .then(res => res.json())
    .then((resp)=>{
        // console.log(resp)
        // console.log(resp.status)
        if(resp.status){
            localStorage.setItem('validation',resp.status)
            menu_user.style.display = "flex"
            menu_log.style.display = "none"
            setTimeout(()=>{
                update_location(coords_longitude,coords_latitude,user_token)
            },5000)
        }
        if(!resp.status){
            Swal.fire({
                icon:'error',
                title:'Tu token a expirado ',
                text:'vuelve a iniciar seccion para  poder continuar continuar  '
            })
        }
    })
};

//esparar a tener la respuesta si el toques es valido 
//proceder

( async ()=>{
    if(user_token!=null){
        autentication_token(user_token)
        //veificar que el usuario sea del rol admin super market

        const datos_user = JSON.parse(localStorage.getItem('datos-log'))
        const req = await fetch('https://comparame-api.herokuapp.com/rol');
        roles = await req.json();
        code_rol = roles.data[0]._id;
        if(code_rol == datos_user.user.rol){
            console.log("es un usuario con permiso de supermercado");
            let dashboard = document.createElement('a');
            dashboard.href = './page-supermarkert.html';
            dashboard.className = 'con-item';
            dashboard.textContent = 'Dashboard' 
            menu_user.appendChild(dashboard);
            resquest_market(datos_user.user._id)
            menu_user.removeChild( menu_user.children[1]);
            menu_user.removeChild( menu_user.children[1]);
        }

    }
})()



let coords_latitude;
let coords_longitude;

if('geolocation'in navigator){
    navigator.geolocation.getCurrentPosition((position)=>{
        coords_latitude = position.coords.latitude
        coords_longitude = position.coords.longitude
        localStorage.setItem('coordenadas',JSON.stringify(
            { latitude: position.coords.latitude,
            longitude:position.coords.longitude}
        ))
    })
}
const update_location = async(lon,lat,token)=>{
     const resp = await fetch('https://comparame-api.herokuapp.com/profile/location',{
        method:'PUT',
        headers:{
            'content-type' : 'application/json',
            'authorization': token
        },body:JSON.stringify({
            'latitude':lat,
            'longitude': lon
        })
    })
    const respuesta = await resp.json()
    return respuesta
}

// validar seccion 
//traer el super con el que el usuario esta administrando

const resquest_market = (idUser)=>{
    //--------------------------llamar datos 
    fetch("https://comparame-api.herokuapp.com/supermarket/",{
        method:'GET'
    })
    .then(response => response.json())
    .then(result =>{ 
        // console.log(result)
        if(result.status){
            let supermarkets = result.data.supermarkets.filter((e)=>{
                      if( e.userID == idUser){
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


