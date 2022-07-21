import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Messages } from 'src/enums/messages.enum';
import { IGallery } from 'src/interfaces/IGallery.interface';
import { IMessage } from 'src/interfaces/IMessage.interface';
import { GalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel('Gallery') private readonly galleryModel: Model<IGallery>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    file: Express.Multer.File,
    createGalleryDto: GalleryDto,
    uniqueId: string,
  ): Promise<GalleryDto | undefined> {
    try {
      const imageUrl = (
        await this.cloudinaryService.uploadResult(file)
      ).toString();
      const painting: Partial<IGallery> = {
        imageUrl,
        imageAltTxt: createGalleryDto.imageAltTxt,
        name: createGalleryDto.name,
        dateCreated: createGalleryDto.dateCreated,
        size: createGalleryDto.size,
        uniqueId,
        description: createGalleryDto.description,
        isFeatured: createGalleryDto.isFeatured || false,
      };

      return await new this.galleryModel(painting).save();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async findAll() {
    try {
      return await this.galleryModel.find();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async findOne(_id: string): Promise<GalleryDto | undefined> {
    try {
      return await this.galleryModel.findOne({ _id });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async update(
    _id: string,
    file: Express.Multer.File,
    updateGalleryDto: UpdateGalleryDto,
  ): Promise<GalleryDto | undefined> {
    if (file) {
      const imageUrl = (
        await this.cloudinaryService.uploadResult(file)
      ).toString();

      const updatedPainting: Partial<IGallery> = {
        imageUrl,
        imageAltTxt: updateGalleryDto.imageAltTxt,
        name: updateGalleryDto.name,
        dateCreated: updateGalleryDto.dateCreated,
        size: updateGalleryDto.size,
        description: updateGalleryDto.description,
        isFeatured: updateGalleryDto.isFeatured || false,
      };
      return await this.galleryModel.findOneAndUpdate(
        { _id },
        { $set: { ...updatedPainting } },
        { returnDocument: 'after' },
      );
    } else {
      return await this.galleryModel.findOneAndUpdate(
        { _id },
        { ...updateGalleryDto },
        { returnDocument: 'after' },
      );
    }
  }

  async remove(_id: string): Promise<{ message: string } | undefined> {
    try {
      await this.galleryModel.deleteOne({ _id });
      return { message: Messages.paintingDeleted };
    } catch (e) {
      return new BadRequestException(e);
    }
  }
}
