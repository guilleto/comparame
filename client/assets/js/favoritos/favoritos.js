//function para agregar a favoritos
const add_Favoritos = (id,token)=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);

    var raw = JSON.stringify({
    "productID": id
    });

    fetch("https://comparame-api.herokuapp.com/user/favoriteProducts", {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    })
    .then(response => response.json())
    .then(result =>{
         console.log(result)
         if(result.status){
             Swal.fire({
                 icon:'success',
                 title:'guardado exitoso'
                })
            }
    })
    .catch(error => console.log('error', error));
}


let token = localStorage.getItem('validation')
ctn_card_feautered.addEventListener('click',(e)=>{
    // console.log(e.target.className)
    if(e.target.className === "far","fas"){
        // console.log('favorito');
        if(token && token != null){
      
            // console.log(e.target)
            let _id = e.target.parentNode.id
           add_Favoritos(_id,user_token)
            
        }
        if(user_token , token==null){
            Swal.fire({
                icon:'error',
                title:'Debes iniciar  seccion',
                text:'inicia seccion para poder guardar este producto en favoritos'
            })
        }
    }
})
