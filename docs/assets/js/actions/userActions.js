"use strict";

export function redirectToHome(message) {
  alert(message);
  setTimeout(() => {
    window.location = "/client";
  }, 2000);
}

export async function verifyToken(token) {
  const fetchData = await fetch(
    "https://comparame-api.herokuapp.com/user/authenticate",
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  );
  const convertData = await fetchData.json();
  return convertData;
}

export async function getUserData() {
  const getToken = localStorage.getItem("key-user");
  if (!getToken) {
    redirectToHome("El token es requerido.");
  }

  const verifyUserToken = await verifyToken(getToken);
  if (!verifyUserToken.status) {
    localStorage.removeItem("key-user");
    redirectToHome("El token no es valido.");
  }

  const fetchData = await fetch("https://comparame-api.herokuapp.com/profile", {
    headers: {
      Authorization: getToken,
    },
  });
  const convertData = await fetchData.json();
  return convertData;
}

export async function updateUser(form) {
  const getToken = localStorage.getItem("key-user");
  if (!getToken) {
    redirectToHome("El token es requerido.");
  }

  const configuration = {
    method: "PUT",
    headers: {
      Authorization: getToken,
    },
    body: form,
  };

  const fetchData = await fetch(
    "https://comparame-api.herokuapp.com/profile",
    configuration
  );
  const convertData = await fetchData.json();
  return convertData;
}
