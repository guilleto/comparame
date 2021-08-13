const ctn_search = document.getElementById('container-search');
const input_value_search = document.getElementById('input-search')

const request_search = (keyword,max,min)=>{
    fetch(`https://comparame-api.herokuapp.com/product?name=${keyword}${max}${min}`)
    .then(response => response.json())
    .then(result =>{ 
        console.log(result)
        ctn_search.innerHTML = "";
        if(result.data.length==0){
            ctn_search.innerHTML= template_no_found(keyword)
        }
        if(result.status){
            template_get_products(result.data)
        }
    })
    .catch(error =>{ 
        console.log('error', error)
        ctn_search.innerHTML = template_error()
    });
}


input_value_search.addEventListener('keydown',(e)=>{
    // console.log(e.key)
    if(e.key == "Enter"){
        request_search(input_value_search.value,maxPrice,minPrice)
    }
})


const template_get_products = (array)=>{
    array.forEach((element)=>{
        let card_product = document.createElement('div');
        card_product.className = "search-card";

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
        discount.textContent =  element.product_discount==0? "": element.product_discount + " %" ;
        discount.className = "tienda";
        
        ubicacion.appendChild(discount); 
        ubicacion.appendChild(location);

        let precio = document.createElement('p');
        precio.className = "precio";
        precio.textContent ="$ " + element.product_price;

        // info.appendChild(name);
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
        trash.className = "fas fa-plus";
        trash.id = element._id

        add.appendChild(trash);

         let ctn_info = document.createElement('div');
        ctn_info.className = "ctn-info";
        
        let ctn_action = document.createElement('div')
        ctn_action.className = "ctn-action"
        ctn_action.appendChild(favorito)
        ctn_action.appendChild(add)
                
        ctn_info.appendChild(info)
        ctn_info.appendChild(ctn_action)

        card_product.appendChild(img);
        card_product.appendChild(name);
        card_product.appendChild(ctn_info);

        // card_product.appendChild(add);
        ctn_search.appendChild(card_product)
        
    })
}

//---------------filter------------


let minPrice = "";
let maxPrice = "";

//manipular y mostrar valor maximo y minimo

const ctn_maximo = document.getElementById('value-max');
const ctn_minimo = document.getElementById('value-min');

const range_max = document.getElementById('range-max');
const range_min = document.getElementById('range-min');

range_max.addEventListener('change',()=>{
    ctn_maximo.innerHTML = ": $ " + range_max.value
    maxPrice = "&maxPrice="+range_max.value
})


range_min.addEventListener('change',()=>{
    ctn_minimo.innerHTML = ": $ " + range_min.value
    minPrice = "&minPrice="+range_min.value
})




const template_no_found = (name)=>{
    return `
    <div class="no-found">
        <h2>No se encontro productos por el nombre: ${name}</h2>
        <img src="assets/img/error404.png"
    </div>`
}

const template_error = ()=>{
   return `<div class="error">
        <h2>Uups!, parece que hubo un error vuelve a intentarlo</h2>
        <img src="assets/img/error-500.png"
    </div>`
} 