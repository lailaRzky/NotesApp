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
exports.TodosController = void 0;
const common_1 = require("@nestjs/common");
const todos_service_1 = require("./todos.service");
const create_todo_dto_1 = require("./dto/create-todo.dto");
const update_todo_dto_1 = require("./dto/update-todo.dto");
let TodosController = class TodosController {
    constructor(todosService) {
        this.todosService = todosService;
    }
    async create(createTodoDto) {
        return this.todosService.create(createTodoDto);
    }
    async findAll(completed) {
        return this.todosService.findAll(completed);
    }
    async findOne(id) {
        return this.todosService.findOne(id);
    }
    async update(id, updateTodoDto) {
        return this.todosService.update(id, updateTodoDto);
    }
    async delete(id) {
        return this.todosService.delete(id);
    }
};
exports.TodosController = TodosController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_todo_dto_1.CreateTodoDto]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('completed')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_todo_dto_1.UpdateTodoDto]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "delete", null);
exports.TodosController = TodosController = __decorate([
    (0, common_1.Controller)('api/v1/todos'),
    __metadata("design:paramtypes", [todos_service_1.TodosService])
], TodosController);
