// services/UserService.js
import instance from '@/utils/axios';
import { errorHandler } from '@/utils/errorHandler';


class RecordService {
  // Método para obtener la información del usuario
  static async create(accessToken:string, data: object){
    const config = {
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await instance.post(`/read-record`, data, config);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
}

export default RecordService;
