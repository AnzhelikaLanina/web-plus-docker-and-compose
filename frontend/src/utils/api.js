import { URL } from "./constants";

const checkResponse = (res) => {
  if (res.ok || res.created) {
    return res.json();
  }
  return res.json().then((err) => {
    return Promise.reject(err);
  });
};
const headersWithContentType = { "Content-Type": "application/json" };
const headersWithAuthorizeFn = () => ({
  "Content-Type": "application/json",
  authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
});

export const registerUser = (userData) => {
  return fetch(`${URL}/signup/`, {
    method: "POST",
    headers: headersWithContentType,
    body: JSON.stringify(userData),
  }).then(checkResponse);
};

export const loginUser = (username, password) => {
  return fetch(`${URL}/signin/`, {
    method: "POST",
    headers: headersWithContentType,
    body: JSON.stringify({ username, password }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.access_token) {
        sessionStorage.setItem("auth_token", data.access_token);
        return data;
      } else {
        return;
      }
    });
};

export const logoutUser = () => {
  sessionStorage.removeItem("auth_token");
};

export const refreshAndSet = (method, contextSetter) => {
  method().then(contextSetter);
};

export const getOwnUser = () => {
  return fetch(`${URL}/users/me/`, {
    method: "GET",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const refreshUser = (contextSetter) => {
  try {
    getOwnUser().then((user) => contextSetter(user));
  } catch (e) {
    console.error("Failed updating user");
  }
};

export const updateProfile = (user) => {
  return fetch(`${URL}/users/me/`, {
    method: "PATCH",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify(user),
  }).then(checkResponse);
};

export const getCards = (page = 1) => {
  return fetch(`${URL}/wishes/`, {
    method: "GET",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const getOwnWishes = () => {
  return fetch(`${URL}/users/me/wishes`, {
    method: "GET",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const getAnotherUserWishes = (username) => {
  return fetch(`${URL}/users/${username}/wishes`, {
    method: "GET",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const getAnotherUser = (username) => {
  return fetch(`${URL}/users/${username}`, {
    method: "GET",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const queryUser = (query) => {
  return fetch(`${URL}/users/find`, {
    method: "POST",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify({ query }),
  }).then(checkResponse);
};

export const removeWish = (id) => {
  return fetch(`${URL}/wishes/${id}`, {
    method: "DELETE",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const addOffer = (offer) => {
  return fetch(`${URL}/offers`, {
    method: "POST",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify(offer),
  }).then(checkResponse);
};

export const getTopCards = () => {
  return fetch(`${URL}/wishes/top`, {
    method: "GET",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const getLastCards = (page = 1) => {
  return fetch(`${URL}/wishes/last`, {
    method: "GET",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const getCard = (id) => {
  return fetch(`${URL}/wishes/${id}`, {
    method: "GET",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const createCard = (wish) => {
  return fetch(`${URL}/wishes`, {
    method: "POST",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify(wish),
  }).then(checkResponse);
};

export const updateCard = (card, id) => {
  return fetch(`${URL}/wishes/${id}`, {
    method: "PATCH",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify(card),
  }).then(checkResponse);
};

export const copyWish = (id) => {
  return fetch(`${URL}/wishes/${id}/copy`, {
    method: "POST",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const removeCard = (id) => {
  return fetch(`${URL}/wishes/${id}`, {
    method: "DELETE",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const addCollection = (data) => {
  return fetch(`${URL}/wishlistlists`, {
    method: "POST",
    headers: headersWithAuthorizeFn(),
    body: JSON.stringify(data),
  }).then(checkResponse);
};

export const getCollections = () => {
  return fetch(`${URL}/wishlistlists`, {
    method: "GET",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const getCollection = (id) => {
  return fetch(`${URL}/wishlistlists/${id}`, {
    method: "GET",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};

export const deleteCollection = (id) => {
  return fetch(`${URL}/wishlistlists/${id}`, {
    method: "DELETE",
    headers: headersWithAuthorizeFn(),
  }).then(checkResponse);
};
