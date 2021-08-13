// template para renderizar imagenes en pagina home

const template_product = (array,destino)=>{
    array.forEach((element)=>{
        let card_product = document.createElement('div');
        card_product.className = "popular-card swiper-slide";

        let img = document.createElement('img');
        img.className = "img"
        img.src = "assets/img/noFound.png";

        let info = document.createElement('div');
        info.className= "info";

        let name = document.createElement('p');
        name.textContent = recortar_text(element.product_name);
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
        precio.textContent = "$ "+element.product_price;

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
        plus.id = element._id

        add.appendChild(plus);
        
        card_product.appendChild(img);
        // /card_product.appendChild(name);
        card_product.appendChild(info);


        let ctn_action = document.createElement('div');
        ctn_action.className = "ctn-action" ;
        ctn_action.appendChild(favorito);
        ctn_action.appendChild(add);

        // card_product.appendChild(favorito);
        // card_product.appendChild(add);
        card_product.appendChild(ctn_action);
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
           if(result.status){
               template_product(result.data,ctn_card_feautered)
               run_sliders_products()
           }
        }).catch(error => console.log('error', error));
}



const recortar_text = (text)=>{
    if(text.length >19){
        return text.slice(0,19)
    }else{
        return text
    }
}
const ctn_outstanding = document.getElementById('ctn-outstanding')

const print_outstanding =  ()=>{
    fetch("https://comparame-api.herokuapp.com/product")
    .then(response => response.json())
    .then(result =>{
        //  console.log(result)
         const product_outstanding = result.data.filter((element)=>{
            return element.product_feautered
         })
        //  console.log(product_outstanding)
          template_product(product_outstanding,ctn_outstanding)
          run_slider_outstanding()
      }).catch(error => console.log('error', error));
}

print_outstanding()