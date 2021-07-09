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
           favorite_products(result.products.favorite_products)
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
        name.textContent = element.product_name;
        name.className = "name";

        let ubicacion = document.createElement('div');
        ubicacion.className = "ubicacion";

        let location = document.createElement('i');
        location.className = " fas fa-location-arrow"; 

        let discount = document.createElement('p');
        discount.textContent =  element.product_discount + " %" ;
        discount.className = "tienda";
        
        ubicacion.appendChild(location);
        ubicacion.appendChild(discount); 

        let precio = document.createElement('p');
        precio.className = "precio";
        precio.textContent = element.product_price;

        info.appendChild(name);
        info.appendChild(ubicacion);
        info.appendChild(precio);

        let favorito = document.createElement('div');
        favorito.className = "favorito";
        favorito.id = element._id
        // favorito.setAttribute('id',element._id)

        let far = document.createElement('i');
        far.className = "far fa-heart";

        let fas = document.createElement('i');
        fas.className = "fas fa-heart";

        favorito.appendChild(far);
        favorito.appendChild(fas);

        let add = document.createElement('div');
        add.className = "add";

        let trash = document.createElement('i');
        trash.className = "far fa-trash-alt";
        trash.id = element._id

        add.appendChild(trash);
        
        card_product.appendChild(img);
        card_product.appendChild(info);
        card_product.appendChild(favorito);
        card_product.appendChild(trash);

        ctn_card_favorite.appendChild(card_product)
        
    })
}
 