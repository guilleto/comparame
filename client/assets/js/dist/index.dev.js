"use strict";

// crear un function que me permite mostrar el precio sacalando de input range
//1-inicializar valiables
var input_range_price = document.getElementById('range_Price');
var resul_range_price = document.getElementById('result_price'); //mostrar el resultado de input range

input_range_price.addEventListener('input', function () {
  resul_range_price.innerHTML = "$ " + input_range_price.value;
});