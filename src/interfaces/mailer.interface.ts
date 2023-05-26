export interface MailInterface {
  from?: string;
  to: string;
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  text?: string;
  html: string;
}
