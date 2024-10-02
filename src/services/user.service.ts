// services/UserService.js
import { errorHandler } from '@/utils/errorHandler';
import { Claims } from '@auth0/nextjs-auth0';
import axios from 'axios';

class UserService {
  static apiUrl: string  = process.env.NEXT_PUBLIC_RAFOQ_API_URI || '';
  // Método para obtener la información del usuario
  static async getMe(claims: Claims, accessToken: string) {
    try {
      const body = {
        name: claims.nickname || claims.name  || claims.given_name,
        avatar: claims.picture
      }
      const response = await axios.post(`${this.apiUrl}/user/auth/`, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Incluye el token en el encabezado
          "Content-Type": 'application/json'
        },
      });
      return response.data.body; // Devuelve los datos del usuario
    } catch (error) {
      return errorHandler(error);
    }
  }
}

export default UserService;
