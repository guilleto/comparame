ctn_card_favorite.addEventListener('click',(e)=>{
    // console.log(e.target.tagName)
    if(e.target.className =="far fa-trash-alt"){
        console.log(e.target.id)
        if(delete_product(e.target.id,user_token)){
            let elemento = e.target.parentNode
            ctn_card_favorite.removeChild(elemento.parentNode)
        }
    }
})


// hacer un request eliminando un producto de la lista de favoritos

const delete_product = (id,token)=>{
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);

    var raw = JSON.stringify({
        "productID": id
    });

    let requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("https://comparame-api.herokuapp.com/user/favoriteProducts", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        if(result.status){
            Swal.fire({
                icon:'success',
                title:'Operacion exitosa',
                text:'El product ha sido eliminado exitosamente!'
            })
            return true
        }
    })
    .catch(error => console.log('error', error));
}