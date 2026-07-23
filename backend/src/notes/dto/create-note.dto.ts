import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsIn,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty({ message: 'Judul wajib diisi' })
  @MaxLength(120, { message: 'Judul tidak boleh lebih dari 120 karakter' })
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  @IsIn(['pribadi', 'kuliah', 'kerja', 'lainnya'], {
    message: 'Category harus salah satu dari: pribadi, kuliah, kerja, lainnya',
  })
  category?: string;

  @IsBoolean()
  @IsOptional()
  isPinned?: boolean;

  @IsString()
  @IsOptional()
  @Matches(/^#([0-9A-Fa-f]{6})$/, {
    message: 'Warna harus berupa kode hex, contoh: #fff3b0',
  })
  color?: string;
}
