import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Controller('api/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

 
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateNoteDto): Promise<Note> {
    return this.notesService.create(dto);
  }

  
  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('search') search?: string,
  ): Promise<Note[]> {
    return this.notesService.findAll(category, search);
  }

  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Note> {
    return this.notesService.findOne(id);
  }


  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNoteDto,
  ): Promise<Note> {
    return this.notesService.update(id, dto);
  }

  @Patch(':id/pin')
  togglePin(@Param('id', ParseIntPipe) id: number): Promise<Note> {
    return this.notesService.togglePin(id);
  }


  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.notesService.remove(id);
  }
}
