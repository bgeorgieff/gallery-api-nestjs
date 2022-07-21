import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMessage } from 'src/interfaces/IMessage.interface';
import { CreateMailDto } from './dto/create-mail.dto';

import { Messages } from 'src/enums/messages.enum';
import { Email } from 'src/enums/email.enum';
import { SendgridService } from './sendgrid/sendgrid/sendgrid.service';
import { GalleryService } from 'src/gallery/gallery.service';

@Injectable()
export class MailService {
  constructor(
    @InjectModel('Mail') private readonly galleryModel: Model<IMessage>,
    private readonly sendGridService: SendgridService,
    private readonly galleryService: GalleryService,
  ) {}

  async create(
    createMailDto: CreateMailDto,
  ): Promise<{ message: string } | undefined> {
    try {
      const painting = await this.galleryService.findByRef(
        createMailDto.paintingRef,
      );

      if (!painting) {
        throw new NotFoundException('Provided ref number is not valid');
      }

      await new this.galleryModel(createMailDto).save();

      const email = {
        to: Email.to,
        subject: Email.subject(createMailDto.name),
        from: Email.sender,
        html: Email.body(createMailDto.message, createMailDto.paintingRef),
      };

      const transport = await this.sendGridService.send(email);

      if (transport) {
        return { message: Messages.emailSent };
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  //TODO add those if needed
  // findAll() {
  //   return `This action returns all mail`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} mail`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} mail`;
  // }
}
