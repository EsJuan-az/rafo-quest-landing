import { errorHandler } from "@/utils/errorHandler";
import axios from "axios";

export default class OwnService{
  static async getAccessToken(): Promise<string | null> {
    try {
      const response = await axios.get("/api/auth/token");
      if (response.status !== 200) {
        throw new Error(`Error fetching token: ${response.statusText}`);
      }
      return response?.data?.body?.accessToken;
    } catch (error) {
      return null;
    }
  }
}