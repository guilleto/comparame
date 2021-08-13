const ctn_card_favorite = document.getElementById('ctn-favorite-card')

var myHeaders = new Headers();
myHeaders.append("Authorization", user_token);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://comparame-api.herokuapp.com/user/favoriteProducts", requestOptions)
  .then(response => response.json())
  .then(result => {
       console.log(result) 
    //    console.log(result.products.favorite_products)
       if(result.status){
          if(result.products.favorite_products.length==0){
              ctn_card_favorite.innerHTML = template_empty()
          }else{
           favorite_products(result.products.favorite_products)
       }
      }
    })
  .catch(error => console.log('error', error));


 //template para prodcut favopritos

 const favorite_products = (array)=>{
    array.forEach((element)=>{
        let card_product = document.createElement('div');
        card_product.className = "favoritos-card";

        let img = document.createElement('img');
        img.className = "img"
        img.src = "assets/img/noFound.png";

        let info = document.createElement('div');
        info.className= "info";

        let name = document.createElement('p');
        name.textContent = cut_text(element.product_name);
        name.className = "name";

        let ubicacion = document.createElement('div');
        ubicacion.className = "ubicacion";

        let location = document.createElement('i');
        location.className = " fas fa-location-arrow"; 

        let discount = document.createElement('p');
        discount.textContent =  delete_cero(element.product_discount)  ;
        discount.className = "tienda";
        
        ubicacion.appendChild(location);
        ubicacion.appendChild(discount); 

        let precio = document.createElement('p');
        precio.className = "precio";
        precio.textContent = element.product_price;

        // info.appendChild(name);
        info.appendChild(ubicacion);
        info.appendChild(precio);

        let add = document.createElement('div');
        add.className = "add";

        let trash = document.createElement('i');
        trash.className = "far fa-trash-alt";
        trash.id = element._id

        add.appendChild(trash);


       let ctn_info = document.createElement('div')
       ctn_info.className = "ctn-informacion"

       ctn_info.appendChild(info)
       ctn_info.appendChild(trash)

        
        card_product.appendChild(img);
        card_product.appendChild(name) ;
        card_product.appendChild(ctn_info);
  

        ctn_card_favorite.appendChild(card_product)
        
    })
}
 
const template_empty = ()=>{
  return `
  <div class="empty">
        <h2 class="title-empty">Uups!,   Aun no tienes elementos agregados a favoritos</h2>
        <img class="img-empty" src="assets/img/animation-error.jpg" >  
  </div>
  
  `
}

const cut_text = (text)=>{
  if(text.length >19){
      return text.slice(0,19)
  }else{
      return text
  }
}

const delete_cero = (num)=>{
  if(num==0 || num == null){
    return ""
  }else{
    return num + " %"
  }
}