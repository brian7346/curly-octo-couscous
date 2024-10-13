import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Book {
  @ApiProperty({ description: 'Уникальный идентификатор книги' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Название книги' })
  @Column()
  title: string;

  @ApiProperty({ description: 'Автор книги' })
  @Column()
  author: string;
}
