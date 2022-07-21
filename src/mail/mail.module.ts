import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { configModule } from 'src/config.root';
import { MongooseModule } from '@nestjs/mongoose';
import { Mail, MailSchema } from './entities/mail.entity';
import { SendgridService } from './sendgrid/sendgrid/sendgrid.service';

@Module({
  imports: [
    configModule,
    MongooseModule.forFeature([{ name: Mail.name, schema: MailSchema }]),
  ],
  controllers: [MailController],
  providers: [MailService, SendgridService],
})
export class MailModule {}
