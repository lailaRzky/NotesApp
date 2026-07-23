import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

 
  async create(dto: CreateNoteDto): Promise<Note> {
    const note = this.noteRepository.create(dto);
    return this.noteRepository.save(note);
  }

 
  async findAll(category?: string, search?: string): Promise<Note[]> {
    const where: Record<string, unknown> = {};

    if (category && category !== 'semua') {
      where.category = category;
    }
    if (search) {
      where.title = Like(`%${search}%`);
    }

    return this.noteRepository.find({
      where,
      order: { isPinned: 'DESC', updatedAt: 'DESC' },
    });
  }

  
  async findOne(id: number): Promise<Note> {
    const note = await this.noteRepository.findOneBy({ id });
    if (!note) {
      throw new NotFoundException(`Catatan dengan ID ${id} tidak ditemukan`);
    }
    return note;
  }

  async update(id: number, dto: UpdateNoteDto): Promise<Note> {
    await this.findOne(id); 
    await this.noteRepository.update(id, dto);
    return this.findOne(id);
  }

  async togglePin(id: number): Promise<Note> {
    const note = await this.findOne(id);
    await this.noteRepository.update(id, { isPinned: !note.isPinned });
    return this.findOne(id);
  }


  async remove(id: number): Promise<{ message: string }> {
    const result = await this.noteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Catatan dengan ID ${id} tidak ditemukan`);
    }
    return { message: `Catatan dengan ID ${id} berhasil dihapus` };
  }
}
