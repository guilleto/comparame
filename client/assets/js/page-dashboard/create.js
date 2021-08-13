// body = {
//     "supermarketID": "608f353001889d4583314803",
//     "product_name": "Huevos",
//     "product_price": 17000,
//     "product_discount": 0,
//     "product_feautered": false
// }



const datos_user = JSON.parse(localStorage.getItem('datos-log'));

const form_add = document.getElementById('form-add');
const name_product = document.getElementById('name-add');
const price_product = document.getElementById('price-add')
const discount = document.getElementById('discount-add');
const feautered = document.getElementById('feautered-add');
const message_update = document.getElementById('message-update') 

form_add.addEventListener('submit',(e)=>{
  e.preventDefault();
  const datos_market = JSON.parse(localStorage.getItem('datos-market'))


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", datos_user.token);
    let raw = JSON.stringify({
        "supermarketID": datos_market._id,
        "product_name": name_product.value,
        "product_price": price_product.value,
        "product_discount": discount.value,
        "product_feautered": feautered.value
    });
    
      const requestOptions = {
        method:'POST',
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
                text:'El producto se a creado exitosamente'
              })
            }
            if(!result.status){
              Swal.fire({
                icon:'error',
                title:'Error...',
                text:'Upss no se pudo crear el producto vuelva intentarlo'
              })
            }
        })
      .catch(error => console.log('error', error));
})






