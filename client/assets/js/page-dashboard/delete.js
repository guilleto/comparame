const form_delete = document.getElementById('form-delete');
const id_product_delete = document.getElementById('id_product_delete')

form_delete.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", datos_user.token);
    let raw = JSON.stringify({
        "ProductID": id_product_delete.value
    });
    
      const requestOptions = {
        method:'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      fetch("https://comparame-api.herokuapp.com/product", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if(result.status){
              Swal.fire({
                icon:'success',
                title:'Operacion exitosa ',
                text:'El producto se a eliminado exitosamente'
              })
            }
            if(!result.status){
              Swal.fire({
                icon:'error',
                title:'Error...',
                text:'Upss no se pudo eliminar el producto vuelva intentarlo'
              })
            }
        })
      .catch(error =>{ 
          console.log('error', error)
          Swal.fire({
            icon:'error',
            title:'Error...',
            text:'Upss... hubo un error, vuelva intentarlo'
          })
        });
})