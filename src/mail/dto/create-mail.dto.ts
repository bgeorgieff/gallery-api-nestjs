import { ApiProperty } from '@nestjs/swagger';

export class CreateMailDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  paintingRef: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  message: string;
}
