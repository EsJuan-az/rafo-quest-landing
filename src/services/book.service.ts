// services/UserService.js
import { errorHandler } from '@/utils/errorHandler';
import { jsonToQueryParams } from '@/utils/general';
import axios from 'axios';
import { ThirdPartyService } from './thirdParty.service';

class BookService {
  static apiUrl: string  = process.env.NEXT_PUBLIC_RAFOQ_API_URI || '';
  // Método para obtener la información del usuario
  static async findAll(offset = 0, limit = 10) {
    const query = {
      offset, limit
    }
    try {
      const response = await axios.get(`${this.apiUrl}/book?${jsonToQueryParams(query)}`, {
        headers: {
          "Content-Type": 'application/json'
        },
      });
      return response.data.body; // Devuelve los datos del usuario
    } catch (error) {
      return errorHandler(error);
    }
  }
  static async create(data){
    const placeholder = 'https://covers.openlibrary.org/b/id/10909258-L.jpg';
    let cover = data.cover;
    if( !cover ){
      const volumes = await ThirdPartyService.getVolumes(data.name);
      if( volumes.totalItems > 0 ){
        cover = volumes?.items[0]?.volumeInfo?.imageLinks?.thumbnail || placeholder;
      }else {
        cover = placeholder;
      }
    }
    try {
      const response = await axios.post(`${this.apiUrl}/book`, {
        cover,
        landscape: placeholder,
        ...data
      }, {
        headers: {
          "Content-Type": 'application/json'
        },
      });
      return response.data.body; // Devuelve los datos del usuario
    } catch (error) {
      return errorHandler(error);
    }
  }
  static async delete(id){
    try {
      const response = await axios.delete(`${this.apiUrl}/book/${id}`, {
        headers: {
          "Content-Type": 'application/json'
        },
      });
      return response.data.body; // Devuelve los datos del usuario
    } catch (error) {
      return errorHandler(error);
    }
  }
}

export default BookService;
