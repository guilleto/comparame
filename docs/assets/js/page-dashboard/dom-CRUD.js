const add = document.getElementById('add');
const eliminar = document.getElementById('delete');
const update = document.getElementById('update');

const link_add = document.getElementById('link-add')
const link_delet = document.getElementById('link-delet');
const link_update = document.getElementById('link-update');




link_add.addEventListener('click',()=>{
    add.style.display = "flex";
    eliminar.style.display = "none";
    update.style.display = "none";
})


link_delet.addEventListener('click',()=>{
    eliminar.style.display = "flex"
    update.style.display = "none";
    add.style.display = "none";
    const datos_market = JSON.parse(localStorage.getItem('datos-market'));
    fetch(`https://comparame-api.herokuapp.com/supermarket/products/${datos_market._id}`)
    .then(res=> res.json())
    .then(result =>{
        console.log(result)
        if(result.status){
            result.products.forEach(element => {
                let id_product = document.createElement('option');
                // id_product.setAttribute('value',element._id);
                id_product.value = element._id
                id_product.textContent = element.product_name;
                id_product_delete.appendChild(id_product)
            });
        }
    })
})

link_update.addEventListener('click',()=>{
    update.style.display = "flex";
    eliminar.style.display = "none"
    add.style.display = "none";
    const datos_market = JSON.parse(localStorage.getItem('datos-market'));
    fetch(`https://comparame-api.herokuapp.com/supermarket/products/${datos_market._id}`)
    .then(res=> res.json())
    .then(result =>{
        console.log(result)
        if(result.status){
            result.products.forEach(element => {
                let id_product = document.createElement('option');
                // id_product.setAttribute('value',element._id);
                id_product.value = element._id
                id_product.textContent = element.product_name;
                id_producto_update.appendChild(id_product)
            });
        }
    })
})


//definir varibles
const ctn_list_product = document.getElementById('list-product')


//renderizar los productos con los que el cliente cuenta
const data_market = JSON.parse(localStorage.getItem('datos-market'));
fetch(`https://comparame-api.herokuapp.com/supermarket/products/${data_market._id}`)
  .then(response => response.json())
  .then(result =>{ 
    //   console.log(result.products)
      if(result.status){
          template_product(result.products,ctn_list_product)
      }

    }).catch(error => console.log('error', error));


//template para imprimir productos

const template_product = (array,destino)=>{
  array.forEach((element)=>{
      console.log(element)
      let container = document.createElement('div');
        container.className = "owen-product"

      let img = document.createElement('img');
        img.src = "assets/img/noFound.png";
        img.className = "img-product";

      let name = document.createElement('h3');
      name.textContent = element.product_name;
      name.className = "name-product m-b";
      let price = document.createElement('h3');
      price.textContent = "$ "+element.product_price; 
      price.className = "price-product m-b";

      let discount = document.createElement('h4');
      discount.textContent = element.product_discount +" %"
      discount.className = "discount-product m-b"
      

      container.appendChild(img);
      container.appendChild(name);
      container.appendChild(price);
      container.appendChild(discount);
      destino.appendChild(container);
  })
}
