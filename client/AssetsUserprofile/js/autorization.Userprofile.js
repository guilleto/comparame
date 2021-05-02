let token= localStorage.getItem("key-user");
async function getData() {
    const rawResponse = await fetch('https://comparame-api.herokuapp.com/profile', {
      method: 'GET',
      headers: {
        'Authorization' : token
      }
    });
    const content = await rawResponse.json();
    console.log(content);
    return content
  }
let result = getData();
result.then(content =>{
  nameUser(content);
  description(content);
  console.log(content.data.first_name);
}
);
const containerInfoUser= document.querySelector(".header-user-profile div div");
const nameUser = (pararameter) =>{
  let oldName= document.querySelector("div h3");
  let newName= document.createElement("h3");
  newName.innerText = pararameter.data.first_name //+" " + pararameter.data.last_name;
  containerInfoUser.replaceChild(newName,oldName);
}
const description =(parameter) =>{
  let oldDescription = document.querySelector("div p");
  let newDescription = document.createElement("p");
  newDescription.innerText = parameter.data.rol.rolName;
  containerInfoUser.replaceChild(newDescription,oldDescription);
}