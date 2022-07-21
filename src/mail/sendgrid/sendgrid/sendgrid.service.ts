import { Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class SendgridService {
  constructor() {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async send(mail: SendGrid.MailDataRequired): Promise<any> {
    return SendGrid.send(mail)
      .then((message) => {
        return message;
      })
      .catch((error) => {
        return error;
      });
  }
}
