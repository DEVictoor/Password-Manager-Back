import { google, Auth } from "googleapis";
import variables from "../../configuration/dotenv";

export class GoogleConfig {
  private readonly SCOPE: string;
  public readonly GOOGLE_CLIENT_ID: string;
  public readonly GOOGLE_CLIENT_SECRET: string;
  public readonly GOOGLE_REFRESH_TOKEN: string;

  public oauthClient: Auth.OAuth2Client;

  constructor() {
    this.SCOPE = "https://developers.google.com/oauthplayground";
    this.GOOGLE_CLIENT_SECRET = variables.GOOGLE_CLIENT_SECRET;
    this.GOOGLE_CLIENT_ID = variables.GOOGLE_CLIENT_ID;
    this.GOOGLE_REFRESH_TOKEN = variables.GOOGLE_REFRESH_TOKEN;

    this.oauthClient = new google.auth.OAuth2(
      this.GOOGLE_CLIENT_ID,
      this.GOOGLE_CLIENT_SECRET,
      this.SCOPE
    );

    this.oauthClient.setCredentials({
      refresh_token: this.GOOGLE_REFRESH_TOKEN,
    });
  }
}
