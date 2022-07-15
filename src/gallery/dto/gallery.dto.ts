import { ApiProperty } from '@nestjs/swagger';

export class GalleryDto {
  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  imageAltTxt: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  dateCreated: string;

  @ApiProperty()
  size: string;

  @ApiProperty()
  uniqueId: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isFeatured: boolean;
}
