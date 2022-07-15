import { PartialType } from '@nestjs/swagger';
import { GalleryDto } from './create-gallery.dto';

export class UpdateGalleryDto extends PartialType(GalleryDto) {}
