import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { GalleryDto } from './dto/gallery.dto';
import { Endpoints } from 'src/enums/endpoints.enum';
import { Controllers } from 'src/enums/controllers.enum';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@Controller(Controllers.gallery)
@ApiTags(Controllers.gallery)
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imageUrl'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        imageUrl: {
          type: 'string',
          format: 'binary',
        },
        imageAltTxt: { type: 'string' },
        name: { type: 'boolean' },
        dateCreated: { type: 'string' },
        size: { type: 'string' },
        uniqueId: { type: 'string' },
        description: { type: 'string' },
        isFeatured: { type: 'boolean' },
      },
    },
  })
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createGalleryDto: GalleryDto,
  ) {
    return this.galleryService.create(file, createGalleryDto);
  }

  @Get()
  findAll() {
    return this.galleryService.findAll();
  }

  @Get(Endpoints.id)
  findOne(@Param('id') id: string) {
    return this.galleryService.findOne(+id);
  }

  @Patch(Endpoints.id)
  update(@Param('id') id: string, @Body() updateGalleryDto: GalleryDto) {
    return this.galleryService.update(+id, updateGalleryDto);
  }

  @Delete(Endpoints.id)
  remove(@Param('id') id: string) {
    return this.galleryService.remove(+id);
  }
}
