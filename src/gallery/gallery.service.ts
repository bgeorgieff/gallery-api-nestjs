import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { IGallery } from 'src/interfaces/gallery.interface';
import { GalleryDto } from './dto/gallery.dto';
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
  ): Promise<GalleryDto | undefined> {
    try {
      const imageUrl = (
        await this.cloudinaryService.uploadResult(file)
      ).toString();

      const painting: GalleryDto = {
        imageUrl,
        imageAltTxt: createGalleryDto.imageAltTxt,
        name: createGalleryDto.name,
        dateCreated: createGalleryDto.dateCreated,
        size: createGalleryDto.size,
        uniqueId: createGalleryDto.uniqueId,
        description: createGalleryDto.description,
        isFeatured: true,
      };

      return await new this.galleryModel(painting).save();
    } catch (e) {
      throw new Error(e);
    }
  }

  async findAll() {
    try {
      return await this.galleryModel.find();
    } catch (e) {}
  }

  async findOne(_id: number) {
    return await this.galleryModel.findOne({ _id });
  }

  async update(_id: number, updateGalleryDto: UpdateGalleryDto) {
    return await this.galleryModel.findOneAndUpdate(
      { _id },
      { updateGalleryDto },
    );
  }

  async remove(_id: number) {
    return await this.galleryModel.deleteOne({ _id });
  }
}
