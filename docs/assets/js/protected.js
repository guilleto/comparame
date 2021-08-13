const user_token = localStorage.getItem('key-user');

if (user_token == null) {
    window.location.replace('./index.html')
} 

const loader = document.getElementById('ctn-loader');

const validar_token = async()=> {
        const res = await fetch('https://comparame-api.herokuapp.com/user/authenticate', {
            method: 'GET',
            headers: {
                'Authorization': user_token
            }
        })
        const response = await res.json()
        // console.log(response)
        if(response.status){
            loader.style.display = "none"
        }else{
            window.location.replace('./index.html')
        }
    
    }


validar_token()
