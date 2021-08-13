// const form_headsquare =  document.getElementById('form-headsquare');
const form_headsquare = document.forms['form-headsquare']
const ctn_step_extra = document.getElementById('ctn-step-extra')
const input_location = document.getElementById('input-location')

const input_coordenadas = document.getElementById('input-coordenadas')
const input_file = document.getElementById('headsquarePhoto')

//llamar a local estorage con los datos almacenados de login
const data_market = JSON.parse(localStorage.getItem('datos-market'))
const data_user = JSON.parse(localStorage.getItem('datos-log'))


let browser_coordenadas = {
    "latitude":"", 
    "longitude":""
};

const run_code_location = ()=>{
    if(form_headsquare.permits.checked){
        if('geolocation'in navigator){
            try{
                function error(error){
                    console.log("no aceptaron permisos de location")
                    ctn_step_extra.style.display = "inline-block"
                    input_location.style.display = "inline"
                }
                function success(position){
                    browser_coordenadas.latitude = position.coords.latitude
                    browser_coordenadas.longitude = position.coords.longitude
                    form_validate_headsquare.location.broswer = true;
                }
                navigator.geolocation.getCurrentPosition(success,error)
            }catch(err){
                console.log(err)
                ctn_step_extra.style.display = "inline-block"
                input_location.style.display = "inline"
                form_validate_headsquare.location.broswer = false;
            }
        }else{
            ctn_step_extra.style.display = "inline-block"
            input_location.style.display = "inline"
            form_validate_headsquare.location.broswer = false;

        }
    }else{
        // console.log("checked esta en false")
    }

};



const split_coords = (input_value)=>{
    const coords = input_value.split(',')
    return {
        "latitude":`${coords[0]}` ,
    "longitude":`${coords[1]}` 
    }
}

const form_validate_headsquare ={
    name:false,
    photo:false,
    location:{
        broswer:false,
        manual:false
    }
}

let location_manual
form_headsquare.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(!form_validate_headsquare.location.broswer){
        if(input_coordenadas.value.length>10){
            location_manual = split_coords(form_headsquare.coordenadas.value)
            form_validate_headsquare.location.manual= true;
        }
    }

    
    if(form_headsquare.headsquareName.value != ""){
        form_validate_headsquare.name = true;
    }
    if(form_headsquare.headsquarePhoto.value!=""){
        form_validate_headsquare.photo = true;
    }

    if(
        form_validate_headsquare.name&&
        form_validate_headsquare.photo
    ){
        if(form_validate_headsquare.location.manual){
            create_pyshical_point(data_user.token,data_market._id,location_manual,input_file,form_headsquare.headsquareName)
        }else{
            create_pyshical_point(data_user.token,data_market._id,browser_coordenadas,input_file,form_headsquare.headsquareName)

        }
    }else{
        Swal.fire({
            icon: "warning",
            title: "Faltan campos por rellenar!!"
        })
    }


})



const create_pyshical_point = (token,id_market,coords,files,name_user)=>{
    const  API_URL = "https://comparame-api.herokuapp.com";
    let json_coords = JSON.stringify(coords)
    // let myHeaders = new Headers();
    //     myHeaders.append("Authorization", token);
        let formdata = new FormData();
        formdata.append("supermarketID", id_market);
        formdata.append("headsquareLocation", json_coords);
        formdata.append("headsquareName", name_user);
        formdata.append("headsquarePhoto", files.files[0], "[PROXY]");
        let requestOptions = {
        method: 'POST',
        headers: {"Authorization":token},
        body: formdata,
        redirect: 'follow'
        };

        fetch(API_URL+"/supermarket/headsquare", requestOptions)
            .then(response => response.json())
            .then(result =>{ 
                console.log(result)
                if(result.status){
                    Swal.fire({
                        icon:"success",
                        title:"has creado exitosamente un punto fisico"
                    })
                }
                if(!result.status){
                    Swal.fire({
                        icon:"error",
                        title:"Error, datos invalidos vuelve a intentarlo"
                    })
                }
            })
            .catch(error => {
                console.log('error', error)
                Swal.fire({
                    icon:"error",
                    title:"Error, vuelve a intentarlo"
                })
            });
}