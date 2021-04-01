// crear un function que me permite mostrar el precio sacalando de input range
//1-inicializar valiables
const input_range_price = document.getElementById('range_Price')
const resul_range_price = document.getElementById('result_price')
//mostrar el resultado de input range
input_range_price.addEventListener('input',()=>{
    resul_range_price.innerHTML = "$ " + input_range_price.value;
})
