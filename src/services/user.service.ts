// services/UserService.js
import instance from '@/utils/axios';
import { errorHandler } from '@/utils/errorHandler';
import { Claims } from '@auth0/nextjs-auth0';


class UserService {
  static async findAll() {
    const config = {
      headers: {
        "Content-Type": 'application/json'
      },
    };
    try {
      const response = await instance.get(`/user/`, config);
      return response.data; // Devuelve los datos del usuario
    } catch (error) {
      return errorHandler(error);
    }
  }
  static async getMe(claims: Claims, accessToken: string) {
    const body = {
      name: claims.nickname || claims.name  || claims.given_name,
      avatar: claims.picture
    }
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": 'application/json'
      },
    };
    try {
      const response = await instance.post(`/user/auth/`, body, config);
      return response.data; // Devuelve los datos del usuario
    } catch (error) {
      return errorHandler(error);
    }
  }
}

export default UserService;
