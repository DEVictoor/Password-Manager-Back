import { GoogleConfig } from "./google.config";

export class GoogleService {
  public readonly _cGoogle: GoogleConfig;

  constructor() {
    this._cGoogle = new GoogleConfig();
  }

  async getAccesToken(): Promise<string> {
    const { token } = await this._cGoogle.oauthClient.getAccessToken();
    if (!token) throw new Error("Error para obtner el accessToken");
    return token;
  }
}
