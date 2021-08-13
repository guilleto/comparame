

const data = JSON.parse(localStorage.getItem('datos-log'))
const show_create_list = ()=>{
    const template = ` 
        <div class="create-list" >
                <h2>Crear lista</h2>
                <input type="text" class="input-create" required id="input-create-list">
                <button class="btn-create"  onclick="create_list()"  >Crear</button>
        </di>
    
    `
    document.getElementById('ctn-create').innerHTML = template
}
const create_list = () =>{

    const title = document.getElementById('input-create-list')
    if(title.value.length!=0){
        var raw = JSON.stringify({
            "name": title.value
          });
          
          var requestOptions = {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": data.token
            },
            body: raw,
          
          };
          
          fetch("https://comparame-api.herokuapp.com/productList", requestOptions)
            .then(response => response.json())
            .then(result =>{
                 console.log(result)
                 if(result.status){
                     Swal.fire({
                         icon: "success",
                         title: "Lista creada exitosamente"
                     })
                     setTimeout(()=>{
                         window.location.reload()
                     })
                 }else{
                    Swal.fire({
                        icon:"error",
                        title:"Error vuelve a intentarlo"
                    })
                 }
            })
            .catch(error => {
                console.log('error', error)
                Swal.fire({
                    icon:"error",
                    title:"Error vuelve a intentarlo"
                })
        });
    }else{
        Swal.fire({
            icon:"error",
            title:"Nombre de la lista es requerido"
        })
    }
}




const ctn_list = document.getElementById('ctn-my-list')

fetch("https://comparame-api.herokuapp.com/productList",{
    method: 'GET',
    headers: {
      "Authorization": data.token
    },
})
  .then(response => response.json())
  .then(result =>{ 
      console.log(result)
      template(result.data)
})
  .catch(error => console.log('error', error));

  const template = (array)=>{
    let container = document.createElement('table')
    container.className = "table"
    let colum = document.createElement('tr')
    let name_colum1 = document.createElement('th')
    let title = document.createTextNode(' Nombre Listas')
    name_colum1.appendChild(title)
    let name_colum2 = document.createElement('th')
    let title2 =  document.createTextNode('Ver')
    name_colum2.appendChild(title2)
    colum.appendChild(name_colum1)
    colum.appendChild(name_colum2)
    container.appendChild(colum)


      array.forEach((element) => {
        let fila = document.createElement('tr')
        let celda1 = document.createElement('td')
            celda1.textContent = element.name
        let celda2 = document.createElement('td')

        let button = document.createElement('button')
        button.textContent = "Lista"
        button.id = element._id
        button.className = "btn-get-list"
        celda2.appendChild(button)

        fila.appendChild(celda1)
        fila.appendChild(celda2)

        container.appendChild(fila)
      });
      ctn_list.appendChild(container)
  }


ctn_list.addEventListener('click',(e)=>{
    if(e.target.className == "btn-get-list"){
        // console.log(e.target.id)
        showme_list(e.target.id)
    }
})


const showme_list = (id) =>{
    fetch("https://comparame-api.herokuapp.com/productList/"+id, {
        method: 'GET',
        headers: {
            "Authorization":data.token
        }
    })
    .then(response => response.json())
    .then(result =>{
        console.log(result)
         if(result.data.products.length==0){
             Swal.fire({
                 icon:"info",
                 title:"Esta lista esta vacia",
                 text:"Tu aun no has guardado ningun producto"
             })
         }else{
            template_product(result.data.products,result.data.name)
         }
    })
    .catch(error => {
        console.log('error', error)
});
}
const ctn_table = document.getElementById('ctn-table')



const template_product = (array,name)=>{

    ctn_table.innerHTML = ""
    let title = document.createElement('h3')
    title.textContent= name
    let container = document.createElement('table')
    container.className = "table"
    let colum = document.createElement('tr')
    let name_colum1 = document.createElement('th')
        name_colum1.textContent = "Nombre"

    let name_colum2 = document.createElement('th')
    name_colum2.textContent = "Precio"

    let location_colum = document.createElement('th')
        location_colum.textContent = "Supermercado"

        colum.appendChild(name_colum1)
        colum.appendChild(name_colum2)
        colum.appendChild(location_colum)    
    container.appendChild(colum)


      array.forEach((element) => {
        let fila = document.createElement('tr')
        let celda1 = document.createElement('td')
            celda1.textContent = element.product_name.length > 19? element.product_name.slice(0,18):element.product_name
            let celda2 = document.createElement('td')
            celda2.textContent = element.product_price
        let celda3 = document.createElement('td')


        let button = document.createElement('button')
        button.className = "btn-get-mall"
        button.textContent = "Ver supermercado"
        button.id = element.supermarket
        celda3.appendChild(button)

        fila.appendChild(celda1)
        fila.appendChild(celda2)
        fila.appendChild(celda3)


        container.appendChild(fila)
      });
      ctn_table.appendChild(title)
      ctn_table.appendChild(container)

}



ctn_table.addEventListener('click',(e)=>{
    if(e.target.className == "btn-get-mall"){
        console.log(e.target.id)
        localStorage.setItem('id_mall',e.target.id)
        window.location.replace('../../../view-mall.html')
    }
})