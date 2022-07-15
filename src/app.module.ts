import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GalleryModule } from './gallery/gallery.module';
import { MailModule } from './mail/mail.module';
import { configModule } from './config.root';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    configModule,
    MongooseModule.forRoot(process.env.DB_URL),
    UserModule,
    GalleryModule,
    MailModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
