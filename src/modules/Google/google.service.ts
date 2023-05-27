import { GoogleConfig } from "./google.config";

export class GoogleService extends GoogleConfig {
  constructor() {
    super();
  }

  async getAccesToken(): Promise<string> {
    const { token } = await this.oauthClient.getAccessToken();
    if (!token) throw new Error("Error para obtener el accessToken");
    return token;
  }
}
