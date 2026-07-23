"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const note_entity_1 = require("./entities/note.entity");
let NotesService = class NotesService {
    constructor(noteRepository) {
        this.noteRepository = noteRepository;
    }
    async create(dto) {
        const note = this.noteRepository.create(dto);
        return this.noteRepository.save(note);
    }
    async findAll(category, search) {
        const where = {};
        if (category && category !== 'semua') {
            where.category = category;
        }
        if (search) {
            where.title = (0, typeorm_2.Like)(`%${search}%`);
        }
        return this.noteRepository.find({
            where,
            order: { isPinned: 'DESC', updatedAt: 'DESC' },
        });
    }
    async findOne(id) {
        const note = await this.noteRepository.findOneBy({ id });
        if (!note) {
            throw new common_1.NotFoundException(`Catatan dengan ID ${id} tidak ditemukan`);
        }
        return note;
    }
    async update(id, dto) {
        await this.findOne(id);
        await this.noteRepository.update(id, dto);
        return this.findOne(id);
    }
    async togglePin(id) {
        const note = await this.findOne(id);
        await this.noteRepository.update(id, { isPinned: !note.isPinned });
        return this.findOne(id);
    }
    async remove(id) {
        const result = await this.noteRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Catatan dengan ID ${id} tidak ditemukan`);
        }
        return { message: `Catatan dengan ID ${id} berhasil dihapus` };
    }
};
exports.NotesService = NotesService;
exports.NotesService = NotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(note_entity_1.Note)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotesService);
//# sourceMappingURL=notes.service.js.map