import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
export declare class NotesController {
    private readonly notesService;
    constructor(notesService: NotesService);
    create(dto: CreateNoteDto): Promise<Note>;
    findAll(category?: string, search?: string): Promise<Note[]>;
    findOne(id: number): Promise<Note>;
    update(id: number, dto: UpdateNoteDto): Promise<Note>;
    togglePin(id: number): Promise<Note>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
