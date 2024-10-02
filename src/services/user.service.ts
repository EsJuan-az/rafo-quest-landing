// services/UserService.js
import { Claims } from '@auth0/nextjs-auth0';
import axios, { AxiosError } from 'axios';
const { AUTH0_RAFOQ_AUDIENCE, AUTH0_ISSUER_BASE_URL, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET } = process.env;

class UserService {
  // Método para obtener un token de acceso
  static async getAccessToken() {
    try {
      const response = await axios.post(`${AUTH0_ISSUER_BASE_URL}/oauth/token`, {
        client_id: AUTH0_CLIENT_ID,
        client_secret: AUTH0_CLIENT_SECRET,
        audience: AUTH0_RAFOQ_AUDIENCE,
        grant_type: 'client_credentials',
      });
      return response.data.access_token;
    } catch (error) {
      console.error('Error al obtener el token de acceso:', error);
      throw new Error('No se pudo obtener el token de acceso');
    }
  }

  // Método para obtener la información del usuario
  static async getMe(claims: Claims) {
    try {
      const token = await this.getAccessToken(); // Obtén el token de acceso
      const body = {
        name: claims.nickname || claims.name  || claims.given_name,
        avatar: claims.picture
      }
      const response = await axios.post(`${process.env.RAFOQ_API_URI}/user/auth/${claims.sub}`, body, {
        headers: {
          Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
          "Content-Type": 'application/json'
        },
      });
      return response.data; // Devuelve los datos del usuario
    } catch (error) {
      console.error('Error al obtener la información del usuario:', error);
      throw new Error('No se pudo obtener la información del usuario');
    }
  }
}

export default UserService;
