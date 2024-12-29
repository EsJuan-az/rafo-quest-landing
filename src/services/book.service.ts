// services/UserService.js
import { errorHandler } from '@/utils/errorHandler';
import { jsonToQueryParams } from '@/utils/general';
import axios from 'axios';
import instance from '@/utils/axios';
class BookService {
  // Método para obtener la información del usuario
  static async findAll(accessToken: string, offset = 0, limit = 10) {
    const query = jsonToQueryParams({
      offset, limit
    })
    const config = {
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${accessToken}`, // Incluye el token en el encabezado
      },
    }
    try {
      const response = await instance.get(`/book?${query}`, config);
      return response.data; // Devuelve los datos del usuario
    } catch (error) {
      return errorHandler(error);
    }
  }
  static async create(data: object){
    const config = {
      headers: {
        "Content-Type": 'application/json'
      },
    };
    try {
      const response = await instance.post(`/book`, data, config);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
  static async delete(id: string){
    try {
      const response = await instance.delete(`/book/${id}`, {
        headers: {
          "Content-Type": 'application/json'
        },
      });
      return response.data; 
    } catch (error) {
      return errorHandler(error);
    }
  }
}

export default BookService;
