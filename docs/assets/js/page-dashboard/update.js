//actualizar productos

const id_producto_update = document.getElementById('select-product-update');
const name_update = document.getElementById('product-name-update');
const price_update = document.getElementById('product-price-update');
const status_update =document.getElementById('product-status-update');
const discount_update = document.getElementById('discount-update');
const feautered_update =document.getElementById('feautered-update');
const form_update = document.getElementById('form-update');

form_update.addEventListener('submit',(e)=>{
    e.preventDefault()
    const datos_market = JSON.parse(localStorage.getItem('datos-market'))


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", datos_user.token);
    let raw = JSON.stringify({
        "supermarketID": datos_market._id,
        "productID": id_producto_update.value,
        "product_name": name_update.value,
        "product_price": price_update.value,
        "product_discount": discount_update.value
    });
    
      const requestOptions = {
        method:'PUT',
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
                text:'El producto se a actualizado exitosamente'
              })
            }
            if(!result.status){
              Swal.fire({
                icon:'error',
                title:'Error...',
                text:'Upss no se pudo actualizar el producto vuelva intentarlo'
              })
            }
        })
      .catch(error => console.log('error', error));
});


