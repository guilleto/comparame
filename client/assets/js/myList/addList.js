const ctn_pop_up_add = document.getElementById('ctn-add-list')
ctn_search.addEventListener('click',(e)=>{
    // console.log(e.target.className)
    // console.log(e.target.id)
    if(e.target.className == "fas fa-plus"){
        if(!userToken){
            Swal.fire({
                icon:"error",
                title: "Debe iniciar sesión ",
                text: "iniciar session para poder agregarlo a tu lista"
            })
        }else{
            show_pop_up(e.target.id)
        }

    }
})



ctn_pop_up_add.addEventListener('click',(e)=>{
        if(e.target.className=="ctn-pop-up"){
            ctn_pop_up_add.removeChild(ctn_pop_up_add.children[0])
        }
})






const show_pop_up = (id)=>{
    fetch("https://comparame-api.herokuapp.com/productList", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization":userToken
        }
    })
    .then(response => response.json())
    .then(result =>{
        //  console.log(result)
         if(result.status){
             template_list(result.data,id)
         }       
    })
    .catch(error => {
        console.log('error', error)
});
}



const template_list = (array,id_product)=>{
    let div = document.createElement('div')
        div.className = "ctn-pop-up"
    let ctn_table = document.createElement('div')

    let title = document.createElement('h3')



    let container = document.createElement('div')
        container.className = "table"
    let colum = document.createElement('tr')
    let name_colum1 = document.createElement('th')
        name_colum1.textContent = "Nombre"

    let name_colum2 = document.createElement('th')
        name_colum2.textContent = "Action"


    colum.appendChild(name_colum1)
    colum.appendChild(name_colum2)
    container.appendChild(colum)
    
    array.forEach((element) => {
        let fila = document.createElement('tr')
        let celda1 = document.createElement('td')
        celda1.textContent = element.name
        let celda2 = document.createElement('td')
        let button = document.createElement('button')
        button.textContent = "Agregar"
        button.className = id_product
        button.id = element._id
        button.setAttribute('onclick',"add_list(this)")
        celda2.appendChild(button)
        
        fila.appendChild(celda1)
        fila.appendChild(celda2)
        
        container.appendChild(fila)
    });
    ctn_table.appendChild(container)

    div.appendChild(title)
    div.appendChild(ctn_table)
      ctn_pop_up_add.appendChild(div)

}


const add_list = (evento)=>{
    // console.log(evento)
    // console.log(evento.className)
    // console.log(evento.id)
    let son_ctn_pop = ctn_pop_up_add.children[0]
    ctn_pop_up_add.removeChild(son_ctn_pop)
    

    let raw = JSON.stringify({
      "listID": evento.id,
      "productID": evento.className
    });
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", userToken);
    
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://comparame-api.herokuapp.com/productList/product", requestOptions)
      .then(response => response.json())
      .then(result =>{
        //    console.log(result)
           if(result.status){
               Swal.fire({
                  icon:"success",
                   title:"Producto agregado exitosamente a la lista"
               })
           }else{
            Swal.fire({
                icon:"error",
                 title:"Parece que algo salio mal vuelve a intentarlo"
             })
           }
        })
      .catch(error =>{ 
          console.log('error', error)
    });
 
}