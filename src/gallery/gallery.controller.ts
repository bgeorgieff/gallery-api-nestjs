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
import { GalleryDto } from './dto/create-gallery.dto';
import { Endpoints } from 'src/enums/endpoints.enum';
import { Controllers } from 'src/enums/controllers.enum';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { UpdateGalleryDto } from './dto/update-gallery.dto';

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
      required: [
        'imageUrl',
        'imageAltTxt',
        'name',
        'dateCreated',
        'size',
        'description',
      ],
      properties: {
        imageUrl: {
          type: 'string',
          format: 'binary',
        },
        imageAltTxt: { type: 'string' },
        name: { type: 'string' },
        dateCreated: { type: 'string' },
        size: { type: 'string' },
        description: { type: 'string' },
        isFeatured: { type: 'boolean' },
      },
    },
  })
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createGalleryDto: GalleryDto,
  ) {
    const uniqueId = uuidv4().slice(0, 8);
    return this.galleryService.create(file, createGalleryDto, uniqueId);
  }

  @Get()
  findAll() {
    return this.galleryService.findAll();
  }

  @Get(Endpoints.id)
  @ApiParam({ name: 'id', type: 'string' })
  findOne(@Param('id') id: string) {
    return this.galleryService.findOne(id);
  }

  @Patch(Endpoints.id)
  @UseInterceptors(FileInterceptor('imageUrl'))
  @ApiParam({ name: 'id', type: 'string' })
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
        name: { type: 'string' },
        dateCreated: { type: 'string' },
        size: { type: 'string' },
        description: { type: 'string' },
        isFeatured: { type: 'boolean' },
      },
    },
  })
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateGalleryDto: UpdateGalleryDto,
  ) {
    return this.galleryService.update(id, file, updateGalleryDto);
  }

  @Delete(Endpoints.id)
  @ApiParam({ name: 'id', type: 'string' })
  remove(@Param('id') id: string) {
    return this.galleryService.remove(id);
  }
}
