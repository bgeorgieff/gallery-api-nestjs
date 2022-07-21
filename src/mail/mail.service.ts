import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMessage } from 'src/interfaces/IMessage.interface';
import { CreateMailDto } from './dto/create-mail.dto';

import { Messages } from 'src/enums/messages.enum';
import { Email } from 'src/enums/email.enum';
import { SendgridService } from './sendgrid/sendgrid/sendgrid.service';

@Injectable()
export class MailService {
  constructor(
    @InjectModel('Mail') private readonly galleryModel: Model<IMessage>,
    private readonly sendGrid: SendgridService,
  ) {}

  async create(
    createMailDto: CreateMailDto,
  ): Promise<{ message: string } | undefined> {
    try {
      await new this.galleryModel(createMailDto).save();

      const email = {
        to: Email.to,
        subject: Email.subject(createMailDto.name),
        from: Email.sender,
        html: Email.body(createMailDto.message, createMailDto.paintingRef),
      };

      const transport = await this.sendGrid.send(email);

      if (transport) {
        return { message: Messages.emailSent };
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll() {
    return `This action returns all mail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mail`;
  }

  remove(id: number) {
    return `This action removes a #${id} mail`;
  }
}
