import { ApiProperty } from '@nestjs/swagger';

export class GalleryDto {
  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  imageAltTxt: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  dateCreated: Date;

  @ApiProperty()
  size: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isFeatured?: boolean;
}
