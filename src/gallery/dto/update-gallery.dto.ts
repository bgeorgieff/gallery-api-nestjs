import { PartialType } from '@nestjs/swagger';
import { GalleryDto } from './gallery.dto';

export class UpdateGalleryDto extends PartialType(GalleryDto) {}
