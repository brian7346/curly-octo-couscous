import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Render,
  Redirect,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';
import { NotFoundException } from '@nestjs/common';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Получить список всех книг' })
  @ApiResponse({
    status: 200,
    description: 'Список книг успешно получен',
    type: [Book],
  })
  @Get('list')
  getAllBooks(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @ApiOperation({ summary: 'Добавить новую книгу' })
  @ApiResponse({
    status: 201,
    description: 'Книга успешно добавлена',
    type: Book,
  })
  @Post('add')
  @Redirect('/books')
  async createBook(@Body() createBookDto: CreateBookDto): Promise<void> {
    await this.booksService.create(createBookDto);
  }

  @Post(':id')
  @Redirect('/books')
  @ApiOperation({ summary: 'Удалить книгу' })
  @ApiResponse({
    status: 302,
    description: 'Книга успешно удалена и выполнено перенаправление',
  })
  @ApiResponse({ status: 404, description: 'Книга не найдена' })
  @ApiParam({ name: 'id', description: 'ID книги' })
  async removeBook(@Param('id') id: string): Promise<void> {
    try {
      await this.booksService.remove(+id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Книга с ID ${id} не найдена`);
      }
      throw error;
    }
  }

  @Get()
  @Render('books')
  async getBooks() {
    const books = await this.booksService.findAll();
    return { title: 'Список книг', books };
  }

  @Get('add')
  @Render('add-book')
  showAddBookForm() {
    return { title: 'Добавить книгу' };
  }
}
