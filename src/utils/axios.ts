import axios from 'axios';

// Configura Axios
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RAFOQ_API_URI || '',
});

// Interceptor de respuesta
instance.interceptors.response.use(
  (response) => {
    // Si la solicitud es exitosa, retorna la respuesta normalmente
    return response;
  },
  (error) => {
    // Si ocurre un error, puedes retornar el error de la respuesta
    // Esto asegura que el error también será tratado como una "respuesta"
    return Promise.resolve(error.response || error);
  }
);

export default instance;