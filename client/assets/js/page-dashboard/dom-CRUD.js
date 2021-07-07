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