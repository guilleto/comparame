const user_token = localStorage.getItem('key-user');
const menu_log = document.getElementById('menu-log');
const menu_user = document.getElementById('menu-user')
let response_resquest_autenticate
const autentication_token = (tok)=>{
    fetch('https://comparame-api.herokuapp.com/user/authenticate',{
        method:'GET',
        headers:{
            'Authorization' : tok
        }
    })
    .then(res => res.json())
    .then((resp)=>{
         response_resquest_autenticate = resp
    })
};
autentication_token(user_token)
//esparar a tener la respuesta si el toques es valido 
//proceder
setTimeout(()=>{
    if(typeof(user_token)=="string"){
        if(response_resquest_autenticate.status){
            menu_user.style.display = "flex"
            menu_log.style.display = "none"
            update_location(coords_longitude,coords_latitude,user_token)
        }
    }   
    },4000)
let coords_latitude;
let coords_longitude;

if('geolocation'in navigator){
    navigator.geolocation.getCurrentPosition((position)=>{
        coords_latitude = position.coords.latitude
        coords_longitude = position.coords.longitude
        localStorage.setItem('coordenadas',JSON.stringify(
            { latitude: position.coords.latitude,
            longitude:position.coords.latitude}
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