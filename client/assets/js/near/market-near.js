var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGYyNDlkNWY0ZjYyMmIwYWY3ODI2MSIsImlhdCI6MTYyNDM3OTU1NSwiZXhwIjoxNjI0NDIyNzU1fQ.A_gVsoh8so7uT9jjGgDQiE6ilXljc52aqX5VpYudF-Q");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://comparame-api.herokuapp.com/supermarket/headsquareNear/608f353001889d4583314803?lat=6.3115012&lon=-75.6772137&distance=10", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));