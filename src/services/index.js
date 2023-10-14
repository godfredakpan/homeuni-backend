import request from 'umi-request';

const API_URL = 'https://hrmaneja.eu-4.evennode.com/api/v1'
// const API_URL = 'http://localhost:5050/api/v1'

const USER_TOKEN = process.env.USER_TOKEN

const CLOUDINARY_CLOUD_NAME = 'archer';

const CLOUDINARY_UPLOAD_PRESET = 'okbookshopng';

export async function loginUser(credentials) {
    return request(`${API_URL}/user/auth/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify(credentials),
    });
  }

  export async function getAllBooks() {
    return request(`${API_URL}/bookshop/books`, {
      method: 'get',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': USER_TOKEN,
      },
    });
  }


  export async function getBook(bookId) {
    return request(`${API_URL}/bookshop/detail/${bookId}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': USER_TOKEN,
      },
    });
  }


export async function createBook(body) {
    return request(`${API_URL}/bookshop/books/create`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Authorization': USER_TOKEN,
      },
      body: JSON.stringify(body),
    });
  }


export async function updateBook(body, bookId) {
    return request(`${API_URL}/bookshop/books/update/${bookId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': USER_TOKEN,
      },
      body: JSON.stringify(body),
    });
  }
  
  
  export async function deleteBook(bookId) {
    return request(`${API_URL}/bookshop/books/delete/${bookId}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Authorization': USER_TOKEN,
      },
    });
  }


  export async function getAllOrders() {
    return request(`${API_URL}/bookshop/orders`, {
      method: 'get',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': USER_TOKEN,
      },
    });
  }

  export async function createOrders(body) {
    return request(`${API_URL}/bookshop/orders/create`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Authorization': USER_TOKEN,
      },
      body: JSON.stringify(body),
    });
  }

export const UploadCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", CLOUDINARY_CLOUD_NAME);
    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
            method: "post",
            mode: "cors",
            body: data
        }
    );

    let json = await res.json();

    return json;

};

export const setUserSession = (token, user) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', JSON.stringify(user));
}

export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  else return null;
}
 
export const getToken = () => {
  return sessionStorage.getItem('token') || null;
}

