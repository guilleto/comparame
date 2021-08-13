const btn_close_secction = document.getElementById('close-seccion');

btn_close_secction.addEventListener('click',(e)=>{
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
})