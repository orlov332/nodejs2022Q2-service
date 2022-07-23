import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class Album {
  @IsUUID('4')
  id: string; // uuid v4

  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsOptional()
  @IsUUID('4')
  artistId: string | null; // refers to Artist
}
