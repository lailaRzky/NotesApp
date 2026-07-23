import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
export declare class NotesService {
    private readonly noteRepository;
    constructor(noteRepository: Repository<Note>);
    create(dto: CreateNoteDto): Promise<Note>;
    findAll(category?: string, search?: string): Promise<Note[]>;
    findOne(id: number): Promise<Note>;
    update(id: number, dto: UpdateNoteDto): Promise<Note>;
    togglePin(id: number): Promise<Note>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
