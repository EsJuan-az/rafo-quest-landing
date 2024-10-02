import { errorHandler } from "@/utils/errorHandler";
import axios from "axios";

export class ThirdPartyService{
  static googleUrl: string = process.env.NEXT_PUBLIC_GOOGLE_BOOKS || '';
  static async getVolumes(name: string){
    try {
      const response = await axios.get(`${this.googleUrl}/volumes?q=intitle:${name}`);
      return response.data; // Devuelve los datos del usuario
    } catch (error) {
      return errorHandler(error);
    }
  }
}