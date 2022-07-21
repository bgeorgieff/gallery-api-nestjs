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
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { GalleryDto } from './dto/create-gallery.dto';
import { Endpoints } from 'src/enums/endpoints.enum';
import { Controllers } from 'src/enums/controllers.enum';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { JwtAuthGuard } from 'src/user/strategies/jwt-auth.guard';
import { ExtractUser } from 'src/user/decorators/extract-user.decorator';
import { IUserPayload } from 'src/interfaces/IUserPayload.interface';
import { Messages } from 'src/enums/messages.enum';

@Controller(Controllers.gallery)
@ApiTags(Controllers.gallery)
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('imageUrl'))
  @ApiBearerAuth()
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
  async create(
    @ExtractUser() user: IUserPayload,
    @UploadedFile() file: Express.Multer.File,
    @Body() createGalleryDto: GalleryDto,
  ) {
    if (user.isAdmin) {
      const uniqueId = uuidv4().slice(0, 8);
      return this.galleryService.create(file, createGalleryDto, uniqueId);
    } else {
      throw new UnauthorizedException(Messages.userMustBeAdmin);
    }
  }

  @Get()
  findAll() {
    return this.galleryService.findAll();
  }

  @Get(Endpoints.id)
  @ApiParam({ name: 'id', type: 'string' })
  async findOne(@Param('id') id: string) {
    return this.galleryService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(Endpoints.id)
  @UseInterceptors(FileInterceptor('imageUrl'))
  @ApiBearerAuth()
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
  async update(
    @ExtractUser() user: IUserPayload,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateGalleryDto: UpdateGalleryDto,
  ) {
    if (user.isAdmin) {
      return this.galleryService.update(id, file, updateGalleryDto);
    } else {
      throw new UnauthorizedException(Messages.userMustBeAdmin);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(Endpoints.id)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'string' })
  async remove(@ExtractUser() user: IUserPayload, @Param('id') id: string) {
    if (user.isAdmin) {
      return this.galleryService.remove(id);
    } else {
      throw new UnauthorizedException(Messages.userMustBeAdmin);
    }
  }
}
