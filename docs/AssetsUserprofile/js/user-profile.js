// creando el boton para cambial la imagen
let imgProfile = document.querySelector(".profile div img");
let container = document.querySelector(".profile div");
let button= document.createElement("button")
button. type = 'button';
button. innerText = `Edit`;

const getButton = ()=>{
    container.appendChild(button);
};

imgProfile.addEventListener('mouseenter',getButton); 
imgProfile.addEventListener('mouseout', ()=>{
 container.removeChild(button);   
});

// funcion para cambiar la contraseña

let Password = document.getElementById("password");

const createNewTemplate = ()=>{
    return `
        <div class="clip"></div>
        <h2>Perfil</h2>
        <div class="nombre">
            <label for="nombre">Contraseña Actual</label>
            <input class="info1" type="text" name="nombre" class="input">
        </div>              
        <div class="nombre">
            <label for="email">Nueva contraseña</label>
            <input class="info1" type="email" name="email"  class="input email" />
        </div>
        <div class="nombre">
            <label for="password">Confirmar contraseña</label>
            <input class="info1" type="number" name="password"  class="input email" />
        </div>
        <div class="boton">
            <button>enviar</button>
        </div>`
};
let sectionContainer = document.querySelector(".informacion");
Password.addEventListener('click',()=>{
    sectionContainer.innerHTML= createNewTemplate();
});