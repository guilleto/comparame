// template para renderizar imagenes en pagina home

const template_product = (array,destino)=>{
    array.forEach((element)=>{
        let card_product = document.createElement('div');
        card_product.className = "popular-card";

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

        let plus = document.createElement('i');
        plus.className = "fas fa-plus";

        add.appendChild(plus);
        
        card_product.appendChild(img);
        card_product.appendChild(info);
        card_product.appendChild(favorito);
        card_product.appendChild(add);

        destino.appendChild(card_product)
        
    })
}


//definir variables
const ctn_card_feautered = document.getElementById('content-cards');


window.onload = ()=>{
    
    fetch("https://comparame-api.herokuapp.com/product")
      .then(response => response.json())
      .then(result =>{
           console.log(result)
            template_product(result.data,ctn_card_feautered)



        }).catch(error => console.log('error', error));
}