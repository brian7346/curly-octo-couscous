import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ description: 'Название книги' })
  title: string;

  @ApiProperty({ description: 'Автор книги' })
  author: string;
}
