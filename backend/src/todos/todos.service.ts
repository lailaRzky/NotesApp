import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(todo);
  }

  
  async findAll(completed?: string): Promise<Todo[]> {
    if (completed === 'true' || completed === 'false') {
      return this.todoRepository.find({
        where: { completed: completed === 'true' },
        order: { id: 'DESC' },
      });
    }
    return this.todoRepository.find({ order: { id: 'DESC' } });
  }


  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }


  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    await this.findOne(id); 
    await this.todoRepository.update(id, updateTodoDto);
    return this.findOne(id);
  }

  
  async delete(id: number): Promise<{ message: string }> {
    const result = await this.todoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return { message: `Todo with ID ${id} successfully deleted` };
  }
}
