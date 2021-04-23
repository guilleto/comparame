let coordenada_latitude ;
let coordenada_longitud;
if('geolocation'in navigator){
    navigator.geolocation.getCurrentPosition((position)=>{
        coordenada_latitude = position.coords.latitude
        coordenada_longitud = position.coords.longitude
        let mymap = L.map('mapid').setView([coordenada_latitude,coordenada_longitud], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom:18
            // zoomSIze:-1,
            // tiLeSize: 51
        }).addTo(mymap);
        let marker = L.marker([coordenada_latitude, coordenada_longitud]).addTo(mymap);
    })
}
