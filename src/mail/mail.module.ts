import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { configModule } from 'src/config.root';
import { MongooseModule } from '@nestjs/mongoose';
import { Mail, MailSchema } from './entities/mail.entity';
import { SendgridService } from './sendgrid/sendgrid/sendgrid.service';
import { Gallery, GallerySchema } from 'src/gallery/entities/gallery.entity';
import { GalleryService } from 'src/gallery/gallery.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [
    configModule,
    MongooseModule.forFeature([{ name: Mail.name, schema: MailSchema }]),
    MongooseModule.forFeature([{ name: Gallery.name, schema: GallerySchema }]),
  ],
  controllers: [MailController],
  providers: [MailService, SendgridService, GalleryService, CloudinaryService],
})
export class MailModule {}
