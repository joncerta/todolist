import { API } from '../config';

export const createCategory = (userId, token, category) => {
  // console.log(name, lastname, email, password, phone, document_number);
  return fetch(`${API}/category/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log('error', err);
    });
};

export const createTask = (userId, token, task) => {
  return fetch(`${API}/task/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: task,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log('error', err);
    });
};

export const getCategories = () => {
  // console.log(name, lastname, email, password, phone, document_number);
  return fetch(`${API}/categories`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log('error', err);
    });
};
