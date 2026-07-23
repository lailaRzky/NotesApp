import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsIn,
  IsDateString,
  MaxLength,
} from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty({ message: 'Title wajib diisi' })
  @MaxLength(100, { message: 'Title tidak boleh lebih dari 100 karakter' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsString()
  @IsOptional()
  @IsIn(['low', 'medium', 'high'], {
    message: 'Priority harus salah satu dari: low, medium, high',
  })
  priority?: string;

  @IsDateString({}, { message: 'dueDate harus berformat tanggal yang valid (YYYY-MM-DD)' })
  @IsOptional()
  dueDate?: string;
}
