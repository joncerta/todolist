import { API } from '../config';
import queryString from 'query-string';

export const getTasks = (sortBy) => {
  // console.log(name, lastname, email, password, phone, document_number);
  return fetch(`${API}/tasks?sortBy=${sortBy}&order=desc&limit=6`, {
    method: 'GET',
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

export const getFilteredTasks = (skip, limit, filters = {}) => {
  const data = { skip, limit, filters };
  // console.log(name, lastname, email, password, phone, document_number);
  return fetch(`${API}/tasks/by/search`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log('error', err);
    });
};

export const deleteTask = (id, userId, token) => {
  return fetch(`${API}/task/${id}/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log('error', err);
    });
}

export const list = (params) => {
  const query = queryString.stringify(params);
  console.log('query', query);
  
  return fetch(`${API}/tasks/search?${query}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log('error', err);
    });
};

export const read = (taskId) => {
  return fetch(`${API}/task/${taskId}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log('error', err);
    });
};

export const listRelated = (taskId) => {
  return fetch(`${API}/tasks/related/${taskId}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log('error', err);
    });
};

export const getBraintreeClientToken = (userId, token) => {
  return fetch(`${API}/braintree/getToken/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log('error', err);
    });
};

export const processPayment = (userId, token, paymentData) => {
  return fetch(`${API}/braintree/payment/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(paymentData)
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log('error', err);
    });
};

export const createOrder = (userId, token, creteOrderData) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(creteOrderData)
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log('error', err);
    });
};

