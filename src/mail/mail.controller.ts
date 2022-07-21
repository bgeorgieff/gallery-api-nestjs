import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Controllers } from 'src/enums/controllers.enum';

@Controller(Controllers.mail)
@ApiTags(Controllers.mail)
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  @ApiBody({ type: CreateMailDto })
  async create(@Body() createMailDto: CreateMailDto) {
    return this.mailService.create(createMailDto);
  }

  //TODO add those if needed
  // @Get()
  // async findAll() {
  //   return this.mailService.findAll();
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return this.mailService.findOne(+id);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.mailService.remove(+id);
  // }
}
